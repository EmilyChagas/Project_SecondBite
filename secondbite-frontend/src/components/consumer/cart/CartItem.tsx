import { Link } from 'react-router';
import type { CartItem as CartItemProps } from '../../../interfaces/cart';
import { currencyFormatter } from '../../../utils/formatting';
import { useUpdateCartItem } from '../../../hooks/mutations/useUpdateCartItem';
import { useDeleteCartItem } from '../../../hooks/mutations/useDeleteCartItem';
import { TrashIcon } from '../../icons/TrashIcon';
import { imgUrl } from '../../../libs/axios';
import { Quantity } from '../../shared/Quantity';

export const CartItem = ({ id, product, quantity, subTotal }: CartItemProps) => {
  const { mutate, isPending } = useUpdateCartItem();
  const { mutate: mutateDelete } = useDeleteCartItem();

  function handleDecrease() {
    mutate({ id, productId: product.id, quantity: quantity - 1 });
  }

  function handleIncrease() {
    mutate({ id, productId: product.id, quantity: quantity + 1 });
  }

  function handleDelete() {
    mutateDelete({ id });
  }

  const imageUrl = product.images?.length
    ? product.images[0].startsWith('http')
      ? product.images[0]
      : imgUrl + product.images[0]
    : '/placeholder-food.png';

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <li className="flex gap-3 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm relative group">
      <Link to={`/produtos/${product.id}`} className="shrink-0 w-24 h-full">
        <div className="w-full h-full rounded-xl overflow-clip bg-gray-100 relative">
          <img src={imageUrl} alt={product.name} loading="lazy" className="object-cover w-full h-full" />
          {product.discountPercentage > 0 && (
            <div className="absolute top-0 left-0 bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br-lg">
              -{product.discountPercentage}%
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-col flex-1 py-1">
        <div className="flex justify-between items-start gap-2">
          <Link to={`/produtos/${product.id}`}>
            <h2 className="font-bold text-gray-800 text-sm leading-tight line-clamp-2">{product.name}</h2>
          </Link>

          <button
            onClick={handleDelete}
            className="text-gray-400 cursor-pointer active:text-red-500 p-1 -mr-1 -mt-1 rounded-full transition-colors active:bg-red-50"
            aria-label="Remover item"
          >
            <TrashIcon className="size-5" />
          </button>
        </div>

        <div className="mt-1 mb-3">
          <div className="flex items-baseline gap-1.5">
            <span className="font-extrabold text-consumer text-sm">{currencyFormatter(product.price)}</span>
            {hasDiscount && (
              <span className="line-through text-gray-400 text-[10px]">{currencyFormatter(product.originalPrice)}</span>
            )}
          </div>
        </div>

        <div className="mt-auto flex justify-between items-end">
          <Quantity
            isUpdating={isPending}
            currentQuant={quantity}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
          />

          <div className="text-right">
            <span className="block text-[10px] text-gray-400 font-medium uppercase mb-0.5">Subtotal</span>
            <span className="font-bold text-gray-800 text-sm">{currencyFormatter(subTotal)}</span>
          </div>
        </div>
      </div>
    </li>
  );
};
