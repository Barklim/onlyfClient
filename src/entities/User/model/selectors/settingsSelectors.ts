import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserSettings = (state: StateSchema) => state.user.authData?.settings;