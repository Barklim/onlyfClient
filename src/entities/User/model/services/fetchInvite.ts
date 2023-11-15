import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, UserRole } from '@/entities/User';

interface InviteProps {
    id: string,
    role: UserRole
}

export const fetchInvite = createAsyncThunk<
    User,
    InviteProps,
    ThunkConfig<string>
    >('user/fetchInvite', async (inviteObj, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const url = '/agency/invite';
        const response = await extra.api.post<User>(url, inviteObj);
        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
