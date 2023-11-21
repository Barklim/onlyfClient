import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    ActiveDialog,
    ActiveDialogsSchema,
} from '@/features/editableProfileCard/model/types/incidentsSchema';
import { fetchActiveDialogsData } from '@/features/editableProfileCard/model/services/fetchActiveDialogs/fetchActiveDialogs';

const initialState: ActiveDialogsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const activeDialogsSlice = createSlice({
    name: 'activeDialogs',
    initialState,
    reducers: {
        updateActiveDialog: (state, action: PayloadAction<ActiveDialog>) => {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchActiveDialogsData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchActiveDialogsData.fulfilled,
                (state, action: PayloadAction<ActiveDialog[]>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(fetchActiveDialogsData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});

export const { actions: activeDialogsActions } = activeDialogsSlice;
export const { reducer: activeDialogsReducer } = activeDialogsSlice;
