import { Link } from 'react-router';
import { currencyFormatter } from '../../../utils/formatting';
import { PlusIcon } from '../../icons/PlusIcon';
import { useAddToCart } from '../../../hooks/mutations/useAddToCart';
import { Spinner } from '../../ui/Spinner';
import type { Product } from '../../../interfaces/products';
import { imgUrl } from '../../../libs/axios';

export const HomeProductCard = ({
  id,
  name,
  price,
  originalPrice,
  marketerName,
  stallName,
  sizeType,
  images,
}: Product) => {
  const { mutate, isPending } = useAddToCart();

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    mutate({ productId: id });
  }

  const imageUrl = images.length
    ? images[0].startsWith('http')
      ? images[0]
      : imgUrl + images[0]
    : '/placeholder-food.png';

  return (
    <div className="shrink-0 w-[150px] relative h-full">
      <Link
        to={`/produtos/${id}`}
        className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full active:scale-[0.98] transition-transform"
      >
        <div className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden shrink-0">
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className="object-cover w-full h-full transition-transform duration-500"
          />
        </div>

        <div className="p-3 flex flex-col flex-1">
          <h4 className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5 truncate">
            {stallName || marketerName}
          </h4>
          <h3 className="font-bold text-gray-800 text-sm leading-tight mb-2 truncate">{name}</h3>

          <div className="mt-auto pt-2 flex flex-col">
            {originalPrice > price && (
              <span className="line-through text-gray-400 text-[10px] font-medium leading-none mb-0.5">
                {currencyFormatter(originalPrice)}
              </span>
            )}
            <div className="flex items-baseline gap-0.5">
              <span className="font-extrabold text-consumer text-base leading-none">{currencyFormatter(price)}</span>
              <span className="text-[10px] text-gray-400 font-medium">/{sizeType}</span>
            </div>
          </div>
        </div>
      </Link>

      <button
        onClick={handleAddToCart}
        disabled={isPending}
        className="absolute top-18.5 right-2 bg-consumer text-white p-1.5 rounded-xl transition-opacity active:opacity-60 z-10 flex items-center justify-center size-8 shadow-sm"
        aria-label="Adicionar produto"
      >
        {isPending ? (
          <Spinner className="size-4 border-current border-t-transparent" />
        ) : (
          <PlusIcon className="size-4" />
        )}
      </button>
    </div>
  );
};
