import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsSchema, SettingsSection, SettingsStopWords } from '../types/settingsSchema';
import { fetchSettingsAgency } from '@/features/SettingsSections/model/services/fetchSettingsAgency/fetchSettingsAgency';
import { fetchAgencyData } from '@/features/SettingsSections/model/services/fetchAgency/fetchAgencyData';

const initialState: SettingsSchema = {
    stopWords: {
        isLoading: false,
        error: '',
        data: { stopWords: '' },
        form: { stopWords: '' },
    },
    agencyName: {
        isLoading: false,
        error: '',
        data: { name: '' },
        form: { name: '' },
    }
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        updateProfile: (state, action: PayloadAction<SettingsStopWords>) => {
            // state.form = {
            //     ...state.form,
            //     ...action.payload,
            // };
        },
        updateStopWords: (state, action: PayloadAction<SettingsStopWords>) => {
            state.stopWords.form = {
                ...state.stopWords.form,
                ...action.payload,
            };
        },
        updateAgencyName: (state, action: PayloadAction<SettingsStopWords>) => {
            state.agencyName.form = {
                ...state.agencyName.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAgencyData.pending, (state, action) => {
                state.stopWords.isLoading = true;
                state.stopWords.error = '';
                state.agencyName.isLoading = true;
                state.agencyName.error = '';
            })
            .addCase(fetchAgencyData.fulfilled, (state, action) => {
                state.stopWords.isLoading = false;
                state.agencyName.isLoading = false;

                if (action.payload) {
                    state.stopWords.data = {
                        ...state.stopWords.data,
                        stopWords: action.payload.stopWords,
                    };

                    state.agencyName.data = {
                        ...state.agencyName.data,
                        name: action.payload.name,
                    };

                    state.stopWords.form = {
                        ...state.stopWords.form,
                        stopWords: action.payload.stopWords,
                    };

                    state.agencyName.form = {
                        ...state.agencyName.form,
                        name: action.payload.name,
                    };
                }
            })
            .addCase(fetchAgencyData.rejected, (state, action) => {
                state.stopWords.isLoading = false;
                state.stopWords.error = action.payload as string;
                state.agencyName.isLoading = false;
                state.agencyName.error = action.payload as string;
            })

            .addCase(fetchSettingsAgency.pending, (state, action) => {
                const settingsSection = action.meta.arg;

                if (settingsSection === SettingsSection.STOPWORDS ) {
                    state.stopWords.isLoading = true;
                    state.stopWords.error = '';
                }
                if (settingsSection === SettingsSection.AGENCYNAME ) {
                    state.agencyName.isLoading = true;
                    state.agencyName.error = '';
                }
            })
            .addCase(fetchSettingsAgency.fulfilled, (state, action) => {
                // @ts-ignore
                const settingsSection = action.payload.settingsSection;

                if (settingsSection === SettingsSection.STOPWORDS ) {
                    state.stopWords.isLoading = false;
                }
                if (settingsSection === SettingsSection.AGENCYNAME ) {
                    state.agencyName.isLoading = false;
                }

                if (action.payload) {
                    // @ts-ignore
                    state.stopWords.data.stopWords = action.payload.stopWords;
                    // @ts-ignore
                    state.agencyName.data.name = action.payload.name;
                }
            })
            .addCase(fetchSettingsAgency.rejected, (state, action) => {
                const settingsSection = action.meta.arg;

                if (settingsSection === SettingsSection.STOPWORDS ) {
                    state.stopWords.isLoading = false;
                    state.stopWords.error = action.payload as string;
                }
                if (settingsSection === SettingsSection.AGENCYNAME ) {
                    state.agencyName.isLoading = false;
                    state.agencyName.error = action.payload as string;
                }
            });
    },
});

export const { actions: settingsActions } = settingsSlice;
export const { reducer: settingsReducer } = settingsSlice;
