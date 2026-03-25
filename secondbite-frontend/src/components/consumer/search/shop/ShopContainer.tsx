import { useState } from 'react';

import { ShopList } from './ShopList';
import { ShopItem } from './ShopItem';
import { useFilterStore } from '../../../../store/filterStore';
import { useProducts } from '../../../../hooks/queries/useProducts';
import { SearchFilter } from '../SearchFilter';
import { CategoryFilter } from '../FIlter';
import { Button } from '../../../ui/Button';
import { ErrorMessage } from '../../../ui/ErrorMessage';

const ShopContainer = () => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const category = useFilterStore(state => state.category);
  const isGrid = useFilterStore(state => state.isGrid);
  const setIsGrid = useFilterStore(state => state.setIsGrid);

  function handleChangeView(isGrid: boolean) {
    setIsGrid(isGrid);
  }

  const { products, fetchNextPage, hasNextPage, isPending, isFetchingNextPage, isError, error } = useProducts({
    category,
    search: searchTerm,
  });

  const productsLength = products.length;
  const isFetching = isPending || isFetchingNextPage;

  return (
    <section className="padding-x overflow-y-auto pb-28">
      <div className="mb-5 grid gap-4">
        <SearchFilter setSearchTerm={setSearchTerm} />
        <CategoryFilter />
      </div>
      {!isFetching && !isError && !productsLength && (
        <p className="text-center font-medium pb-6">Sem resultados encontrados.</p>
      )}
      {productsLength > 0 && (
        <ShopList isGrid={isGrid} onChangeView={handleChangeView}>
          {products.map(product => (
            <ShopItem key={product?.id} isGrid={isGrid} {...product!} />
          ))}
        </ShopList>
      )}
      {hasNextPage && !isFetching && !isError && (
        <div className="flex justify-center pt-2">
          <Button
            roleButton="bg-consumer"
            className="px-6"
            onClick={() => {
              void fetchNextPage();
            }}
          >
            Mais produtos
          </Button>
        </div>
      )}
      {isError && (
        <ErrorMessage
          title="Erro ao carregar produtos"
          className="justify-center"
          message={error?.message || 'Ocorreu um erro inesperado, volte mais tarde.'}
        />
      )}
    </section>
  );
};

export default ShopContainer;
