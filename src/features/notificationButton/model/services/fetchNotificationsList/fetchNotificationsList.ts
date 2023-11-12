import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Notification } from '@/entities/Notification'
import { isJsonModeServer } from '@/shared/const/global';

interface FetchNotificationsListProps {
    id: string;
    replace?: boolean;
}

export const fetchNotificationsList = createAsyncThunk<
    Notification[],
    FetchNotificationsListProps,
    ThunkConfig<string>
>('notifications/fetchNotificationsList', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    try {
        const url = isJsonModeServer ? '/notifications' : '/notification';
        const response = await extra.api.get<Notification[]>(url, {});

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});