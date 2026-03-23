// 1. Expandindo as Roles
export enum UserRole {
  CONSUMER = 'CONSUMER',
  MARKETER = 'MARKETER',
}

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  roles: string[];
  createdAt: string;
  modifiedAt: string;
}

export interface Consumer extends BaseUser {
  cpf: string;
}

export interface Marketer extends BaseUser {
  cnpj: string;
  latitude?: number;
  longitude?: number;
  stallName?: string;
  operatingSchedule?: string;
}

export interface AuthResponse<T = Consumer | Marketer> {
  user: T;
  token: string;
}

export interface BodyLogin {
  email: string;
  password: string;
}

export interface UpdateConsumer {
  name?: string;
  email?: string;
  cpf?: string;
  address?: string;
  phone?: string;
}

export interface RegisterBody {
  name: string;
  email: string;
  cpf?: string;
  cnpj?: string;
  password: string;
  role: 'consumer' | 'marketer';
}
