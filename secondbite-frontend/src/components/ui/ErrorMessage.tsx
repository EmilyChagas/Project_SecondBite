import { WarningCircleIcon } from '../icons/WarningCircleIcon';

interface ErrorMessageProps {
  title: string;
  message: string;
  className?: string;
}

export const ErrorMessage = ({ title, message, className = '' }: ErrorMessageProps) => {
  return (
    <div className={`${className} w-full bg-red-600/15 py-6 padding-x flex gap-4 rounded-xl`}>
      <div className="flex items-center justify-center">
        <WarningCircleIcon className="size-14 text-red-800" />
      </div>
      <div>
        <h2 className="text-lg font-bold pb-2 text-black/70">{title}</h2>
        <p className="text-sm font-medium text-black/70">{message}</p>
      </div>
    </div>
  );
};
