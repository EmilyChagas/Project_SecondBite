import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ConsumerRegisterSchema, type ConsumerRegisterType } from '../../schemas/register';
import { useRegisterConsumer } from '../../hooks/mutations/useRegister';
import { Button } from '../../components/ui/Button';
import { InvalidInput } from '../../components/ui/InvalidInput';
import { EyeSlashIcon } from '../../components/icons/EyeSlashIcon';
import { EyeIcon } from '../../components/icons/EyeIcon';
import { LockIcon } from '../../components/icons/LockIcon';
import { UserIcon } from '../../components/icons/UserIcon';
import { MailIcon } from '../../components/icons/MailIcon';
import { IdCardIcon } from '../../components/icons/IdCardIcon';
import { PhoneIcon } from '../../components/icons/PhoneIcon';

export const ConsumerSignUpForm = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const { mutate, isPending } = useRegisterConsumer();

  const [confirmPasswordIsVisible, setConfirmPasswordIsVisible] = useState(false);

  function handleTogglePassword() {
    setPasswordIsVisible(prevState => !prevState);
  }

  function handleToggleConfirmPassword() {
    setConfirmPasswordIsVisible(prevState => !prevState);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsumerRegisterType>({
    resolver: zodResolver(ConsumerRegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      cpf: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<ConsumerRegisterType> = data => {
    const { confirmPassword, ...payload } = data;
    if (confirmPassword !== payload.password) return;

    mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <div className="grid gap-2 mb-4">
        <label htmlFor="email" className="block font-medium text-primary text-sm">
          Nome Completo
        </label>
        <div className="relative">
          <input
            id="name"
            type="text"
            {...register('name')}
            autoComplete="name"
            placeholder="Digite o seu nome completo"
            className={`px-3 py-4 w-full text-primary rounded-xl border border-primary/20 disabled:bg-gray-100 disabled:border-none pl-12 ${
              errors.name
                ? 'is-invalid focus-visible:outline focus:outline-red-700'
                : 'focus-visible:outline focus:outline-neutral-300'
            }`}
          />
          <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secundary/80 text-primary/80" />
        </div>
        {errors.name && <InvalidInput text={errors.name.message!} />}
      </div>
      <div className="grid gap-2 mb-4">
        <label htmlFor="email" className="block font-medium text-primary text-sm">
          E-mail
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            {...register('email')}
            autoComplete="email"
            placeholder="Digite o seu e-mail"
            className={`px-3 py-4 w-full text-primary rounded-xl border border-primary/20 disabled:bg-gray-100 disabled:border-none pl-12 ${
              errors.email
                ? 'is-invalid focus-visible:outline focus:outline-red-700'
                : 'focus-visible:outline focus:outline-neutral-300'
            }`}
          />
          <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secundary/80 text-primary/80" />
        </div>
        {errors.email && <InvalidInput text={errors.email.message!} />}
      </div>

      <div className="grid gap-2 mb-4">
        <label htmlFor="phone" className="block font-medium text-primary text-sm">
          Telefone/Celular
        </label>
        <div className="relative">
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            {...register('phone')}
            placeholder="Digite o seu telefone/celular"
            className={`px-3 py-4 w-full text-primary rounded-xl border border-primary/20 disabled:bg-gray-100 disabled:border-none pl-12 ${
              errors.phone
                ? 'is-invalid focus-visible:outline focus:outline-red-700'
                : 'focus-visible:outline focus:outline-neutral-300'
            }`}
          />
          <PhoneIcon className="size-6 absolute left-3.5 top-1/2 -translate-y-1/2 text-secundary/80 text-primary/80" />
        </div>
        {errors.phone && <InvalidInput text={errors.phone.message!} />}
      </div>
      <div className="grid gap-2 mb-4">
        <label htmlFor="cpf" className="block font-medium text-primary text-sm">
          CPF
        </label>
        <div className="relative">
          <input
            id="cpf"
            type="text"
            {...register('cpf')}
            autoComplete="cpf"
            placeholder="CPF"
            className={`px-3 py-4 w-full text-primary rounded-xl border border-primary/20 disabled:bg-gray-100 disabled:border-none pl-12 ${
              errors.cpf
                ? 'is-invalid focus-visible:outline focus:outline-red-700'
                : 'focus-visible:outline focus:outline-neutral-300'
            }`}
          />
          <IdCardIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secundary/80 text-primary/80" />
        </div>
        {errors.cpf && <InvalidInput text={errors.cpf.message!} />}
      </div>
      <div className="grid gap-2 mb-6">
        <label htmlFor="password" className="block font-medium text-primary text-sm">
          Senha
        </label>
        <div className="relative">
          <input
            id="password"
            placeholder="Digite a sua senha"
            autoComplete={`${passwordIsVisible ? '' : 'current-password'}`}
            {...register('password')}
            type={`${passwordIsVisible ? 'text' : 'password'}`}
            className={`px-3 py-4 w-full text-primary rounded-xl border border-primary/20 disabled:bg-gray-100 disabled:border-none pl-12 ${
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
      <div className="grid gap-2 mb-6">
        <label htmlFor="confirmPassword" className="block font-medium text-primary text-sm">
          Confirme a senha
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            placeholder="Confirme a sua senha"
            autoComplete={`${passwordIsVisible ? '' : 'current-password'}`}
            {...register('confirmPassword')}
            type={`${passwordIsVisible ? 'text' : 'password'}`}
            className={`px-3 py-4 w-full text-primary rounded-xl border border-primary/20 disabled:bg-gray-100 disabled:border-none pl-12 ${
              errors.confirmPassword
                ? 'is-invalid focus-visible:outline focus:outline-red-700'
                : 'focus-visible:outline focus:outline-neutral-300'
            }`}
          />
          <button
            type="button"
            className="absolute block border-none right-4 top-1/2 -translate-y-1/2 text-secundary/80 xs:hover:text-primary duration-200 active:text-primary"
            onClick={handleToggleConfirmPassword}
          >
            {confirmPasswordIsVisible ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
          <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secundary/80 text-primary/70" />
        </div>
        {errors.confirmPassword && <InvalidInput text={errors.confirmPassword.message!} />}
      </div>

      <Button type="submit" roleButton="bg-consumer" className="w-full py-5 mt-4" disabled={isPending}>
        {isPending ? 'Cadastrando...' : 'Cadastrar'}
      </Button>
    </form>
  );
};
