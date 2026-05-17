import { CheckIcon } from '../../icons/CheckIcon';
import { PackageIcon } from '../../icons/PackageIcon';
import { XCircleIcon } from '../../icons/XCircleIcon';
import { ClockIcon } from '../../icons/ClockIcon';
import { OrderStatus } from '../../../interfaces/orders';

export const statusConfig = {
  [OrderStatus.PENDING]: {
    color: 'text-amber-600',
    bg: 'bg-amber-100',
    icon: <ClockIcon className="size-6" />,
    text: 'Aguardando Feirante',
  },
  [OrderStatus.ACCEPTED]: {
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    icon: <PackageIcon className="size-6" />,
    text: 'Em Preparo',
  },
  [OrderStatus.READY_FOR_PICKUP]: {
    color: 'text-consumer',
    bg: 'bg-consumer/20',
    icon: <CheckIcon className="size-6" />,
    text: 'Pronto para Retirada',
  },
  [OrderStatus.COMPLETED]: {
    color: 'text-gray-500',
    bg: 'bg-gray-100',
    icon: <CheckIcon className="size-6" />,
    text: 'Pedido Concluído',
  },
  [OrderStatus.CANCELED]: {
    color: 'text-red-600',
    bg: 'bg-red-100',
    icon: <XCircleIcon className="size-6" />,
    text: 'Cancelado',
  },
};

export const statusDetailsConfig = {
  [OrderStatus.PENDING]: {
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: <ClockIcon className="size-8 text-amber-500" />,
    title: 'Aguardando Confirmação',
    description: 'O feirante já recebeu seu pedido e está verificando a disponibilidade.',
  },
  [OrderStatus.ACCEPTED]: {
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: <PackageIcon className="size-8 text-blue-500" />,
    title: 'Em Preparo',
    description: 'O feirante aceitou seu pedido e está separando os alimentos.',
  },
  [OrderStatus.READY_FOR_PICKUP]: {
    color: 'text-emerald-800',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: <CheckIcon className="size-8 text-emerald-600" />,
    title: 'Pronto para Retirada!',
    description: 'Sua sacola está pronta. Vá até a banca e informe o código abaixo.',
  },
  [OrderStatus.COMPLETED]: {
    color: 'text-gray-700',
    bg: 'bg-gray-100',
    border: 'border-gray-200',
    icon: <CheckIcon className="size-8 text-gray-500" />,
    title: 'Pedido Entregue',
    description: 'Obrigado por ajudar a combater o desperdício de alimentos!',
  },
  [OrderStatus.CANCELED]: {
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: <XCircleIcon className="size-8 text-red-500" />,
    title: 'Pedido Cancelado',
    description: 'Este pedido foi cancelado e os itens retornaram ao estoque.',
  },
};

export const statusDetailsConfigMarketer = {
  [OrderStatus.PENDING]: {
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: <ClockIcon className="size-8 text-amber-500" />,
    title: 'Aguardando Confirmação',
    description: 'Você recebeu um pedido! Aceite o pedido para confirmar ou recuse-o.',
  },
  [OrderStatus.ACCEPTED]: {
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: <PackageIcon className="size-8 text-blue-500" />,
    title: 'Em Preparo',
    description: 'Você aceitou o pedido, separe os alimentos para a entrega.',
  },
  [OrderStatus.READY_FOR_PICKUP]: {
    color: 'text-emerald-800',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: <CheckIcon className="size-8 text-emerald-600" />,
    title: 'Pronto para Retirada!',
    description: 'A sacola está pronta para entrega! Espere o cliente insira o código abaixo.',
  },
  [OrderStatus.COMPLETED]: {
    color: 'text-gray-700',
    bg: 'bg-gray-100',
    border: 'border-gray-200',
    icon: <CheckIcon className="size-8 text-gray-500" />,
    title: 'Pedido Entregue',
    description: 'Obrigado por ajudar a combater o desperdício de alimentos!',
  },
  [OrderStatus.CANCELED]: {
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: <XCircleIcon className="size-8 text-red-500" />,
    title: 'Pedido Cancelado',
    description: 'Este pedido foi cancelado e os itens retornaram ao estoque.',
  },
};
