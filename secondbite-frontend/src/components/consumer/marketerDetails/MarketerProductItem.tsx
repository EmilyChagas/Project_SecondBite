import { Link } from 'react-router';
import { useAddToCart } from '../../../hooks/mutations/useAddToCart';
import type { Product } from '../../../interfaces/products';
import { imgUrl } from '../../../libs/axios';
import { currencyFormatter } from '../../../utils/formatting';
import { Spinner } from '../../ui/Spinner';
import { PlusIcon } from '../../icons/PlusIcon';

export const MarketerProductItem = ({ id, price, name, sizeType, images }: Product) => {
  const { mutate, isPending } = useAddToCart();

  function handleAddToCart() {
    mutate({ productId: id });
  }

  const imageUrl = images.length ? imgUrl + images[0] : '/placeholder-food.png';

  return (
    <li
      className={`bg-white p-3 rounded-2xl shadow-sm border border-gray-100 overflow-clip group sm:hover:shadow-md transition-all`}
    >
      <Link
        to={`/produtos/${id}`}
        className={`block relative overflow-hidden bg-gray-100 shrink-0 rounded-2xl w-full aspect-square`}
      >
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className="object-cover w-full h-full sm:group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className={`flex flex-col flex-1 pt-3 relative`}>
        <div className=" flex-1">
          <h3 className="font-bold text-gray-800 leading-tight mb-1 truncate">{name}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-medium text-gray-500">{sizeType}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="font-extrabold text-consumer text-lg leading-none">{currencyFormatter(price)}</div>
            <button
              onClick={handleAddToCart}
              disabled={isPending}
              className={`px-2 bg-consumer cursor-pointer w-fit py-2 text-white rounded-xl transition-colors active:opacity-60 flex items-center justify-center`}
              aria-label="Adicionar ao carrinho"
            >
              {isPending ? (
                <Spinner className="size-5 border-current border-t-transparent" />
              ) : (
                <PlusIcon className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
