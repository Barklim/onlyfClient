import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '@/entities/User';

export const fetchInviteCancel = createAsyncThunk<
    User,
    string,
    ThunkConfig<string>
    >('user/fetchInviteCancel', async (userId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const url = `/agency/${userId}`;
        const response = await extra.api.delete<User>(url);
        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
