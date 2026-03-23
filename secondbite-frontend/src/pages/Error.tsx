import { useRouteError, Link, isRouteErrorResponse } from 'react-router';
import { CustomError } from '../utils/CustomError';
import { WarningCircleIcon } from '../components/icons/WarningCircleIcon';
import { StorefrontIcon } from '../components/icons/StorefrontIcon';
import { CaretLeftIcon } from '../components/icons/CaretLeftIcon';

export const ErrorElement = () => {
  const error = useRouteError();

  let statusCode = 500;
  let errorMessage = 'Deixamos algo cair no chão. Tente novamente.';

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    errorMessage = error.statusText || error.data;
  } else if (error instanceof CustomError) {
    statusCode = error.status || 500;
    errorMessage = error.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  if (statusCode === 404)
    errorMessage = 'Parece que essa página ou produto não existe mais. A feira já deve ter acabado por aqui!';
  else if (statusCode === 401 || statusCode === 403) errorMessage = 'Você precisa estar logado para acessar esta área.';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 p-4 shadow-sm flex items-center justify-center">
        <div className="flex items-center gap-2 text-consumer font-black text-xl tracking-tight">
          <StorefrontIcon className="size-6" />
          SecondBite
        </div>
      </header>

      <main className="padding-x pt-8 pb-6 text-center max-container mx-auto">
        <div className="bg-red-50 text-red-500 p-6 rounded-full mb-6 shadow-sm border-4 mx-auto w-fit border-white">
          <WarningCircleIcon className="size-20" />
        </div>

        <h1 className="text-4xl font-black text-black/80 mb-2">
          Ops! <span className="text-red-500">{statusCode}</span>
        </h1>

        <p className="text-primary mb-8 max-w-md leading-relaxed mx-auto">{errorMessage}</p>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mx-auto">
          <button
            onClick={() => window.history.back()}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl shadow-sm active:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer"
          >
            <CaretLeftIcon className="size-5" />
            Voltar
          </button>

          <Link
            to="/"
            className="flex-1 flex items-center justify-center py-3.5 bg-consumer text-white font-bold rounded-xl shadow-md active:opacity-60 active:scale-[0.98] transition-all cursor-pointer"
          >
            Página Inicial
          </Link>
        </div>
      </main>
    </div>
  );
};
