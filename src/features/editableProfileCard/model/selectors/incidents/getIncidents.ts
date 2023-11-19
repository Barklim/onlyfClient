import { StateSchema } from '@/app/providers/StoreProvider';

export const getIncidentData = (state: StateSchema) =>
    state.incidents?.data;
