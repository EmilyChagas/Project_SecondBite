import { Link } from 'react-router';
import { CaretRightIcon } from '../../../icons/CaretRightIcon';
import { StarIcon } from '../../../icons/StarIcon';
import { UserIcon } from '../../../icons/UserIcon';

interface OwnerProductDetails {
  marketerId: string;
  marketerName: string;
  stallName: string;
  marketerRating: number;
}

export const OwnerRating = ({ marketerName, marketerId, stallName, marketerRating }: OwnerProductDetails) => {
  const rating = marketerRating && marketerRating >= 1 ? marketerRating : 0;

  return (
    <Link
      to={`/feirante/${marketerId}`}
      className="block mx-5 my-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-4 relative overflow-hidden group"
    >
      <div className="flex gap-4 items-center">
        <div className="bg-consumer/10 text-consumer p-3 rounded-full shrink-0">
          <UserIcon className="size-7" />
        </div>

        <div className="flex-1 min-w-0 pr-6">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-0.5">Vendido por</p>

          <h4 className="font-bold text-gray-800 text-base truncate leading-tight">
            {stallName ? stallName : marketerName}
          </h4>

          {stallName && <div className="text-xs text-gray-500 truncate mb-1">{marketerName}</div>}

          <div className="flex items-center gap-1.5 mt-1.5">
            <StarIcon className="text-amber-400 size-4 fill-amber-400" />
            <div className="text-sm">
              <span className="font-bold text-gray-800">{rating.toFixed(1)}</span>
              <span className="text-gray-400 font-medium ml-1">/ 5.0</span>
            </div>
          </div>
        </div>

        <CaretRightIcon className="text-primary size-5 absolute right-4" />
      </div>
    </Link>
  );
};
