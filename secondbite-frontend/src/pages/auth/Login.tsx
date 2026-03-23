import { zodResolver } from '@hookform/resolvers/zod';
import { BasketIcon } from '../../components/icons/BasketIcon';
import { LoginSchema, type LoginType } from '../../schemas/login';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { InvalidInput } from '../../components/ui/InvalidInput';
import { useLogin } from '../../hooks/mutations/useLogin';
import { useState } from 'react';
import { EyeSlashIcon } from '../../components/icons/EyeSlashIcon';
import { EyeIcon } from '../../components/icons/EyeIcon';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router';
import { MailIcon } from '../../components/icons/MailIcon';
import { LockIcon } from '../../components/icons/LockIcon';

const Login = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  function handleTogglePassword() {
    setPasswordIsVisible(prevState => !prevState);
  }

  const { mutate } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginType> = data => {
    mutate(data);
  };

  return (
    <main className="bg-[#f6f8f6] min-h-screen">
      <div>
        <section className="max-container padding-x padding-y text-black">
          <div className="rounded-full p-4 bg-consumer/20 w-fit mx-auto mb-4 mt-5">
            <BasketIcon className="text-consumer size-8" />
          </div>
          <h1 className="font-bold text-3xl text-center mb-5">Bem-vind@ de volta!</h1>
          <p className="text-center text-primary mb-5">Entre na sua conta para continuar suas compras!</p>
          <form onSubmit={handleSubmit(onSubmit)} className="py-3 max-w-lg mx-auto">
            <div className="grid gap-2 mb-4">
              <label htmlFor="email" className="block font-medium text-primary">
                E-mail
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  autoComplete="email"
                  placeholder="Digite o seu e-mail"
                  className={`px-3 py-4 w-full text-primary rounded-xl bg-white border border-primary/20 disabled:bg-gray-100 disabled:border-none pl-12 ${
                    errors.email
                      ? 'is-invalid focus-visible:outline focus:outline-red-700'
                      : 'focus-visible:outline focus:outline-neutral-300'
                  }`}
                />
                <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secundary/80 text-primary/80" />
              </div>
              {errors.email && <InvalidInput text={errors.email.message!} />}
            </div>
            <div className="grid gap-2 mb-6">
              <label htmlFor="email" className="block font-medium text-primary">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  placeholder="Digite a sua senha"
                  autoComplete={`${passwordIsVisible ? '' : 'current-password'}`}
                  {...register('password')}
                  type={`${passwordIsVisible ? 'text' : 'password'}`}
                  className={`px-3 py-4 w-full text-primary rounded-xl bg-white border border-primary/20 disabled:bg-gray-100 disabled:border-none pl-12 ${
                    errors.password
                      ? 'is-invalid focus-visible:outline focus:outline-red-700'
                      : 'focus-visible:outline focus:outline-neutral-300'
                  }`}
                />
                <button
                  type="button"
                  className="absolute block border-none right-4 top-1/2 -translate-y-1/2 text-secundary/80 xs:hover:text-primary duration-200 active:text-primary"
                  onClick={handleTogglePassword}
                >
                  {passwordIsVisible ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
                <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secundary/80 text-primary/80" />
              </div>
              {errors.password && <InvalidInput text={errors.password.message!} />}
            </div>

            <Button roleButton="bg-consumer" className="w-full py-5">
              Entrar
            </Button>
            <p className="text-center text-primary mt-5">
              Não tem uma conta?{' '}
              <Link to="/cadastro" className="text-consumer font-medium">
                Cadastre-se
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Login;
