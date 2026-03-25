// 1. Definição das Categorias de Produtos
export type ProductCategory = 'VEGETABLE' | 'FRUIT' | 'LEGUME' | 'SEASONING' | 'ROOT';

export interface Product {
  id: string;
  name: string;
  description: string;
  sizeType: string;
  validation: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  category: ProductCategory;
  quantity: number;
  images: string[];
  marketerId: string;
  marketerName: string;
  stallName: string;
  isAutoDiscount?: boolean;
  manualDiscountPercentage?: number;
  createdAt: string;
  modifiedAt: string;
}

export interface OwnerProductDetails {
  marketerId: string;
  marketerName: string;
  stallName: string;
  marketerRating: number;
}

export interface ProductDetails extends Product, OwnerProductDetails {}

export interface PaginatedResponse<T> {
  page: number;
  limit: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  content: T[];
}

export type ProductPageResponse = PaginatedResponse<Product>;
