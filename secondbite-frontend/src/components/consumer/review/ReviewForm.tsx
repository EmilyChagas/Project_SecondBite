import { useForm } from 'react-hook-form';
import { useReviewActions } from '../../../hooks/mutations/useReviewActions';
import type { Review } from '../../../interfaces/reviews';
import { StarIcon } from '../../icons/StarIcon';

interface Props {
  marketerId: string;
  initialData?: Review;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface ReviewFormData {
  rating: number;
  comment: string;
}

export const ReviewForm = ({ marketerId, initialData, onSuccess, onCancel }: Props) => {
  const { create, update } = useReviewActions();
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<ReviewFormData>({
    defaultValues: {
      rating: initialData?.rating || 5,
      comment: initialData?.comment || '',
    },
  });

  const ratingValue = watch('rating');

  const onSubmit = (data: ReviewFormData) => {
    const { comment, rating } = data;

    if (isEditing && initialData) {
      update.mutate({ id: initialData.id, comment: comment.trim(), rating }, { onSuccess });
    } else {
      create.mutate({ marketerId, comment: comment.trim(), rating }, { onSuccess });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Sua nota</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              onClick={() => setValue('rating', star)}
              className={`p-1 transition-transform active:scale-90 cursor-pointer`}
            >
              <StarIcon
                className={`size-7 ${star <= ratingValue ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
              />
            </button>
          ))}
        </div>
      </div>

      <textarea
        {...register('comment')}
        placeholder="O que você achou dessa banca? (Opcional)"
        className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:border-consumer outline-none min-h-[80px] resize-none text-gray-800"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-consumer text-white font-bold py-3 rounded-xl text-sm shadow-md active:scale-95 transition-all cursor-pointer"
        >
          {isEditing ? 'Salvar Alterações' : 'Enviar Avaliação'}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 bg-gray-100 text-gray-500 active:bg-gray-200 transition-colors cursor-pointer font-bold rounded-xl text-sm"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
