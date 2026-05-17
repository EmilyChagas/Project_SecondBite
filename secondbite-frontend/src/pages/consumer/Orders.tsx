import { useState } from 'react';
import { useOrders } from '../../hooks/queries/useOrders';
import { OrderStatus } from '../../interfaces/orders';
import { OrderList } from '../../components/consumer/orders/OrderList';
import { OrderItem } from '../../components/consumer/orders/OrderItem';
import cartEmpty from '../../assets/emptyCart.webp';
import { ErrorMessage } from '../../components/ui/ErrorMessage';

type FilterTab = OrderStatus | 'ACTIVE' | 'ALL';

const TABS: { label: string; value: FilterTab }[] = [
  { label: 'Em andamento', value: 'ACTIVE' },
  { label: 'Concluídos', value: OrderStatus.COMPLETED },
  { label: 'Cancelados', value: OrderStatus.CANCELED },
  { label: 'Todos', value: 'ALL' },
];

const Orders = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>('ACTIVE');

  const {
    data: orders,
    isPending,
    isError,
  } = useOrders({
    status: activeTab === 'ACTIVE' || activeTab === 'ALL' ? undefined : activeTab,
  });

  const filteredOrders = orders?.filter(order => {
    if (activeTab === 'ACTIVE')
      return [OrderStatus.PENDING, OrderStatus.ACCEPTED, OrderStatus.READY_FOR_PICKUP].includes(order.status);

    return true;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <h1 className="text-center font-bold text-xl py-4 padding-x text-gray-800">Meus Pedidos</h1>
        <ul className="flex gap-4 overflow-x-auto padding-x scrollbar-hide">
          {TABS.map(tab => (
            <li key={tab.value} className="shrink-0">
              <button
                onClick={() => setActiveTab(tab.value)}
                className={`py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab.value ? 'border-consumer text-consumer' : 'border-transparent text-gray-400'
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="padding-x mt-4">
        {isPending && <p className="text-center py-10 text-gray-500 font-medium animate-pulse">Buscando pedidos...</p>}
        {filteredOrders && filteredOrders.length > 0 && (
          <OrderList>
            {filteredOrders.map(order => (
              <OrderItem key={order.id} {...order} />
            ))}
          </OrderList>
        )}
        {!isPending && filteredOrders && filteredOrders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center mt-6">
            <img src={cartEmpty} alt="Sem pedidos" className="w-24 h-24 opacity-60 mb-4 grayscale" />
            <p className="text-center font-bold text-gray-700 text-lg">Nenhum pedido por aqui</p>
            <p className="text-center text-gray-500 text-sm mt-1">
              Você não possui pedidos com este status no momento.
            </p>
          </div>
        )}
        {isError && (
          <ErrorMessage title="Ocorreu um erro!" message="Erro ao buscar os seus pedidos, tente mais tarde." />
        )}
      </div>
    </div>
  );
};

export default Orders;
