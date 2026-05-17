import type { JSX } from 'react';
import { Link } from 'react-router';
import { useFilterStore } from '../../../store/filterStore';
import { CarrotIcon } from '../../icons/CarrotIcon';
import { CherriesIcon } from '../../icons/CherriesIcon';
import { PlantIcon } from '../../icons/PlantIcon';
import { StorefrontIcon } from '../../icons/StorefrontIcon';
import type { ProductCategory } from '../../../interfaces/products';

const categories: { id: ProductCategory | 'ALL'; name: string; icon: JSX.Element; bg: string }[] = [
  {
    id: 'ALL',
    name: 'Tudo',
    icon: <StorefrontIcon className="size-5 text-gray-600" />,
    bg: 'bg-gray-100',
  },
  {
    id: 'VEGETABLE',
    name: 'Legumes',
    icon: <CarrotIcon className="size-6 text-orange-500" />,
    bg: 'bg-orange-50',
  },
  {
    id: 'FRUIT',
    name: 'Frutas',
    icon: <CherriesIcon className="size-6 text-red-500" />,
    bg: 'bg-red-50',
  },
  {
    id: 'VEGETABLE',
    name: 'Verduras',
    icon: <PlantIcon className="size-6 text-green-500" />,
    bg: 'bg-green-50',
  },
];

export const Categories = () => {
  const setCategory = useFilterStore(state => state.setCategory);
  const clearFilters = useFilterStore(state => state.clearFilters);

  function handleCategoryClick(categoryId: ProductCategory | 'ALL') {
    if (categoryId === 'ALL') clearFilters();
    else setCategory(categoryId);
  }

  return (
    <section className="mb-6">
      <ul className="flex gap-3 overflow-x-auto px-4 pb-2">
        {categories.map((cat, index) => (
          <li key={`${cat.name}-${index}`} className="snap-start shrink-0">
            <Link
              to="/buscar"
              onClick={() => handleCategoryClick(cat.id)}
              className="flex items-center gap-3 bg-white border border-gray-100 pr-6 pl-1.5 py-1.5 rounded-full shadow-sm active:scale-95 active:opacity-60 transition-all"
            >
              <div className={`${cat.bg} p-2 rounded-full w-10 h-10 flex items-center justify-center`}>{cat.icon}</div>
              <span className="font-semibold text-sm text-gray-700">{cat.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
