import { MinusIcon } from '../icons/MinusIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { Spinner } from '../ui/Spinner';

interface QuantityProps {
  isUpdating: boolean;
  currentQuant: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const Quantity = ({ isUpdating, currentQuant, onIncrease, onDecrease }: QuantityProps) => {
  return (
    <div className="flex justify-end items-center col-span-3">
      <div className="grid grid-cols-3 gap-2 items-center">
        <button
          onClick={onDecrease}
          disabled={isUpdating}
          className="bg-gray-200 rounded-full p-2 w-fit active:opacity-60 transition-opacity duration-200 cursor-pointer"
        >
          <MinusIcon className="size-4" />
        </button>
        <div className="font-medium text-center">
          {isUpdating ? (
            <div className="flex justify-center">
              <Spinner className="size-4" />
            </div>
          ) : (
            currentQuant
          )}
        </div>
        <button
          onClick={onIncrease}
          disabled={isUpdating}
          className="bg-gray-200 rounded-full p-2 w-fit active:opacity-60 transition-opacity duration-200 cursor-pointer"
        >
          <PlusIcon className="size-4" />
        </button>
      </div>
    </div>
  );
};
