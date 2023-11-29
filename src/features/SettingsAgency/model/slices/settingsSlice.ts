import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsSchema, SettingsStopWords } from '../types/settingsSchema';
import { fetchSettingsAgency } from '@/features/SettingsAgency/model/services/fetchSettingsAgency/fetchSettingsAgency';
import { Profile } from '@/entities/Profile';
import { fetchAgencyData } from '@/features/SettingsAgency/model/services/fetchAgency/fetchAgencyData';

const initialState: SettingsSchema = {
    isLoading: false,
    error: '',
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        updateProfile: (state, action: PayloadAction<SettingsStopWords>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAgencyData.pending, (state, action) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(fetchAgencyData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
            })
            .addCase(fetchAgencyData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchSettingsAgency.pending, (state, action) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(fetchSettingsAgency.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
            })
            .addCase(fetchSettingsAgency.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { actions: settingsActions } = settingsSlice;
export const { reducer: settingsReducer } = settingsSlice;
