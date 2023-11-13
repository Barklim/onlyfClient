import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { isJsonModeServer } from '@/shared/const/global';

interface RegisterByUsernameProps {
    email: string;
    password: string;
    agencyName?: string;
}

export const registerByUsername = createAsyncThunk<
    User,
    RegisterByUsernameProps,
    ThunkConfig<string>
    >('register/registerByUsername', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const url = isJsonModeServer ? '/register' : '/authentication/sign-up';
        const response = await extra.api.post<User>(url, authData);
        if (!response.data) {
            throw new Error();
        }

        dispatch(userActions.setAuthData(response.data));
        return response.data;
    } catch (e) {
        console.log(e);

        // @ts-ignore
        const message = e.response.data.message
        if (typeof message === 'string') {
            return rejectWithValue(message);
        } else {
            const resultString = message.join(', ');
            return rejectWithValue(resultString);
        }
    }
});
