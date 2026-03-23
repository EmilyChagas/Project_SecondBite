import { Outlet } from 'react-router';
import { ScrollToTop } from '../components/ScrollToTop';
import { Header } from '../components/consumer/header/Header';

const RootLayout = () => {
  return (
    <>
      <Header />
      <ScrollToTop />
      <main className="max-container">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
