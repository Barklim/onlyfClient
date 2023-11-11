import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { NotificationCountSchema } from '@/features/notificationButton/model/types/NotificationCountSchema';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

interface FetchAccountsListProps {
    id: string;
}

export const fetchNotificationsCount = createAsyncThunk<
    NotificationCountSchema,
    FetchAccountsListProps,
    ThunkConfig<string>
>('notifications/count', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    try {
        const response = await extra.api.get<NotificationCountSchema>('/notification/count', {});

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});