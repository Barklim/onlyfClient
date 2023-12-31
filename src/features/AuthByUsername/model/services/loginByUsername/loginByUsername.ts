import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { isJsonModeServer } from '@/shared/const/global';

interface LoginByUsernameProps {
    email: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>('login/loginByUsername', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const url = isJsonModeServer ? '/login' : '/authentication/sign-in';
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
