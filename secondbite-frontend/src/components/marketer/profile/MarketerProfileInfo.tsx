import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Marketer } from '../../../interfaces/auth';
import { UpdateMarketerSchema, type UpdateMarketerType } from '../../../schemas/updateSchema';
import { useUpdateMarketer } from '../../../hooks/mutations/useUpdateMarketer';
import { Input } from '../../ui/Input';
import { InvalidInput } from '../../ui/InvalidInput';
import { Button } from '../../ui/Button';
import { Spinner } from '../../ui/Spinner';
import { PincelIcon } from '../../icons/PincelIcon';

export const MarketerProfileInfo = ({
  id,
  name,
  email,
  phone,
  cnpj,
  address,
  stallName,
  operatingSchedule,
}: Marketer) => {
  const [isEditing, setIsEditing] = useState(false);
  const { mutate, isPending } = useUpdateMarketer();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateMarketerType>({
    resolver: zodResolver(UpdateMarketerSchema),
    defaultValues: {
      name,
      email,
      cnpj,
      phone: phone || '',
      address: address || '',
      stallName: stallName || '',
      operatingSchedule: operatingSchedule || '',
    },
  });

  function handleClickEdit() {
    if (isEditing) reset();
    setIsEditing(prevState => !prevState);
  }

  const onSubmit: SubmitHandler<UpdateMarketerType> = data => {
    mutate({ marketerData: data, id }, { onSuccess: () => setIsEditing(false) });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mx-auto max-w-lg transition-all"
    >
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-50">
        <h3 className="font-bold text-gray-800 text-lg">Dados da Banca</h3>
        {!isEditing && (
          <button
            onClick={handleClickEdit}
            type="button"
            className="flex cursor-pointer items-center gap-1.5 text-marketer text-sm font-bold bg-marketer/10 border border-marketer/20 px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
          >
            <PincelIcon className="size-4" />
            Editar
          </button>
        )}
      </div>
      <div className="space-y-4">
        <div className="grid gap-1">
          <Input
            id="stallName"
            label="Nome da Banca (Opcional)"
            type="text"
            disabled={!isEditing}
            isInValid={!!errors.stallName}
            {...register('stallName')}
            placeholder="Ex: Barraca do Zé"
            className={isEditing ? 'border-marketer ring-1 ring-marketer/20' : ''}
          />
          {errors.stallName && <InvalidInput text={errors.stallName.message!} />}
        </div>
        <div className="grid gap-1">
          <Input
            id="operatingSchedule"
            label="Horário de Funcionamento (Opcional)"
            type="text"
            disabled={!isEditing}
            isInValid={!!errors.operatingSchedule}
            {...register('operatingSchedule')}
            placeholder="Ex: Seg a Sex, das 07h às 14h"
          />
          {errors.operatingSchedule && <InvalidInput text={errors.operatingSchedule.message!} />}
        </div>
        <div className="pt-2 pb-1 border-b border-gray-50">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dados do Responsável</h4>
        </div>
        <div className="grid gap-1">
          <Input
            id="name"
            label="Nome do Responsável"
            type="text"
            disabled={!isEditing}
            isInValid={!!errors.name}
            {...register('name')}
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
            className="bg-gray-50 text-gray-500"
            isInValid={!!errors.email}
            {...register('email')}
          />
          {errors.email && <InvalidInput text={errors.email.message!} />}
        </div>
        <div className="grid gap-1">
          <Input
            id="cnpj"
            label="CNPJ / CPF"
            disabled={!isEditing}
            type="text"
            isInValid={!!errors.cnpj}
            {...register('cnpj')}
          />
          {errors.cnpj && <InvalidInput text={errors.cnpj.message!} />}
        </div>
        <div className="grid gap-1">
          <Input
            id="telefone"
            label="Celular (Contato)"
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
            label="Endereço Comercial"
            disabled={!isEditing}
            type="text"
            isInValid={!!errors.address}
            {...register('address')}
            placeholder="Nome da rua e bairro"
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
          <Button roleButton="bg-marketer" disabled={isPending} className="flex-1 py-3.5 shadow-md">
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner className="size-5 border-t-transparent border-white" />
                Salvando...
              </span>
            ) : (
              'Salvar'
            )}
          </Button>
        </div>
      )}
    </form>
  );
};
