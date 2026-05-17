import { useParams, useNavigate, Link } from 'react-router';
import { useOrder } from '../../hooks/queries/useOrder';
import { useCancelOrder } from '../../hooks/mutations/useOrderActions';
import { OrderStatus } from '../../interfaces/orders';
import { currencyFormatter, dateTimeFormatter } from '../../utils/formatting';
import { Spinner } from '../../components/ui/Spinner';
import { CaretLeftIcon } from '../../components/icons/CaretLeftIcon';
import { StorefrontIcon } from '../../components/icons/StorefrontIcon';
import { statusDetailsConfig } from '../../components/consumer/orders/statusConfig';
import { imgUrl } from '../../libs/axios';
import { useMarketer } from '../../hooks/queries/useMarketer';
import { StaticMap } from '../../components/shared/StaticMap';

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: order, isPending } = useOrder(id!);
  const { mutate: cancelOrder, isPending: isCanceling } = useCancelOrder();

  const { data: marketer } = useMarketer(order?.marketerId || '', {
    enabled: !!order?.marketerId,
  });

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner className="size-8 text-consumer border-t-transparent" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Pedido não encontrado</h2>
        <button onClick={() => navigate(-1)} className="text-consumer font-medium">
          Voltar para a lista
        </button>
      </div>
    );
  }

  function handleCancel() {
    cancelOrder(order!.id, {
      onSuccess: () => navigate('/pedidos'),
    });
  }

  const config = statusDetailsConfig[order.status] || statusDetailsConfig[OrderStatus.PENDING];

  return (
    <div className="min-h-screen bg-gray-50 pb-36">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 flex items-center px-3 py-3 shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer p-2 -ml-2 active:bg-gray-100 rounded-full transition-colors"
        >
          <CaretLeftIcon className="size-6 text-gray-700" />
        </button>
        <h1 className="flex-1 text-center font-bold text-xl text-gray-800 pr-8">Detalhes do Pedido</h1>
      </div>

      <div className="padding-x mt-4 space-y-4">
        <div
          className={`${config.bg} ${config.border} border rounded-2xl p-5 text-center shadow-sm relative overflow-hidden`}
        >
          <div className="flex justify-center mb-3">
            <div className="bg-white p-3 rounded-full shadow-sm">{config.icon}</div>
          </div>
          <h2 className={`font-extrabold text-xl mb-1 ${config.color}`}>{config.title}</h2>
          <p className={`${config.color} opacity-90 text-sm leading-relaxed`}>{config.description}</p>
        </div>

        {(order.status === OrderStatus.ACCEPTED || order.status === OrderStatus.READY_FOR_PICKUP) && (
          <div className="bg-gray-900 rounded-2xl p-6 text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-gray-50 rounded-full -translate-y-1/2"></div>
            <div className="absolute top-1/2 -right-3 w-6 h-6 bg-gray-50 rounded-full -translate-y-1/2"></div>

            <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.15em] mb-2">Código de Retirada</p>
            <div className="text-white text-5xl font-mono font-black tracking-[0.25em] ml-[0.25em]">
              {order.deliveryCode}
            </div>
          </div>
        )}

        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-consumer/10 p-2.5 rounded-full text-consumer shrink-0">
              <StorefrontIcon className="size-6" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Local de Retirada</p>
              <p className="font-bold text-gray-800">{order.marketerName}</p>
            </div>
            <Link
              to={`/feirante/${order.marketerId}`}
              className="text-consumer text-xs font-bold bg-consumer/10 px-3 py-1.5 rounded-lg active:scale-95"
            >
              Ver perfil
            </Link>
          </div>

          {marketer?.latitude && marketer?.longitude && (
            <div className="pt-2">
              <StaticMap latitude={marketer.latitude} longitude={marketer.longitude} />
            </div>
          )}

          <div className="border-t border-gray-100 pt-4 flex justify-between text-sm">
            <div>
              <p className="text-gray-500 mb-0.5">Nº do Pedido</p>
              <p className="font-mono font-medium text-gray-800">#{order.id.split('-')[0]}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 mb-0.5">Data da Compra</p>
              <p className="font-medium text-gray-800 capitalize">{dateTimeFormatter(order.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-3">
            <h3 className="font-semibold text-gray-800 text-xs uppercase tracking-wider">Itens do Pedido</h3>
            <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
              {order.items.reduce((acc, item) => acc + item.quantity, 0)} Itens
            </span>
          </div>
          <ul className="space-y-4">
            {order.items.map(item => (
              <li key={item.productId} className="flex gap-3 items-center">
                <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={
                      item.productImageUrl
                        ? item.productImageUrl.startsWith('http')
                          ? item.productImageUrl
                          : `${imgUrl}${item.productImageUrl}`
                        : ''
                    }
                    alt={item.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-sm truncate">{item.productName}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.quantity}x {currencyFormatter(item.price)}
                  </p>
                </div>
                <div className="text-right font-bold text-gray-800 text-sm">{currencyFormatter(item.subTotal)}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white z-10 border-t mb-4 max-container mx-auto border-gray-100 p-4 shadow-sm fixed w-full bottom-10 left-0 right-0">
          <div className="flex justify-between padding-x gap-2 items-center text-sm font-bold text-gray-800">
            <span className="uppercase text-xs tracking-wider text-gray-800">Total a ser Pago na Retirada</span>
            <span className="text-lg text-consumer">{currencyFormatter(order.totalAmount)}</span>
          </div>
        </div>
        {order.status === OrderStatus.PENDING && (
          <div className="pt-4">
            <button
              onClick={handleCancel}
              disabled={isCanceling}
              className="w-full cursor-pointer py-4 rounded-xl font-bold active:bg-red-100 text-red-600 bg-red-50 active:opacity-60 border border-red-100 transition-all active:scale-95"
            >
              {isCanceling ? 'Cancelando...' : 'Cancelar Pedido'}
            </button>
            <p className="text-center text-xs text-gray-500 mt-3">
              Você só pode cancelar antes do feirante começar o preparo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
