import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '@/entities/User';

export const fetchUserData = createAsyncThunk<
    User,
    string,
    ThunkConfig<string>
    >('user/fetchUserData', async (userId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<User>(`/users/${userId}`);

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
