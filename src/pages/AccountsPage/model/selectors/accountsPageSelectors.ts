import { StateSchema } from '@/app/providers/StoreProvider';
import { AccountSortField, AccountType, AccountView } from '@/entities/User';
import { buildSelector } from '@/shared/lib/store';

export const getAccountsPageIsLoading = (state: StateSchema) =>
    state.accountsPage?.isLoading || false;
export const getAccountsPageError = (state: StateSchema) =>
    state.accountsPage?.error;
export const getAccountsPageView = (state: StateSchema) =>
    state.accountsPage?.view || AccountView.SMALL;
export const getAccountsPageNum = (state: StateSchema) =>
    state.accountsPage?.page || 1;
export const getAccountsPageLimit = (state: StateSchema) =>
    state.accountsPage?.limit || 9;
export const getAccountsPageHasMore = (state: StateSchema) =>
    state.accountsPage?.hasMore;
export const getAccountsPageInited = (state: StateSchema) =>
    state.accountsPage?._inited;
export const getAccountsPageOrder = (state: StateSchema) =>
    state.accountsPage?.order ?? 'asc';
export const getAccountsPageSort = (state: StateSchema) =>
    state.accountsPage?.sort ?? AccountSortField.CREATED;
export const getAccountsPageSearch = (state: StateSchema) =>
    state.accountsPage?.search ?? '';
export const getAccountsPageType = (state: StateSchema) =>
    state.accountsPage?.type ?? AccountType.ALL;

export const [useAccountItemById] = buildSelector(
    (state, id: string) => state.accountsPage?.entities[id],
);
