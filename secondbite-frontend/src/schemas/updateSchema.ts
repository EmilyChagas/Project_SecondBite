import z from 'zod';

export const UpdateConsumerSchema = z.object({
  name: z.string().min(4, 'Nome precisa ter pelo menos 4 caracteres'),
  email: z.string().email('E-mail inválido'),
  cpf: z.string({ coerce: true }),
  phone: z.string({ coerce: true }).min(8, 'Telefone/celular tem que ter pelo menos 8 digitos'),
  password: z.string().min(6, 'Senha precisa ter pelo menos 6 dígitos').max(40, 'Senha muito longa').optional(),
  address: z.string().optional(),
});

export type UpdateConsumerType = z.infer<typeof UpdateConsumerSchema>;

export const UpdateMarketerSchema = z.object({
  name: z.string().min(4, 'Nome precisa ter pelo menos 4 caracteres'),
  email: z.string().email('E-mail inválido'),
  cnpj: z.string().min(11, 'CPF/CNPJ inválido'),
  phone: z.string().optional(),
  address: z.string().optional(),
  stallName: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  operatingSchedule: z.string().max(100, 'Texto muito longo').optional(),
});

export type UpdateMarketerType = z.infer<typeof UpdateMarketerSchema>;
