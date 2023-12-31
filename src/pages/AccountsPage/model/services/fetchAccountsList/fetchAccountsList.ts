import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, AccountType } from '@/entities/User';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import {
    getAccountsPageLimit,
    getAccountsPageNum,
    getAccountsPageOrder,
    getAccountsPageSearch,
    getAccountsPageSort,
    getAccountsPageType,
} from '../../selectors/accountsPageSelectors';

interface FetchAccountsListProps {
    replace?: boolean;
}

export const fetchAccountsList = createAsyncThunk<
    User[],
    FetchAccountsListProps,
    ThunkConfig<string>
>('accountsPage/fetchAccountsList', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const limit = getAccountsPageLimit(getState());
    const sort = getAccountsPageSort(getState());
    const order = getAccountsPageOrder(getState());
    const search = getAccountsPageSearch(getState());
    const page = getAccountsPageNum(getState());
    const type = getAccountsPageType(getState());

    try {
        addQueryParams({
            sort,
            order,
            search,
            type,
        });
        const response = await extra.api.get<User[]>('/users', {
            params: {
                _expand: 'profile',
                _limit: limit,
                _page: page,
                _sort: sort,
                _order: order,
                q: search,
                roles: type === AccountType.ALL ? undefined : type.toLowerCase(),
            },
        });

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
