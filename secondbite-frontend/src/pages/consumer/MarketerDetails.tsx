import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { CaretLeftIcon } from '../../components/icons/CaretLeftIcon';
import { StorefrontIcon } from '../../components/icons/StorefrontIcon';
import { StarIcon } from '../../components/icons/StarIcon';
import { Spinner } from '../../components/ui/Spinner';
import { useMarketerReviews } from '../../hooks/queries/useMarketerReviews';
import { useMarketerProducts } from '../../hooks/queries/useMarketerProducts';
import { useMarketer } from '../../hooks/queries/useMarketer';
import { PackageIcon } from '../../components/icons/PackageIcon';
import { ReviewForm } from '../../components/consumer/review/ReviewForm';
import { StaticMap } from '../../components/shared/StaticMap';
import { PlantIcon } from '../../components/icons/PlantIcon';
import { CherriesIcon } from '../../components/icons/CherriesIcon';
import { MapPinIcon } from '../../components/icons/MapPinIcon';
import { MarketerProductItem } from '../../components/consumer/marketerDetails/MarketerProductItem';
import { ClockIcon } from '../../components/icons/ClockIcon';
import { PhoneIcon } from '../../components/icons/PhoneIcon';
import { ReviewItem } from '../../components/consumer/review/ReviewItem';
import { useAuth } from '../../hooks/queries/useAuth';

export default function MarketerDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isWritingReview, setIsWritingReview] = useState(false);

  const { userAuth } = useAuth();

  const { data: marketer, isPending: loadingMarketer } = useMarketer(id!);
  const { data: products, isPending: loadingProducts, isError: productsError } = useMarketerProducts(id!);
  const { data: reviews, isPending: loadingReviews, isError: reviewsError } = useMarketerReviews(id!);

  const hasReviewed = reviews?.some(review => review?.consumerId === userAuth?.id);

  if (loadingMarketer) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner className="size-8 text-consumer" />
      </div>
    );
  }

  if (!marketer) {
    return <div className="text-center mt-20 font-bold">Feirante não encontrado.</div>;
  }

  const avgRating = reviews?.length
    ? (reviews.reduce((acc: number, rev) => acc + rev!.rating, 0) / reviews.length).toFixed(1)
    : 'Novo';

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="relative h-40 bg-linear-to-br from-green-600 to-green-800 overflow-hidden">
        <button
          onClick={() => navigate(-1)}
          className="absolute cursor-pointer top-4 left-4 z-10 bg-black/20 backdrop-blur-md p-2 rounded-full text-white active:bg-black/30 transition-colors"
        >
          <CaretLeftIcon className="size-6" />
        </button>
        <PlantIcon className="size-20 text-white opacity-15 absolute top-1/2 left-12 sm:left-20 -translate-y-1/2" />
        <CherriesIcon className="size-36 text-white opacity-15 absolute -bottom-6 right-3 sm:right-7" />
      </div>

      <div className="relative z-10 mb-6 px-4 pt-5">
        <div className="bg-green-100 w-fit text-consumer p-4 rounded-full -mt-14 mb-2 border-4 border-white shadow-sm">
          <StorefrontIcon className="size-10" />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl text-gray-900 leading-tight">{marketer.name}</h1>
          <div className="bg-emerald-50 rounded-xl font-semibold text-emerald-700 px-3 py-1.5 text-xs uppercase tracking-wider">
            Feirante
          </div>
        </div>

        <p className="text-primary font-medium mb-2">{marketer.stallName}</p>

        <div className="flex items-center gap-2 text-gray-800 font-bold text-lg mb-3">
          <StarIcon className="size-5 text-amber-400 fill-amber-400" />
          {avgRating}{' '}
          <span className="text-sm text-gray-500 font-medium ml-1">({reviews?.length || 0} avaliações)</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {marketer.operatingSchedule && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-full font-medium">
              <ClockIcon className="size-4 shrink-0" />
              {marketer.operatingSchedule}
            </div>
          )}

          {marketer.phone && (
            <a
              href={`tel:${marketer.phone}`}
              className="flex items-center gap-1.5 text-xs text-blue-700 bg-blue-50 border border-blue-100 px-3 py-2 rounded-full font-medium active:bg-blue-100 active:scale-95 transition-all cursor-pointer"
            >
              <PhoneIcon className="size-4 shrink-0" />
              {marketer.phone}
            </a>
          )}
        </div>
      </div>

      {marketer.latitude && marketer.longitude && (
        <div className="w-full px-4 my-4 py-4 border-t border-primary/10 text-left text-sm">
          <h3 className="font-bold text-primary mb-3 flex items-center gap-1 uppercase tracking-wider">
            <MapPinIcon className="size-4" /> Localização
          </h3>
          <StaticMap latitude={marketer.latitude} longitude={marketer.longitude} />
        </div>
      )}
      <div className="px-4">
        <section className="mb-8">
          <h3 className="font-bold mb-4 text-primary text-sm uppercase tracking-wide">Todos os Produtos</h3>
          {productsError && (
            <div className="text-center py-10 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-500 font-medium">Não foi possível carregar os produtos.</p>
            </div>
          )}
          {loadingProducts && <p className="text-center text-gray-500 py-10">Carregando produtos...</p>}
          {products && products.length > 0 ? (
            <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {products!.map(product => (
                <MarketerProductItem key={product.id} {...product} />
              ))}
            </ul>
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-gray-100">
              <PackageIcon className="size-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 font-medium">Nenhum produto disponível hoje.</p>
            </div>
          )}
        </section>

        <section id="avaliar">
          <h3 className="font-bold mb-4 text-primary text-sm uppercase tracking-wide">Avaliações</h3>

          {!hasReviewed &&
            (!isWritingReview ? (
              <button
                onClick={() => setIsWritingReview(true)}
                className="bg-consumer/10 cursor-pointer duration-200 active:opacity-60 text-consumer font-medium w-full py-3 rounded-xl mb-4 border border-consumer/20 transition-opacity"
              >
                Escrever uma Avaliação
              </button>
            ) : (
              <div className="mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <ReviewForm
                  marketerId={id!}
                  onSuccess={() => setIsWritingReview(false)}
                  onCancel={() => setIsWritingReview(false)}
                />
              </div>
            ))}

          {loadingReviews && <p className="text-center text-gray-500 py-10">Carregando avaliações...</p>}
          {reviewsError && (
            <div className="text-center py-10 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-500 font-medium">Não foi possível carregar as avaliações.</p>
            </div>
          )}
          {reviews && reviews.length > 0 ? (
            <ul className="space-y-3 mt-2">
              {reviews.map(review => (
                <ReviewItem key={review!.id} review={review!} />
              ))}
            </ul>
          ) : (
            <p className="text-center py-10 text-gray-500 bg-white rounded-2xl mt-4">
              Este feirante ainda não possui avaliações.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
