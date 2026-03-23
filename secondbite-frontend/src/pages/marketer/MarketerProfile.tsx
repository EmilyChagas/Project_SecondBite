import { Link } from 'react-router';
import { useAuth } from '../../hooks/queries/useAuth';
import { useLogout } from '../../hooks/mutations/useLogout';
import { useDeleteMarketer } from '../../hooks/mutations/useDeleteMarketer';
import type { Marketer } from '../../interfaces/auth';
import { StorefrontIcon } from '../../components/icons/StorefrontIcon';
import { MarketerProfileInfo } from '../../components/marketer/profile/MarketerProfileInfo';
import { TrashIcon } from '../../components/icons/TrashIcon';
import { MapPinIcon } from '../../components/icons/MapPinIcon';
import { PackageIcon } from '../../components/icons/PackageIcon';
import { LogoutIcon } from '../../components/icons/LogoutIcon';

const MarketerProfile = () => {
  const { userAuth } = useAuth();
  const { mutate: logout } = useLogout();
  const { mutate: mutateDelete } = useDeleteMarketer();

  function handleDeleteAccount() {
    mutateDelete({ id: userAuth!.id });
  }

  const isProfileIncomplete = !(userAuth as Marketer)?.stallName || !(userAuth as Marketer)?.operatingSchedule;

  return (
    <div className="min-h-screen pb-32 bg-gray-50">
      <div className="bg-marketer pb-16 px-4 shadow-sm relative text-center">
        <h1 className="text-center font-bold text-xl pt-2 mb-2 top-0 z-20 text-white invisible">Meu Perfil</h1>
      </div>
      <div className="flex flex-col items-center -mt-12 mb-6 relative z-10">
        <div className="bg-white p-4 rounded-full shadow-md mb-3 border-4 border-gray-50 text-marketer">
          <StorefrontIcon className="size-14" />
        </div>
        <h2 className="font-bold text-xl text-gray-800 leading-tight text-center px-4">
          {(userAuth as Marketer)?.stallName || userAuth?.name}
        </h2>
        <h3 className="text-sm text-gray-500 font-medium mt-0.5">{userAuth?.email}</h3>
      </div>
      <div className="px-4">
        {isProfileIncomplete && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl text-sm mb-5 shadow-sm">
            <span className="font-bold">Dica:</span> Preencha o nome da sua banca e horário de funcionamento abaixo para
            atrair mais clientes!
          </div>
        )}
        <MarketerProfileInfo {...(userAuth as Marketer)} />
        <div className="mt-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-1">Gestão da Banca</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/feirante/meus-produtos"
              className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm transition-colors active:scale-95"
            >
              <div className="bg-marketer/10 p-2 rounded-full text-marketer">
                <PackageIcon className="size-6" />
              </div>
              <span className="font-bold text-gray-700 text-sm">Meus Produtos</span>
            </Link>
            <Link
              to="/feirante/atualizar-localizacao"
              className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm transition-colors active:scale-95"
            >
              <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                <MapPinIcon className="size-6" />
              </div>
              <span className="font-bold text-gray-700 text-sm">Atualizar Mapa</span>
            </Link>
          </div>
        </div>
        <div className="mt-8 mb-4 border-t border-gray-200 pt-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-1">
            Configurações da Conta
          </h3>
          <div className="grid gap-3">
            <button
              onClick={() => logout()}
              className="w-full cursor-pointer bg-white border border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-sm active:bg-gray-50 active:scale-[0.98] transition-all"
            >
              <LogoutIcon className="size-5" /> Sair da conta
            </button>
            <button
              onClick={handleDeleteAccount}
              className="w-full cursor-pointer bg-red-50 border border-red-100 text-red-600 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 active:bg-red-100 active:scale-[0.98] transition-all"
            >
              <TrashIcon className="size-5" />
              Excluir conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketerProfile;
