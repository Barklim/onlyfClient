import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AccountSortField, AccountType } from '@/entities/User';
import { SortOrder } from '@/shared/types/sort';
import { getAccountsPageInited } from '../../selectors/accountsPageSelectors';
import { accountsPageActions } from '../../slices/accountsPageSlice';
import { fetchAccountsList } from '../fetchAccountsList/fetchArticlesList';

export const initAccountsPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('accountsPage/initAccountsPage', async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const inited = getAccountsPageInited(getState());

    if (!inited) {
        const orderFromUrl = searchParams.get('order') as SortOrder;
        const sortFromUrl = searchParams.get('sort') as AccountSortField;
        const searchFromUrl = searchParams.get('search');
        const typeFromUrl = searchParams.get('type') as AccountType;

        if (orderFromUrl) {
            dispatch(accountsPageActions.setOrder(orderFromUrl));
        }
        if (sortFromUrl) {
            dispatch(accountsPageActions.setSort(sortFromUrl));
        }
        if (searchFromUrl) {
            dispatch(accountsPageActions.setSearch(searchFromUrl));
        }
        if (typeFromUrl) {
            dispatch(accountsPageActions.setType(typeFromUrl));
        }

        dispatch(accountsPageActions.initState());
        dispatch(fetchAccountsList({}));
    }
});
