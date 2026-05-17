import type { ReactNode } from 'react';

export const OrderList = ({ children }: { children: ReactNode }) => {
  return <ul className="grid gap-4 mt-4">{children}</ul>;
};
