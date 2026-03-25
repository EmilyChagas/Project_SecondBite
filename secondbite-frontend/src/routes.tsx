import { lazy, Suspense } from 'react';
import FallbackElement from './pages/FallbackElement';
import { createBrowserRouter } from 'react-router';

import { createAuthLoader, loggedLoader } from './utils/loaders/authLoader';
import Profile from './pages/consumer/Profile';
import SignUp from './pages/auth/Signup';
import RootLayout from './pages/RootLayout';
import { RootMarketerLayout } from './pages/RootMarketerLayout';
import MarketerProfile from './pages/marketer/MarketerProfile';
import UpdateLocation from './pages/marketer/UpdateLocation';
import { ErrorElement } from './pages/Error';
import Search from './pages/consumer/Search';

const Login = lazy(() => import('./pages/auth/Login'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    hydrateFallbackElement: <FallbackElement />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <div />,
      },
      {
        path: 'buscar',
        element: <Search />,
        loader: createAuthLoader(['CONSUMER']),
      },
      {
        path: 'produtos/:id',
        loader: createAuthLoader(['CONSUMER']),
        element: <div />,
      },
      {
        path: 'feirante/:id',
        loader: createAuthLoader(['CONSUMER']),
        element: <div />,
      },
      {
        path: 'carrinho',
        element: <div />,
        loader: createAuthLoader(['CONSUMER']),
      },
      {
        path: 'pedidos',
        loader: createAuthLoader(['CONSUMER']),
        element: <div />,
      },
      {
        path: 'pedidos/:id',
        loader: createAuthLoader(['CONSUMER']),
        element: <div />,
      },
      {
        path: 'perfil',
        loader: createAuthLoader(['CONSUMER']),
        element: <Profile />,
      },
    ],
    loader: createAuthLoader(['CONSUMER']),
  },
  {
    path: '/feirante',
    element: <RootMarketerLayout />,
    hydrateFallbackElement: <FallbackElement />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <div />,
      },
      {
        path: 'meus-produtos',
        element: <div />,
        loader: createAuthLoader(['MARKETER']),
      },
      {
        path: 'meus-produtos/:id',
        loader: createAuthLoader(['MARKETER']),
        element: <div />,
      },
      {
        path: 'meus-pedidos',
        loader: createAuthLoader(['MARKETER']),
        element: <div />,
      },
      {
        path: 'meus-pedidos/:id',
        loader: createAuthLoader(['MARKETER']),
        element: <div />,
      },
      {
        path: 'perfil',
        loader: createAuthLoader(['MARKETER']),
        element: <MarketerProfile />,
      },
      {
        path: 'atualizar-localizacao',
        loader: createAuthLoader(['MARKETER']),
        element: <UpdateLocation />,
      },
    ],
    loader: createAuthLoader(['MARKETER']),
  },
  {
    path: '/login',
    errorElement: <ErrorElement />,
    element: (
      <Suspense fallback={<FallbackElement />}>
        <Login />
      </Suspense>
    ),
    loader: loggedLoader,
  },
  {
    path: '/cadastro',
    errorElement: <ErrorElement />,
    element: (
      <Suspense fallback={<FallbackElement />}>
        <SignUp />
      </Suspense>
    ),
    loader: loggedLoader,
  },
]);
