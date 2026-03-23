import { Outlet } from 'react-router';
import { ScrollToTop } from '../components/ScrollToTop';
import { MarketerHeader } from '../components/marketer/header/MarketerHeader';

export const RootMarketerLayout = () => {
  return (
    <>
      <MarketerHeader />
      <ScrollToTop />
      <main className="max-container">
        <Outlet />
      </main>
    </>
  );
};
