import { useAuth } from '../../hooks/queries/useAuth';
import { useLogout } from '../../hooks/mutations/useLogout';
import { useDeleteConsumer } from '../../hooks/mutations/useDeleteConsumer';
import type { Consumer } from '../../interfaces/auth';
import { UserCircleIcon } from '../../components/icons/UserCircleIcon';
import { ProfileInfo } from '../../components/consumer/profile/ProfileInfo';
import { TrashIcon } from '../../components/icons/TrashIcon';
import { LogoutIcon } from '../../components/icons/LogoutIcon';

const Profile = () => {
  const { userAuth } = useAuth();
  const { mutate: logout } = useLogout();
  const { mutate: mutateDelete } = useDeleteConsumer();

  function handleDeleteAccount() {
    if (window.confirm('Tem certeza que deseja excluir sua conta?')) {
      mutateDelete({ id: userAuth!.id });
    }
  }

  return (
    <div className="min-h-screen pb-32 bg-gray-50">
      <div className="bg-linear-to-br from-consumer to-consumer pb-16 px-4 shadow-sm relative text-center">
        <h1 className="text-center font-bold text-xl pt-2 mb-2 top-0 z-20 text-white invisible">Meu Perfil</h1>
      </div>
      <div className="flex flex-col items-center mb-8 -mt-12 relative z-10">
        <div className="bg-white rounded-full shadow-md mb-3">
          <UserCircleIcon className="size-26 text-primary" />
        </div>
        <h2 className="font-bold text-xl text-gray-800">{userAuth?.name}</h2>
        <h3 className="text-sm text-gray-500 font-medium">{userAuth?.email}</h3>
      </div>
      <div className="px-4">
        <ProfileInfo {...(userAuth as Consumer)} />
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

export default Profile;
