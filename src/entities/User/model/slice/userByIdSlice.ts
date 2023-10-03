import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/entities/User';
import { fetchUserData } from '../services/fetchUserData';
import { UserByIdSchema } from '../types/user';

const initialState: UserByIdSchema = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const userByIdSlice = createSlice({
    name: 'userById',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchUserData.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});

// Action creators are generated for each case reducer function
export const { actions: userByIdActions } = userByIdSlice;
export const { reducer: userByIdReducer } = userByIdSlice;
