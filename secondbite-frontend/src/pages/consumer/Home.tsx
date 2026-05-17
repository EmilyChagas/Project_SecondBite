import { Link, useNavigate } from 'react-router';
import { useProducts } from '../../hooks/queries/useProducts';
import { useAuth } from '../../hooks/queries/useAuth';
import { Categories } from '../../components/consumer/home/Categories';
import { HomeProductCard } from '../../components/consumer/home/HomeProductCard';
import { FreeVectorMap } from '../../components/consumer/home/FreeVectorMap';
import { PackageIcon } from '../../components/icons/PackageIcon';
import { Spinner } from '../../components/ui/Spinner';
import SearchIcon from '../../components/icons/SearchIcon';
import { useMarketersLocations } from '../../hooks/queries/useMarketers';
import { Button } from '../../components/ui/Button';
import { CherriesIcon } from '../../components/icons/CherriesIcon';

const Home = () => {
  const navigate = useNavigate();
  const { userAuth } = useAuth();

  const { products, isPending: loadingProducts } = useProducts({ category: null, search: '' });

  const { data: marketers, isPending: loadingMarketers } = useMarketersLocations();

  const firstName = userAuth?.name ? userAuth.name.split(' ')[0] : 'Visitante';

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      <section className="bg-linear-to-br from-consumer to-green-600 pt-6 pb-12 px-4 rounded-b-xl relative shadow-sm">
        <div className="text-white mb-6">
          <h1 className="font-bold text-2xl leading-tight mb-1">Olá, {firstName} 👋</h1>
          <p className="text-emerald-50 text-sm font-medium">O que vamos salvar do desperdício hoje?</p>
        </div>

        <div
          onClick={() => navigate('/buscar')}
          className="absolute -bottom-6 left-5 right-5 bg-white rounded-2xl shadow border border-gray-100 flex items-center px-4 py-3.5 cursor-text active:scale-[0.98] transition-transform"
        >
          <SearchIcon className="size-5 text-gray-400 mr-3" />
          <span className="text-gray-400 text-sm font-medium flex-1">Buscar frutas, legumes...</span>
        </div>
        <CherriesIcon className="size-36 text-white opacity-15 absolute -bottom-6 right-3 sm:right-7" />
      </section>
      <div className="h-12"></div>
      <Categories />
      <section className="mt-8 mb-8">
        <div className="flex justify-between gap-2 items-end mb-4 px-4">
          <div>
            <h2 className="font-bold text-gray-800 text-lg">Ofertas para Salvar</h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Alimentos perfeitos com grandes descontos</p>
          </div>
          <Link to="/buscar" className="text-consumer text-sm font-bold active:opacity-60 transition-opacity min-w-fit">
            Ver todas
          </Link>
        </div>
        {loadingProducts ? (
          <div className="flex justify-center py-10">
            <Spinner className="size-8 text-consumer border-t-transparent" />
          </div>
        ) : products && products.length > 0 ? (
          <ul className="flex gap-3 overflow-x-auto px-4 pb-2">
            {products.slice(0, 8).map(product => (
              <li key={product!.id} className="">
                <HomeProductCard {...product!} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mx-5 bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
            <PackageIcon className="size-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 text-sm font-medium">Nenhuma oferta disponível no momento.</p>
          </div>
        )}
      </section>

      <section className="px-4 mb-8">
        <div className="mb-4">
          <h2 className="font-bold text-gray-800 text-lg">Apoie os feirantes locais</h2>
          <p className="text-xs text-gray-500 font-medium mt-0.5">Descubra bancas parceiras perto de você</p>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-200 h-82.5 relative bg-gray-100">
          {loadingMarketers ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner className="size-8 text-consumer border-t-transparent" />
            </div>
          ) : (
            <FreeVectorMap marketers={marketers || []} height="h-82.5" />
          )}
        </div>
      </section>
      <section className="bg-consumer/10 rounded-xl p-4 border border-green-100 mx-4">
        <h3 className="font-bold text-green-800 text-lg mb-2">Por que o preço é baixo?</h3>
        <p className="text-green-700/80 text-sm leading-relaxed mb-4">
          Conectamos você a produtos que estão <strong>próximos da validade</strong> ou fora do padrão estético. Eles
          são perfeitos para consumo imediato e você ajuda a reduzir o lixo orgânico.
        </p>
        <Link to="/buscar">
          <Button roleButton="bg-consumer" className="w-full">
            Ver alimentos disponíveis
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
