import { OrderStatus } from '../interfaces/orders';
import type { ProductCategory } from '../interfaces/products';

export type FilterTab = OrderStatus | 'ACTIVE' | 'ALL';

export const MARKETER_TABS: { label: string; value: FilterTab }[] = [
  { label: 'A Fazer', value: 'ACTIVE' },
  { label: 'Concluídos', value: OrderStatus.COMPLETED },
  { label: 'Cancelados', value: OrderStatus.CANCELED },
  { label: 'Todos', value: 'ALL' },
];

export const CATEGORIES: { label: string; value: ProductCategory | null }[] = [
  { label: 'Tudo', value: null },
  { label: 'Frutas', value: 'FRUIT' },
  { label: 'Verduras', value: 'VEGETABLE' },
  { label: 'Legumes', value: 'LEGUME' },
  { label: 'Temperos', value: 'SEASONING' },
  { label: 'Raízes', value: 'ROOT' },
];
