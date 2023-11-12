import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { fetchNotificationsList } from '@/features/notificationButton/model/services/fetchNotificationsList/fetchNotificationsList';

interface FetchNotificationsProps {
    id: string;
    replace?: boolean;
}

export const fetchNotifications = createAsyncThunk<
    void,
    FetchNotificationsProps,
    ThunkConfig<string>
>('notifications/fetchNotifications', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi;

    dispatch(fetchNotificationsList({id: ''}));
});