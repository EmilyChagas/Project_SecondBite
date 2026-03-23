import { useState } from 'react';
import { Link } from 'react-router';
import { CaretLeftIcon } from '../../components/icons/CaretLeftIcon';
import { BasketIcon } from '../../components/icons/BasketIcon';
import { StoreFilledIcon } from '../../components/icons/StoreFilledIcon';

import { MarketerSignUpForm } from './MarketerSignUpForm';
import { ConsumerSignUpForm } from './ConsumerSignUpForm';

const SignUp = () => {
  const [currentRole, setCurrentRole] = useState<'consumer' | 'marketer'>('consumer');

  return (
    <main className="bg-[#fffefc] min-h-screen">
      <section className="max-container padding-x pb-8 text-black">
        <div className="relative py-6 mb-4 max-w-lg mx-auto">
          <Link to="/login" className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-primary">
            <CaretLeftIcon className="size-6 text-primary" />
          </Link>
          <div className="text-center text-xl font-semibold">Cadastro de Usuário</div>
        </div>

        <h1 className="font-bold max-w-lg mx-auto text-3xl mb-5">Crie sua Conta</h1>

        <div className="max-w-lg mx-auto mb-8">
          <h2 className="block font-semibold text-primary mb-3">Qual é o seu perfil?</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setCurrentRole('consumer')}
              className={`border text-sm font-semibold rounded-xl flex flex-col justify-center items-center gap-2 py-4 px-3 transition-colors ${
                currentRole === 'consumer'
                  ? 'border-consumer bg-consumer/10 text-consumer'
                  : 'border-primary/20 text-primary'
              }`}
            >
              <BasketIcon className="size-7" /> Consumidor
            </button>
            <button
              onClick={() => setCurrentRole('marketer')}
              className={`border text-sm font-semibold rounded-xl flex flex-col justify-center items-center gap-2 py-4 px-3 transition-colors ${
                currentRole === 'marketer'
                  ? 'border-marketer bg-marketer/10 text-marketer'
                  : 'border-primary/20 text-primary'
              }`}
            >
              <StoreFilledIcon className="size-7" /> Feirante
            </button>
          </div>
        </div>

        <div className="max-w-lg mx-auto">
          {currentRole === 'consumer' ? <ConsumerSignUpForm /> : <MarketerSignUpForm />}
        </div>
        <p className="text-center text-primary mt-5">
          Já possui uma conta?{' '}
          <Link to="/login" className={`${currentRole === 'consumer' ? 'text-consumer' : 'text-marketer'} font-medium`}>
            Faça login
          </Link>
        </p>
      </section>
    </main>
  );
};

export default SignUp;
