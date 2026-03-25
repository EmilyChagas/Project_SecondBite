import { type ReactNode } from 'react';
import { GridIcon } from '../../../icons/GridIcon';
import { RowsIcon } from '../../../icons/RowsIcon';

interface ProductListProps {
  children: ReactNode;
  isGrid: boolean;
  onChangeView: (val: boolean) => void;
}

export const ShopList = ({ children, isGrid, onChangeView }: ProductListProps) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-800 text-lg">Ofertas Disponíveis</h2>
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg shadow-sm border border-gray-100">
          <button
            onClick={() => onChangeView(true)}
            className={`p-1.5 cursor-pointer rounded-md ${isGrid ? 'bg-consumer/10 text-consumer' : 'text-gray-600'}`}
          >
            <GridIcon />
          </button>
          <button
            onClick={() => onChangeView(false)}
            className={`p-1.5 cursor-pointer rounded-md ${!isGrid ? 'bg-consumer/10 text-consumer' : 'text-gray-600'}`}
          >
            <RowsIcon />
          </button>
        </div>
      </div>
      <ul className={`grid ${isGrid ? 'grid-cols-2 lg:grid-cols-3 gap-3' : 'grid-cols-1 gap-3'} mb-6`}>{children}</ul>
    </div>
  );
};
