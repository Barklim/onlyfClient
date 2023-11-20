import { StateSchema } from '@/app/providers/StoreProvider';

export const getIncidentData = (state: StateSchema) =>
    state.incidents?.data;

export const getIncidentStopData = (state: StateSchema) =>
    state.incidentsStopWords?.data;
