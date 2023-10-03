import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import {
    User,
    AccountType,
    AccountView,
    AccountSortField,
} from '@/entities/User';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { SortOrder } from '@/shared/types/sort';
import { AccountsPageSchema } from '../types/accountsPageSchema';
import { fetchAccountsList } from '../services/fetchAccountsList/fetchAccountsList';

const accountsAdapter = createEntityAdapter<User>({
    selectId: (account) => account.id,
});

export const getAccounts = accountsAdapter.getSelectors<StateSchema>(
    (state) => state.accountsPage || accountsAdapter.getInitialState(),
);

const accountsPageSlice = createSlice({
    name: 'accountsPageSlice',
    initialState: accountsAdapter.getInitialState<AccountsPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: AccountView.SMALL,
        page: 1,
        hasMore: true,
        _inited: false,
        limit: 9,
        sort: AccountSortField.ONLINE,
        search: '',
        order: 'asc',
        type: AccountType.ALL,
    }),
    reducers: {
        setView: (state, action: PayloadAction<AccountView>) => {
            state.view = action.payload;
            localStorage.setItem(
                ARTICLES_VIEW_LOCALSTORAGE_KEY,
                action.payload,
            );
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<AccountSortField>) => {
            state.sort = action.payload;
        },
        setType: (state, action: PayloadAction<AccountType>) => {
            state.type = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        initState: (state) => {
            const view = localStorage.getItem(
                ARTICLES_VIEW_LOCALSTORAGE_KEY,
            ) as AccountView;
            state.view = view;
            state.limit = view === AccountView.BIG ? 6 : 21;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccountsList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    accountsAdapter.removeAll(state);
                }
            })
            .addCase(fetchAccountsList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    accountsAdapter.setAll(state, action.payload);
                } else {
                    accountsAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchAccountsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: accountsPageReducer, actions: accountsPageActions } =
    accountsPageSlice;
