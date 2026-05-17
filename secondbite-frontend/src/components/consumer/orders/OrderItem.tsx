import { Link } from 'react-router';
import { type Order, OrderStatus } from '../../../interfaces/orders';
import { currencyFormatter, dateTimeFormatter } from '../../../utils/formatting';
import { CaretRightIcon } from '../../icons/CaretRightIcon';

import { StorefrontIcon } from '../../icons/StorefrontIcon';
import { statusConfig } from './statusConfig';
import { useCancelOrder } from '../../../hooks/mutations/useOrderActions';

export const OrderItem = ({ id, status, marketerName, totalAmount, createdAt, deliveryCode, items }: Order) => {
  const { mutate: cancel, isPending } = useCancelOrder();

  function handleCancelOrder() {
    cancel(id);
  }

  const config = statusConfig[status] || statusConfig[OrderStatus.PENDING];

  const itemsText = items
    ?.slice(0, 2)
    .map(i => `${i.quantity}x ${i.productName}`)
    .join(', ');
  const hasMoreItems = (items?.length || 0) > 2;

  return (
    <li className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex justify-between items-center px-4 pt-3 border-b border-gray-50 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <StorefrontIcon className="size-4 text-gray-600" />
          <span className="font-bold text-gray-800 text-sm truncate">{marketerName}</span>
        </div>
        <span className="text-xs text-gray-500 font-medium capitalize">{dateTimeFormatter(createdAt)}</span>
      </div>

      <Link to={`/pedidos/${id}`} className="block p-4">
        <div className="flex gap-4 items-center">
          <div
            className={`p-3 rounded-2xl shrink-0 ${config.bg} ${config.color} active:scale-105 transition-transform`}
          >
            {config.icon}
          </div>

          <div className="flex-1 min-w-0">
            <p className={`font-bold text-xs uppercase mb-1 ${config.color}`}>{config.text}</p>
            <p className="text-xs text-gray-500 truncate mb-1">
              {itemsText} {hasMoreItems && `...e mais ${items!.length - 2}`}
            </p>
            <p className="font-extrabold text-gray-800 text-sm">{currencyFormatter(totalAmount)}</p>
          </div>

          <CaretRightIcon className="text-gray-500 size-5 shrink-0" />
        </div>
      </Link>

      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/30 flex justify-between items-center gap-3">
        {status === OrderStatus.ACCEPTED || status === OrderStatus.READY_FOR_PICKUP ? (
          <div className="flex-1">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Código de Retirada</p>
            <p className="font-mono text-lg font-black tracking-[0.2em] text-gray-800">{deliveryCode}</p>
          </div>
        ) : (
          <div className="flex-1 text-xs text-gray-400 font-mono">#{id.split('-')[0]}</div>
        )}

        {status === OrderStatus.PENDING && (
          <button
            onClick={handleCancelOrder}
            disabled={isPending}
            className="text-xs cursor-pointer font-bold text-red-600 bg-red-50 active:bg-red-100 px-4 py-2.5 rounded-lg transition-colors active:scale-95 disabled:opacity-50"
          >
            {isPending ? 'Cancelando...' : 'Cancelar'}
          </button>
        )}
      </div>
    </li>
  );
};
