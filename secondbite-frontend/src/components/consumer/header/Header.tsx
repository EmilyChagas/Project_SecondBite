import { NavLink } from 'react-router';
import HomeIcon from '../../icons/HomeIcon';
import SearchIcon from '../../icons/SearchIcon';
import CartIcon from '../../icons/CartIcon';
import { ListIcon } from '../../icons/ListIcon';
import { UserIcon } from '../../icons/UserIcon';

export const Header = () => {
  return (
    <header className="bg-white border-t z-50 border-primary/10 py-4 padding-x fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-container">
      <nav className="flex justify-around text-primary text-xs font-medium">
        <NavLink
          to="/"
          className={({ isActive }) => `grid gap-2 place-items-center ${isActive ? 'text-consumer' : ''}`}
        >
          <HomeIcon className="size-5" />
          <span>Início</span>
        </NavLink>
        <NavLink
          to="/buscar"
          className={({ isActive }) => `grid gap-2 place-items-center ${isActive ? 'text-consumer' : ''}`}
        >
          <SearchIcon className="size-5" />
          <span>Buscar</span>
        </NavLink>
        <NavLink
          to="/carrinho"
          className={({ isActive }) => `grid gap-2 place-items-center ${isActive ? 'text-consumer' : ''}`}
        >
          <CartIcon className="size-5" />
          <span>Carrinho</span>
        </NavLink>
        <NavLink
          to="/pedidos"
          className={({ isActive }) => `grid gap-2 place-items-center ${isActive ? 'text-consumer' : ''}`}
        >
          <ListIcon className="size-5" />
          <span>Pedidos</span>
        </NavLink>
        <NavLink
          to="/perfil"
          className={({ isActive }) => `grid gap-2 place-items-center ${isActive ? 'text-consumer' : ''}`}
        >
          <UserIcon className="size-5" />
          <span>Perfil</span>
        </NavLink>
      </nav>
    </header>
  )
}