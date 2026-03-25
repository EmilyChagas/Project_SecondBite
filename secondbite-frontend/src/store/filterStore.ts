import { create } from 'zustand';
import type { ProductCategory } from '../interfaces/products';

interface Filter {
  category: ProductCategory | null;
  isGrid: boolean;

  setIsGrid: (isGrid: boolean) => void;
  setCategory: (categ: ProductCategory | null) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<Filter>(set => {
  return {
    category: null,
    isGrid: true,

    setCategory: categ => set({ category: categ }),
    setIsGrid: isGrid => set({ isGrid }),
    clearFilters: () => {
      set({ category: null });
    },
  };
});
