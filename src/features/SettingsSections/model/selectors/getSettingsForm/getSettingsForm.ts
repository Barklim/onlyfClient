import { StateSchema } from '@/app/providers/StoreProvider';

export const getSettingsForm = (state: StateSchema) => {
    return {
        stopWords: state.settings?.stopWords.form?.stopWords,
        name: state.settings?.agencyName.form?.name
    }
};
export const getSettingsStopWordsForm = (state: StateSchema) => state.settings?.stopWords.form;
export const getSettingsAgencyNameForm = (state: StateSchema) => state.settings?.agencyName.form;
export const getStopWordsIsLoading = (state: StateSchema) => state.settings?.stopWords.isLoading;
export const getAgencyIsLoading = (state: StateSchema) => state.settings?.agencyName.isLoading;
export const getSettingsNotificationsLoading = (state: StateSchema) => state.settings?.notificationsLoaders;
