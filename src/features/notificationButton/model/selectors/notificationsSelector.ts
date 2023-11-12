import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const getNotificationsIsLoading = (state: StateSchema) =>
    state.notifications?.isLoading || false;
export const getNotificationsError = (state: StateSchema) =>
    state.notifications?.error;

export const [useNotificationItemById] = buildSelector(
    (state, id: string) => state.notifications?.entities[id],
);
