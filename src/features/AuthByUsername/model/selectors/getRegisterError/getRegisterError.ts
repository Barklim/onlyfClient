import { StateSchema } from '@/app/providers/StoreProvider';

export const getRegisterError = (state: StateSchema) => state?.registerForm?.error;