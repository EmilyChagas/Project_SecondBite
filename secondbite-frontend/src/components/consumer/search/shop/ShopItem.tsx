import { Link } from 'react-router';
import type { Product } from '../../../../interfaces/products';
import { currencyFormatter } from '../../../../utils/formatting';
import { PlusIcon } from '../../../icons/PlusIcon';
import { imgUrl } from '../../../../libs/axios';
import { Button } from '../../../ui/Button';

interface ShopItemProps extends Product {
  isGrid: boolean;
}

export const ShopItem = ({
  id,
  price,
  originalPrice,
  // discountPercentage,
  stallName,
  marketerName,
  name,
  sizeType,
  images,
  isGrid,
}: ShopItemProps) => {
  function handleAddToCart() {
    //
  }

  const imageUrl = images.length ? imgUrl + images[0] : '/placeholder-food.png';

  return (
    <li
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-clip group sm:hover:shadow-md transition-all ${!isGrid && 'flex h-36'}`}
    >
      <Link
        to={`/produtos/${id}`}
        className={`block relative overflow-hidden bg-gray-100 shrink-0 ${isGrid ? 'w-full aspect-square' : 'w-36 h-full'}`}
      >
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className="object-cover w-full h-full sm:group-hover:scale-105 transition-transform duration-500"
        />

        {/* {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-green-600 text-white font-bold text-[10px] px-2 py-1 rounded-md shadow-sm tracking-wide">
            {discountPercentage}% OFF
          </div>
        )} */}
      </Link>

      <div className={`flex flex-col flex-1 p-3 relative ${!isGrid && 'justify-center truncate'}`}>
        <Link to={`/produtos/${id}`} className="block flex-1">
          <h4 className="text-xs text-gray-500 truncate mb-0.5 font-medium uppercase tracking-wider">
            {stallName ? stallName : marketerName}
          </h4>
          <h3 className="font-bold text-gray-800 leading-tight mb-2 truncate">{name}</h3>
          <div className="mt-auto">
            {originalPrice > price && (
              <span className="line-through text-gray-400 text-xs font-medium mr-1.5">
                {currencyFormatter(originalPrice)}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-consumer text-lg leading-none">{currencyFormatter(price)}</span>
              <span className="text-xs text-gray-500">/{sizeType}</span>
            </div>
          </div>
        </Link>

        <Button
          onClick={handleAddToCart}
          roleButton="bg-consumer"
          className={`absolute ${isGrid ? 'bottom-31' : 'bottom-2'} right-2 px-2.5 py-2.5 text-white rounded-xl transition-colors active:scale-95 flex items-center justify-center`}
          aria-label="Adicionar ao carrinho"
        >
          <PlusIcon className="size-5" />
        </Button>
      </div>
    </li>
  );
};
