import { useNavigate, useParams } from 'react-router';
import { useProduct } from '../../hooks/queries/useProducts';
import { currencyFormatter, partialDateFormatter } from '../../utils/formatting';
import { WarningIcon } from '../../components/icons/WarningIcon';
import { CaretLeftIcon } from '../../components/icons/CaretLeftIcon';
import { RelatedProducts } from '../../components/consumer/search/shop/RelatedProducts';
import { OwnerRating } from '../../components/consumer/search/shop/OwnerRating';
import { AddProduct } from '../../components/consumer/search/shop/AddProduct';
import { imgUrl } from '../../libs/axios';
import { Spinner } from '../../components/ui/Spinner';
import { PackageIcon } from '../../components/icons/PackageIcon';

const Product = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: product, isPending } = useProduct({
    id: params.id!,
  });

  if (isPending || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner className="size-8 text-consumer" />
      </div>
    );
  }

  const imageUrl = product.images.length
    ? product.images[0].startsWith('http')
      ? product.images[0]
      : imgUrl + product.images[0]
    : '/placeholder-food.png';

  return (
    <article className="bg-gray-50 min-h-screen pb-24">
      <div className="relative w-full aspect-4/3 lg:aspect-4/2 bg-gray-200 overflow-clip">
        <img src={imageUrl} alt={product.name} className="object-cover w-full h-full" />

        <button
          onClick={() => navigate(-1)}
          className="absolute cursor-pointer top-4 left-4 z-10 bg-black/30 backdrop-blur-md p-2 rounded-full active:bg-black/50 transition-colors"
          aria-label="Voltar"
        >
          <CaretLeftIcon className="text-white size-6" />
        </button>
      </div>

      <div className="bg-white rounded-t-3xl relative z-10 px-5 pt-8 pb-6">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h1 className="font-bold text-2xl text-gray-900 leading-tight">{product.name}</h1>
          {product.discountPercentage > 0 && (
            <span className="bg-green-600 text-white font-extrabold text-sm px-3 py-1.5 rounded-lg shrink-0 shadow-sm">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        <div className="flex items-end gap-2 mb-6 mt-3">
          <span className="font-extrabold text-3xl text-consumer leading-none">{currencyFormatter(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="font-medium text-gray-400 line-through text-lg">
              {currencyFormatter(product.originalPrice)}
            </span>
          )}
          <span className="text-gray-500 font-medium mb-0.5">/ {product.sizeType}</span>
        </div>

        <p className="text-gray-600 leading-relaxed mb-6 text-sm border-b border-primary/20 pb-6">
          {product.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-2">
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-gray-500 font-medium text-xs mb-1 uppercase tracking-wide">
              <PackageIcon className="size-4" />
              Disponível
            </div>
            <div className="font-bold text-lg text-gray-800">
              {product.quantity} <span className="text-sm font-medium text-gray-500">{product.sizeType}s</span>
            </div>
          </div>

          <div className="bg-red-50/80 border border-red-100 rounded-2xl p-4 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-red-700 font-medium text-xs mb-1 uppercase tracking-wide">
              <WarningIcon className="size-4" />
              Vence em
            </div>
            <div className="font-bold text-red-800">{partialDateFormatter(product.validation)}</div>
          </div>
        </div>
      </div>
      <div>
        <OwnerRating
          marketerId={product.marketerId}
          marketerName={product.marketerName}
          stallName={product.stallName}
          marketerRating={product.marketerRating}
        />
        <RelatedProducts productId={product.id} currentCategory={product.category} />
        <AddProduct productId={product.id} />
      </div>
    </article>
  );
};

export default Product;
