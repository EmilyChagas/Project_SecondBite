import { useFilterStore } from '../../../store/filterStore';
import type { ProductCategory } from '../../../interfaces/products';

const CATEGORIES: { label: string; value: ProductCategory | null }[] = [
  { label: 'Tudo', value: null },
  { label: 'Frutas', value: 'FRUIT' },
  { label: 'Vegetais', value: 'VEGETABLE' },
  { label: 'Legumes', value: 'LEGUME' },
  { label: 'Temperos', value: 'SEASONING' },
  { label: 'Raízes', value: 'ROOT' },
];

export const CategoryFilter = () => {
  const currentCategory = useFilterStore(state => state.category);
  const setCategory = useFilterStore(state => state.setCategory);

  function handleSelectCategory(category: ProductCategory | null) {
    const nextCategory = category === currentCategory ? null : category;
    setCategory(nextCategory);
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {CATEGORIES.map(item => {
        const isActive = currentCategory === item.value;

        return (
          <button
            key={item.label}
            onClick={() => handleSelectCategory(item.value)}
            className={`
              rounded-xl cursor-pointer px-6 py-1.5 text-sm font-semibold border transition-all duration-200 active:opacity-60 whitespace-nowrap
              ${
                isActive
                  ? 'bg-consumer/10 text-consumer border-consumer/10 shadow-sm'
                  : 'bg-white text-gray-700 border-primary/20 hover:border-consumer/30'
              }
            `}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};
