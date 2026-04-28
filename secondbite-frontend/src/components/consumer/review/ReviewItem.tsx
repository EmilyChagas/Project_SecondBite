import { useState } from 'react';
import { useAuth } from '../../../hooks/queries/useAuth';
import type { Review } from '../../../interfaces/reviews';
import { StarIcon } from '../../icons/StarIcon';
import { TrashIcon } from '../../icons/TrashIcon';
import { PincelIcon } from '../../icons/PincelIcon';
import { ReviewForm } from './ReviewForm';
import { useReviewActions } from '../../../hooks/mutations/useReviewActions';

interface Props {
  review: Review;
}

export const ReviewItem = ({ review }: Props) => {
  const { userAuth } = useAuth();
  const { remove } = useReviewActions();
  const [isEditing, setIsEditing] = useState(false);

  const isOwner = userAuth?.id === review.consumerId;

  const handleDelete = () => {
    if (window.confirm('Deseja realmente excluir sua avaliação?')) remove.mutate(review.id);
  };

  if (isEditing) {
    return (
      <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 animate-in fade-in zoom-in-95">
        <ReviewForm
          marketerId=""
          initialData={review}
          onSuccess={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-100 flex flex-col gap-2 relative group">
      <div className="flex justify-between items-start">
        <div>
          <span className="font-bold text-gray-800 text-sm">{review.consumerName}</span>
          <div className="flex gap-0.5 mt-0.5">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`size-3 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
              />
            ))}
          </div>
        </div>

        <span className="text-[10px] text-gray-400 font-medium text-right">
          {new Date(review.createdAt).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
          {review.modifiedAt && review.modifiedAt !== review.createdAt && ' (editado)'}
        </span>
      </div>

      {review.comment && <p className="text-sm text-gray-600 leading-relaxed italic">"{review.comment}"</p>}

      {isOwner && (
        <div className="flex gap-3 mt-1 justify-end">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 text-[10px] font-bold text-consumer uppercase tracking-wider active:bg-consumer/5 px-2 py-1 rounded-md cursor-pointer"
          >
            <PincelIcon className="size-4" /> Editar
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 text-[10px] font-bold text-red-500 uppercase tracking-wider active:bg-red-50 px-2 py-1 rounded-md cursor-pointer"
          >
            <TrashIcon className="size-4" /> Excluir
          </button>
        </div>
      )}
    </div>
  );
};
