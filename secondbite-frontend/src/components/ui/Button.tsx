import { type ReactNode, type ComponentPropsWithoutRef } from 'react';

type ButtonProps = {
  children: ReactNode;
  className?: string;
  roleButton: 'bg-marketer' | 'bg-consumer';
} & ComponentPropsWithoutRef<'button'>;

export const Button = ({ children, className = '', roleButton, ...props }: ButtonProps) => {
  return (
    <button
      className={`text-center p-3 cursor-pointer text-white font-semibold rounded-xl active:opacity-60 transition-opacity duration-300 ${roleButton} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
