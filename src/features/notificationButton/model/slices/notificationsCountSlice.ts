import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { NotificationCountSchema } from '../types/NotificationCountSchema';
import { fetchNotificationsCount } from '@/features/notificationButton/model/services/fetchNotificationsCount/fetchNotificationsCount';

const initialState: NotificationCountSchema = {
    isLoading: false,
    error: undefined,
    count: 0,
};

export const notificationCountSlice = createSlice({
    name: 'notificationCountSlice',
    initialState,
    reducers: {
        setCount: (state, action: PayloadAction<NotificationCountSchema>) => {
            // state.count = action.payload.count;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotificationsCount.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchNotificationsCount.fulfilled, (state, action: PayloadAction<NotificationCountSchema> ) => {
                state.count = action.payload.count;
                state.isLoading = false;
            })
            .addCase(fetchNotificationsCount.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: notificationsCountActions } = notificationCountSlice;
export const { reducer: notificationsCountReducer } = notificationCountSlice;
