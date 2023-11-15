import { StateSchema } from '@/app/providers/StoreProvider';

export const getSettingsForm = (state: StateSchema) => state.settings?.form;
export const getSettingsAgencyIsLoading = (state: StateSchema) => state.settings?.isLoading;
