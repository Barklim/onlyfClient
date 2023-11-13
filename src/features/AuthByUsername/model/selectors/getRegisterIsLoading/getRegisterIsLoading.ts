import { StateSchema } from '@/app/providers/StoreProvider';

export const getRegisterIsLoading = (state: StateSchema) =>
    state?.registerForm?.isLoading || false;