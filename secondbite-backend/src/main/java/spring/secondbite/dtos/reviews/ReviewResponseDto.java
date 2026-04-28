package spring.secondbite.dtos.reviews;

import java.time.LocalDateTime;
import java.util.UUID;

public record ReviewResponseDto(
        UUID id,
        String consumerName,
        UUID consumerId,
        Integer rating,
        String comment,
        LocalDateTime createdAt,
        LocalDateTime modifiedAt
) {}
