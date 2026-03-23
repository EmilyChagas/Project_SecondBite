import { redirect } from 'react-router';
import { queryClient } from '../../libs/tanstackQuery';
import { CustomError } from '../CustomError';
import { getCheckAuth } from '../../services/auth';

export const createAuthLoader = (allowedRoles?: string[]) => async () => {
  try {
    const data = await queryClient.fetchQuery({
      queryKey: ['userAuth'],
      queryFn: () => getCheckAuth(allowedRoles),
    });

    if (!data?.isAllowed) return redirect('/login');

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    return redirect('/login');
  }
};

export const loggedLoader = async () => {
  try {
    const data = await queryClient.fetchQuery({
      queryKey: ['userAuth'],
      queryFn: () => getCheckAuth(),
    });

    if (data?.user.roles[0] === 'CONSUMER') return redirect('/');
    if (data?.user.roles[0] === 'MARKETER') return redirect('/feirante');

    return;
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      if (error.status === 401) return;
      throw error;
    }
  }
};
