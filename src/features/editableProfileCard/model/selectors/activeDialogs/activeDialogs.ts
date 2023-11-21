import { StateSchema } from '@/app/providers/StoreProvider';

export const getActiveDialogsData = (state: StateSchema) =>
    state.activeDialogs?.data;
