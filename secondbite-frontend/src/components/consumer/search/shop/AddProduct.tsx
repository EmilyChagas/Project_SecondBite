import { useState } from 'react';
import { useAddToCart } from '../../../../hooks/mutations/useAddToCart';
import CartIcon from '../../../icons/CartIcon';
import { Button } from '../../../ui/Button';
import { MinusIcon } from '../../../icons/MinusIcon';
import { PlusIcon } from '../../../icons/PlusIcon';

export const AddProduct = ({ productId }: { productId: string }) => {
  const [quantity, setQuantity] = useState(1);
  const { mutate } = useAddToCart();

  function handleAddToCart() {
    mutate({ productId, quantity });
  }

  return (
    <div className="fixed bottom-18 px-4 py-3 pt-0 left-1/2 -translate-x-1/2 z-40 bg-white w-full border-t border-t-primary/20 max-container">
      <div className="py-4 flex justify-between">
        <div className="font-semibold text-lg flex items-center">Quantidade</div>
        <div className="grid grid-cols-3 gap-4 border border-primary/20 py-2 px-3 rounded-xl">
          <button
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}
            className="block text-consumer active:text-primary cursor-pointer"
          >
            <MinusIcon className="size-5" />
          </button>
          <div className="text-center font-bold">{quantity}</div>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="block text-consumer active:text-primary cursor-pointer"
          >
            <PlusIcon className="size-5" />
          </button>
        </div>
      </div>
      <Button
        onClick={handleAddToCart}
        roleButton="bg-consumer"
        className="flex gap-3 items-center justify-center w-full"
      >
        <CartIcon /> Adicionar ao Carrinho
      </Button>
    </div>
  );
};
