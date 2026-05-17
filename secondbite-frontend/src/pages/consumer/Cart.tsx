import { CartItem } from '../../components/consumer/cart/CartItem';
import { CartList } from '../../components/consumer/cart/CartList';
import { TrashIcon } from '../../components/icons/TrashIcon';
import { Button } from '../../components/ui/Button';
import { useDeleteCart } from '../../hooks/mutations/useDeleteCart';
import { useCart } from '../../hooks/queries/useCart';
import { currencyFormatter } from '../../utils/formatting';

import cartEmpty from '../../assets/emptyCart.webp';
import { Link } from 'react-router';
import { useCheckout } from '../../hooks/mutations/useCheckout';
import { StorefrontIcon } from '../../components/icons/StorefrontIcon';
import { MapPinIcon } from '../../components/icons/MapPinIcon';
import { WarningCircleIcon } from '../../components/icons/WarningCircleIcon';
import { ErrorMessage } from '../../components/ui/ErrorMessage';

const Cart = () => {
  const { data, isPending, isError } = useCart();
  const { mutate } = useDeleteCart();
  const { mutate: mutateCheckout, isPending: isCheckingOut } = useCheckout();

  let isEmpty = true;
  if (data && data.items.length) isEmpty = false;

  const totalOriginalPrice =
    data?.items.reduce((acc, item) => {
      const original = item.product.originalPrice || item.product.price;
      return acc + original * item.quantity;
    }, 0) || 0;

  const totalDiscount = totalOriginalPrice - (data?.totalAmount || 0);

  const marketerInfo = data?.items[0]?.product;

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <h1 className="text-center font-bold text-xl py-4 bg-white border-b border-gray-100 mb-4 top-0 z-20 shadow-sm">
        Meu Carrinho
      </h1>

      {data && data.totalItems > 0 && (
        <div className="padding-x space-y-6">
          <div>
            {/* <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-3 px-1">Seus Produtos</h2> */}
            <CartList>
              {data.items.map(item => (
                <CartItem key={item.id} {...item} />
              ))}
            </CartList>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start shadow-sm">
            <WarningCircleIcon className="text-amber-600 size-6 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-900 text-sm mb-1">Pagamento na Retirada</h3>
              <p className="text-amber-800 text-xs leading-relaxed">
                Você não paga nada agora. O pagamento deve ser feito diretamente com o feirante no momento da retirada
                (PIX, Dinheiro ou Cartão).
              </p>
            </div>
          </div>

          {marketerInfo && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h2 className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                <StorefrontIcon className="text-gray-400 size-5" />
                Local de Retirada
              </h2>

              <div className="flex gap-3">
                <div className="bg-consumer/10 p-2 rounded-full h-fit text-consumer">
                  <MapPinIcon className="size-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">
                    {marketerInfo.stallName || marketerInfo.marketerName}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Responsável: {marketerInfo.marketerName}</p>
                  <Link
                    to={`/feirante/${marketerInfo.marketerId}`}
                    className="text-consumer text-xs font-bold mt-2 inline-block hover:underline"
                  >
                    Ver mapa no perfil do feirante
                  </Link>
                </div>
              </div>
            </div>
          )}

          <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-800 text-lg mb-4">Resumo do Pedido</h2>

            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal ({data.totalItems} itens)</span>
                <span className="font-medium">{currencyFormatter(totalOriginalPrice)}</span>
              </div>

              {totalDiscount > 0 && (
                <div className="flex justify-between text-sm text-green-600 font-medium bg-green-50 p-2 rounded-lg -mx-2">
                  <span>Descontos aplicados</span>
                  <span>- {currencyFormatter(totalDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between pt-4 border-t border-gray-200 items-end">
                <span className="font-bold text-gray-800">Total a pagar na banca</span>
                <span className="font-extrabold text-xl text-consumer leading-none">
                  {currencyFormatter(data.totalAmount)}
                </span>
              </div>
            </div>
          </section>

          <button
            onClick={() => mutate()}
            className="w-full cursor-pointer mb-12 flex gap-2 items-center justify-center font-bold text-red-600 p-3 rounded-xl active:bg-red-50 active:scale-95 transition-all"
          >
            <TrashIcon className="size-5" />
            <span>Esvaziar Carrinho</span>
          </button>
        </div>
      )}
      {isError && (
        <div className="padding-x mt-4">
          <ErrorMessage title="Ocorreu um erro!" message="Erro ao carregar os itens do carrinho, tente mais tarde." />
        </div>
      )}
      {isPending && (
        <div className="padding-y min-h-screen flex justify-center">
          <span className="loader"></span>
        </div>
      )}
      {!isEmpty && (
        <div className="fixed bottom-14.5 left-0 w-full z-40 bg-white border-t border-gray-200 px-4 py-3 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="max-container flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium">Total:</span>
              <span className="font-extrabold text-xl text-gray-900 leading-none">
                {currencyFormatter(data!.totalAmount)}
              </span>
            </div>

            <Button
              onClick={() => mutateCheckout()}
              disabled={isCheckingOut}
              roleButton="bg-consumer"
              className="flex-1 py-3.5 text-base shadow-lg"
            >
              {isCheckingOut ? 'Processando...' : 'Confirmar Pedido'}
            </Button>
          </div>
        </div>
      )}

      {isEmpty && (
        <div className="bg-white px-6 py-10 mx-4 mt-8 shadow-sm border border-gray-100 rounded-2xl flex flex-col items-center">
          <img src={cartEmpty} alt="Carrinho vazio" className="w-32 h-32 object-contain opacity-80 mb-6" />
          <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Seu carrinho está vazio</h3>
          <p className="text-gray-500 text-center text-sm mb-8 leading-relaxed">
            Parece que você ainda não adicionou nenhum alimento para salvar do desperdício hoje.
          </p>
          <Link
            to="/buscar"
            className="w-full bg-consumer p-3.5 font-bold text-center text-white rounded-xl shadow-md active:bg-green-700 transition-colors"
          >
            Explorar Ofertas
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
