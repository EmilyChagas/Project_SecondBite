import { NavLink } from 'react-router';
import { ListIcon } from '../../icons/ListIcon';
import { UserIcon } from '../../icons/UserIcon';
import HomeIcon from '../../icons/HomeIcon';
import { OrangeIcon } from '../../icons/OrangeIcon';

export const MarketerHeader = () => {
  return (
    <header className="bg-white border-t z-50 border-primary/10 py-4 padding-x fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-container">
      <nav className="flex justify-around text-primary text-xs font-medium">
        <NavLink
          to="/feirante"
          end
          className={({ isActive }) => `grid gap-2 place-items-center ${isActive ? 'text-marketer' : ''}`}
        >
          <HomeIcon className="size-5" />
          <span>Início</span>
        </NavLink>
        <NavLink
          to="/feirante/meus-produtos"
          className={({ isActive }) => `grid gap-2 place-items-center ${isActive ? 'text-marketer' : ''}`}
        >
          <OrangeIcon className="size-5" />
          <span>Produtos</span>
        </NavLink>

        <NavLink
          to="/feirante/meus-pedidos"
          className={({ isActive }) => `grid gap-2 place-items-center ${isActive ? 'text-marketer' : ''}`}
        >
          <ListIcon className="size-5" />
          <span>Pedidos</span>
        </NavLink>
        <NavLink
          to="/feirante/perfil"
          className={({ isActive }) => `grid gap-2 place-items-center ${isActive ? 'text-marketer' : ''}`}
        >
          <UserIcon className="size-5" />
          <span>Perfil</span>
        </NavLink>
      </nav>
    </header>
  );
};
