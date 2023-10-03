import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserByIdData = (state: StateSchema) => state.userById?.data;
