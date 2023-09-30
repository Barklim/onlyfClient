import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    getAccountsPageHasMore,
    getAccountsPageIsLoading,
    getAccountsPageNum,
} from '../../selectors/accountsPageSelectors';
import { accountsPageActions } from '../../slices/accountsPageSlice';
import { fetchAccountsList } from '../fetchAccountsList/fetchAccountsList';

export const fetchNextAccountsPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('accountsPage/fetchNextAccountsPage', async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const hasMore = getAccountsPageHasMore(getState());
    const page = getAccountsPageNum(getState());
    const isLoading = getAccountsPageIsLoading(getState());

    if (hasMore && !isLoading) {
        dispatch(accountsPageActions.setPage(page + 1));
        dispatch(fetchAccountsList({}));
    }
});
