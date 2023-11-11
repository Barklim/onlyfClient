import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const getNotificationCount = (state: StateSchema) =>
    state.notificationsCount?.count ?? 0;
export const getNotificationCountError = (state: StateSchema) =>
    state.notificationsCount?.error;

export const [useNotificationItemById] = buildSelector(
    (state, id: string) => state.notifications?.entities[id],
);

