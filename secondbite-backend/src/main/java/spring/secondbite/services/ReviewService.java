package spring.secondbite.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import spring.secondbite.dtos.PageResponseDto;
import spring.secondbite.dtos.reviews.ReviewDto;
import spring.secondbite.dtos.reviews.ReviewResponseDto;
import spring.secondbite.dtos.reviews.UpdateReviewDto;
import spring.secondbite.entities.AppUser;
import spring.secondbite.entities.Consumer;
import spring.secondbite.entities.Marketer;
import spring.secondbite.entities.Review;
import spring.secondbite.exceptions.ConflictException;
import spring.secondbite.exceptions.NotAllowedException;
import spring.secondbite.exceptions.NotFoundException;
import spring.secondbite.mappers.ReviewMapper;
import spring.secondbite.repositories.ReviewRepository;
import spring.secondbite.security.SecurityService;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository repository;
    private final MarketerService marketerService;
    private final ConsumerService consumerService;
    private final SecurityService securityService;
    private final ReviewMapper mapper;

    @Transactional
    public ReviewResponseDto createReview(ReviewDto dto) {
        AppUser user = securityService.getLoggedUserOrThrow();
        Consumer consumer = consumerService.findConsumerByUser(user);

        Marketer marketer = marketerService.findOptionalMarketer(dto.marketerId());

        if (repository.existsByConsumerAndMarketer(consumer, marketer))
            throw new ConflictException("Você já avaliou este feirante.");

        Review review = mapper.toEntity(dto);
        review.setConsumer(consumer);
        review.setMarketer(marketer);

        Review savedReview = repository.save(review);
        return mapper.toDto(savedReview);
    }

    public PageResponseDto<ReviewResponseDto> getReviewsByMarketer(UUID marketerId, Pageable pageable) {
        Marketer marketer = marketerService.findOptionalMarketer(marketerId);
        Page<Review> page = repository.findAllByMarketer(marketer, pageable);

        List<ReviewResponseDto> content = page.stream()
                .map(mapper::toDto)
                .toList();

        return new PageResponseDto<>(
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast(),
                content
        );
    }

    @Transactional
    public ReviewResponseDto updateReview(UUID reviewId, UpdateReviewDto dto) {
        AppUser user = securityService.getLoggedUserOrThrow();
        Consumer consumer = consumerService.findConsumerByUser(user);

        Review review = repository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException("Avaliação não encontrada."));

        if (!review.getConsumer().getId().equals(consumer.getId()))
            throw new NotAllowedException("Você só tem permissão para editar as suas próprias avaliações.");

        review.setRating(dto.rating());
        review.setComment(dto.comment());

        Review updatedReview = repository.save(review);
        return mapper.toDto(updatedReview);
    }

    @Transactional
    public void deleteReview(UUID reviewId) {
        AppUser user = securityService.getLoggedUserOrThrow();
        Consumer consumer = consumerService.findConsumerByUser(user);

        Review review = repository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException("Avaliação não encontrada."));

        if (!review.getConsumer().getId().equals(consumer.getId()))
            throw new NotAllowedException("Você só tem permissão para excluir as suas próprias avaliações.");
        repository.delete(review);
    }

    public Double getAverageRating(UUID marketerId) {
        Double avg = repository.getAverageRating(marketerId);
        return avg != null ? avg : 0.0;
    }
}