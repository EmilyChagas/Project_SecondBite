import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MarketerRegisterSchema, type MarketerRegisterType } from '../../schemas/register';
import { useRegisterMarketer } from '../../hooks/mutations/useRegister';
import { LocationPickerMap } from '../../components/shared/LocationPickerMap';
import { Button } from '../../components/ui/Button';
import { InvalidInput } from '../../components/ui/InvalidInput';
import { EyeSlashIcon } from '../../components/icons/EyeSlashIcon';
import { EyeIcon } from '../../components/icons/EyeIcon';
import { LockIcon } from '../../components/icons/LockIcon';
import { UserIcon } from '../../components/icons/UserIcon';
import { MailIcon } from '../../components/icons/MailIcon';
import { IdCardIcon } from '../../components/icons/IdCardIcon';

export const MarketerSignUpForm = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const { mutate, isPending } = useRegisterMarketer();

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
    setValue,
    formState: { errors },
  } = useForm<MarketerRegisterType>({
    resolver: zodResolver(MarketerRegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      cnpj: '',
      stallName: '',
      password: '',
      confirmPassword: '',
      latitude: 0,
      longitude: 0,
    },
  });

  const onSubmit: SubmitHandler<MarketerRegisterType> = data => {
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
        <label htmlFor="cnpj" className="block font-medium text-primary text-sm">
          CPF/CNPJ
        </label>
        <div className="relative">
          <input
            id="cnpj"
            type="text"
            {...register('cnpj')}
            autoComplete="cnpj"
            placeholder="CPF/CNPJ"
            className={`px-3 py-4 w-full text-primary rounded-xl border border-primary/20 disabled:bg-gray-100 disabled:border-none pl-12 ${
              errors.cnpj
                ? 'is-invalid focus-visible:outline focus:outline-red-700'
                : 'focus-visible:outline focus:outline-neutral-300'
            }`}
          />
          <IdCardIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secundary/80 text-primary/80" />
        </div>
        {errors.cnpj && <InvalidInput text={errors.cnpj.message!} />}
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
      <div className="grid gap-2 mb-4">
        <label className="block font-medium text-primary text-sm">
          Nome da Banca <span className="text-primary/60">(opcional)</span>
        </label>
        <input
          {...register('stallName')}
          placeholder="Ex: Barraca do João"
          className={`px-3 py-4 w-full text-primary rounded-xl border border-primary/20 disabled:bg-gray-100 disabled:border-none ${
            errors.stallName
              ? 'is-invalid focus-visible:outline focus:outline-red-700'
              : 'focus-visible:outline focus:outline-neutral-300'
          }`}
        />
        {errors.stallName && <InvalidInput text={errors.stallName.message!} />}
      </div>

      <div className="mt-2 mb-4">
        <label className="block font-medium text-primary text-sm mb-1">Localização da Banca</label>
        <p className="text-xs text-gray-500 mb-2">Clique no mapa ou arraste o pino para o local exato da sua banca.</p>

        <LocationPickerMap
          onLocationSelect={(lat, lng) => {
            setValue('latitude', lat, { shouldValidate: true });
            setValue('longitude', lng, { shouldValidate: true });
          }}
          error={errors.latitude?.message}
        />
      </div>

      <Button type="submit" roleButton="bg-marketer" className="w-full py-5 mt-4" disabled={isPending}>
        {isPending ? 'Cadastrando...' : 'Cadastrar Banca'}
      </Button>
    </form>
  );
};
