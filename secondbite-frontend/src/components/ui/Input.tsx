import { type ComponentPropsWithoutRef } from 'react';

type InputProps = {
  label: string;
  id: string;
  isInValid?: boolean;
} & ComponentPropsWithoutRef<'input'>;

export const Input = ({ label, id, isInValid = false, ...props }: InputProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-primary text-sm font-semibold pb-1">
        {label}
      </label>
      <input
        id={id}
        name={id}
        {...props}
        className={`p-3 w-full border border-primary/30 rounded-xl text-primary disabled:bg-gray-100 ${
          isInValid
            ? 'is-invalid focus-visible:outline focus:outline-red-700'
            : 'focus-visible:outline focus:outline-neutral-600'
        }`}
      />
    </div>
  );
};
