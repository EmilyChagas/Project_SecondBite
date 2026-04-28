import { Link } from 'react-router';
import type { Product } from '../../../../interfaces/products';
import { currencyFormatter } from '../../../../utils/formatting';
import { useAddToCart } from '../../../../hooks/mutations/useAddToCart';
import { imgUrl } from '../../../../libs/axios';

export const RelatedItem = ({ id, price, name, images, sizeType }: Product) => {
  const { mutate } = useAddToCart();

  function handleAddToCart() {
    mutate({ productId: id });
  }

  return (
    <li className="relative">
      <Link to={`/produtos/${id}`} className={`overflow-clip w-36 grid gap-y-3 grid-cols-1 bg-white shadow rounded-xl`}>
        <div className={`overflow-clip aspect-4/3 h-full w-full`}>
          <img
            src={images.length ? (images[0].startsWith('http') ? images[0] : imgUrl + images[0]) : ''}
            alt={name}
            loading="lazy"
            className="object-cover aspect-4/3 w-full h-full bg-slate-200"
          />
        </div>
        <div className={`flex flex-col gap-2 col-span-2 px-3 pb-16`}>
          <h3 className="font-semibold truncate">{name}</h3>
          <div className="text-primary text-sm truncate">
            {currencyFormatter(price)}/{sizeType}
          </div>
        </div>
      </Link>
      <button
        onClick={handleAddToCart}
        className={`bg-consumer/10 cursor-pointer text-consumer rounded-xl font-bold active:opacity-60 duration-200 absolute px-5 py-2 z-30 bottom-2 left-1/2 -translate-x-1/2`}
      >
        Adicionar
      </button>
    </li>
  );
};
