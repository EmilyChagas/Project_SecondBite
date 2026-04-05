import { useProducts } from '../../../../hooks/queries/useProducts';
import type { ProductCategory } from '../../../../interfaces/products';
import { ShopItem } from './ShopItem';

interface RelatedProps {
  productId: string;
  currentCategory: ProductCategory;
}

export const RelatedProducts = ({ productId, currentCategory }: RelatedProps) => {
  const { products } = useProducts({
    category: currentCategory,
  });

  const filteredProducts = products?.filter(item => item?.id !== productId) || [];

  return (
    <section className="pb-32">
      <h2 className="mb-4 padding-x font-semibold text-xl">Produtos Relacionados</h2>
      {filteredProducts.length > 0 ? (
        <ul className="flex gap-3 overflow-x-auto ml-4 pb-2 pr-4">
          {filteredProducts.map(product => (
            <ShopItem key={product?.id} isGrid={false} {...product!} />
          ))}
        </ul>
      ) : (
        <p className="padding-x text-primary font-medium pt-6 pb-20">Sem produtos relacionados disponíveis.</p>
      )}
    </section>
  );
};
