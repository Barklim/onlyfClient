import { StateSchema } from '@/app/providers/StoreProvider';

export const getRegisterAgencyName = (state: StateSchema) =>
    state?.registerForm?.agencyName || '';