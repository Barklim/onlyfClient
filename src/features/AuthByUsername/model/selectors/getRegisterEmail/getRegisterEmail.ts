import { StateSchema } from '@/app/providers/StoreProvider';

export const getRegisterEmail = (state: StateSchema) =>
    state?.registerForm?.email || '';
