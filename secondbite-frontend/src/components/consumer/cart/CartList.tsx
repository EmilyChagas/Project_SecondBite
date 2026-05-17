import type { ReactNode } from 'react';

export const CartList = ({ children }: { children: ReactNode }) => {
  return <ul className="grid gap-3">{children}</ul>;
};
