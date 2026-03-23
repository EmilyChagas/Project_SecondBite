import { z } from 'zod';

const BaseRegisterSchema = z.object({
  name: z.string().min(4, 'Nome precisa ter pelo menos 4 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha precisa ter pelo menos 6 dígitos').max(40, 'Senha muito longa'),
  confirmPassword: z.string().min(6, 'Senha precisa ter pelo menos 6 dígitos').max(40, 'Senha muito longa'),
});

export const ConsumerRegisterSchema = BaseRegisterSchema.extend({
  cpf: z.string().min(11, 'CPF inválido'),
  phone: z.string().min(8, 'O telefone deve ter pelo menos 8 dígitos.'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

export const MarketerRegisterSchema = BaseRegisterSchema.extend({
  cnpj: z.string().min(11, 'CPF/CNPJ inválido'),
  stallName: z.string().optional(),
  latitude: z.number().refine(val => val !== 0, 'A localização no mapa é obrigatória'),
  longitude: z.number().refine(val => val !== 0, 'A localização no mapa é obrigatória'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

export type ConsumerRegisterType = z.infer<typeof ConsumerRegisterSchema>;
export type MarketerRegisterType = z.infer<typeof MarketerRegisterSchema>;
