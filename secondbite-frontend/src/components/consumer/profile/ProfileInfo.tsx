import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Consumer } from '../../../interfaces/auth';
import { UpdateConsumerSchema, type UpdateConsumerType } from '../../../schemas/updateSchema';
import { useUpdateConsumer } from '../../../hooks/mutations/useUpdateConsumer';
import { Input } from '../../ui/Input';
import { InvalidInput } from '../../ui/InvalidInput';
import { Button } from '../../ui/Button';
import { Spinner } from '../../ui/Spinner';
import { PincelIcon } from '../../icons/PincelIcon';

export const ProfileInfo = ({ id, name, email, phone, cpf, address }: Consumer) => {
  const [isEditing, setIsEditing] = useState(false);
  const { mutate, isPending } = useUpdateConsumer();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateConsumerType>({
    resolver: zodResolver(UpdateConsumerSchema),
    defaultValues: {
      name,
      email,
      cpf,
      phone,
      address: address || '',
    },
  });

  function handleClickEdit() {
    if (isEditing) reset();
    setIsEditing(prevState => !prevState);
  }

  const onSubmit: SubmitHandler<UpdateConsumerType> = data => {
    mutate({ consumerData: data, id }, { onSuccess: () => setIsEditing(false) });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mx-auto max-w-lg transition-all"
    >
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-50">
        <h3 className="font-bold text-gray-800 text-lg">Dados Pessoais</h3>
        {!isEditing && (
          <button
            onClick={handleClickEdit}
            type="button"
            className="flex cursor-pointer items-center gap-1.5 text-consumer text-sm font-bold bg-consumer/10 px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
          >
            <PincelIcon className="size-4" />
            Editar
          </button>
        )}
      </div>
      <div className="space-y-4">
        <div className="grid gap-1">
          <Input
            id="name"
            label="Nome Completo"
            type="text"
            disabled={!isEditing}
            isInValid={!!errors.name}
            {...register('name')}
            placeholder="Digite o seu nome"
          />
          {errors.name && <InvalidInput text={errors.name.message!} />}
        </div>
        <div className="grid gap-1">
          <Input
            id="email"
            label="E-mail"
            autoComplete="email"
            type="email"
            disabled={!isEditing}
            isInValid={!!errors.email}
            {...register('email')}
            placeholder="Digite o seu e-mail"
          />
          {errors.email && <InvalidInput text={errors.email.message!} />}
        </div>
        <div className="grid gap-1">
          <Input
            id="cpf"
            label="CPF"
            disabled={!isEditing}
            type="text"
            isInValid={!!errors.cpf}
            {...register('cpf')}
            placeholder="000.000.000-00"
          />
          {errors.cpf && <InvalidInput text={errors.cpf.message!} />}
        </div>
        <div className="grid gap-1">
          <Input
            id="telefone"
            label="Celular"
            type="tel"
            disabled={!isEditing}
            isInValid={!!errors.phone}
            {...register('phone')}
            placeholder="(11) 99999-9999"
          />
          {errors.phone && <InvalidInput text={errors.phone.message!} />}
        </div>
        <div className="grid gap-1">
          <Input
            id="address"
            label="Endereço Padrão (Opcional)"
            disabled={!isEditing}
            type="text"
            isInValid={!!errors.address}
            {...register('address')}
            placeholder="Rua, Número, Bairro"
          />
          {errors.address && <InvalidInput text={errors.address.message!} />}
        </div>
      </div>
      {isEditing && (
        <div className="flex gap-3 pt-6 mt-2 border-t border-gray-50">
          <button
            type="button"
            disabled={isPending}
            onClick={handleClickEdit}
            className="flex-1 cursor-pointer py-3.5 bg-gray-100 active:bg-gray-200 text-gray-700 font-bold rounded-xl active:scale-95 transition-all"
          >
            Cancelar
          </button>
          <Button roleButton="bg-consumer" disabled={isPending} className="flex-1 py-3.5 shadow-md shadow-consumer/20">
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner className="size-5 border-t-transparent border-white" />
                Salvando...
              </span>
            ) : (
              'Salvar Alterações'
            )}
          </Button>
        </div>
      )}
    </form>
  );
};
