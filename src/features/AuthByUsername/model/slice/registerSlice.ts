import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerByUsername } from '../services/registerByUsername/registerByUsername';
import { RegisterSchema } from '@/features/AuthByUsername/model/types/registerSchema';

const initialState: RegisterSchema = {
    isLoading: false,
    email: '',
    password: '',
    agencyName: ''
};

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setAgencyName: (state, action: PayloadAction<string>) => {
            state.agencyName = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerByUsername.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(registerByUsername.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registerByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { actions: registerActions } = registerSlice;
export const { reducer: registerReducer } = registerSlice;
