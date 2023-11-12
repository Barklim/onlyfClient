import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import {
    Notification,
} from '@/entities/Notification';
import { NotificationSchema } from '../types/NotificationSchema';
import { fetchNotificationsList } from '../services/fetchNotificationsList/fetchNotificationsList';

const notificationsAdapter = createEntityAdapter<Notification>({
    selectId: (notification) => notification.id,
});

export const getNotifications = notificationsAdapter.getSelectors<StateSchema>(
    (state) => state.notifications || notificationsAdapter.getInitialState(),
);

const notificationsSlice = createSlice({
    name: 'notificationsSlice',
    initialState: notificationsAdapter.getInitialState<NotificationSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {}
    }),
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            // state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotificationsList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    notificationsAdapter.removeAll(state);
                }
            })
            .addCase(fetchNotificationsList.fulfilled, (state, action) => {
                state.isLoading = false;

                if (action.meta.arg.replace) {
                    notificationsAdapter.setAll(state, action.payload);
                } else {
                    notificationsAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchNotificationsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: notificationsReducer, actions: notificationsActions } =
    notificationsSlice;
