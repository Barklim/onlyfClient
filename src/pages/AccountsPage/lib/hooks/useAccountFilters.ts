import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
    getAccountsPageOrder,
    getAccountsPageSearch,
    getAccountsPageSort,
    getAccountsPageType,
    getAccountsPageView,
} from '../../model/selectors/accountsPageSelectors';
import { AccountSortField, AccountType, AccountView } from '@/entities/User';
import { accountsPageActions } from '../../model/slices/accountsPageSlice';
import { SortOrder } from '@/shared/types/sort';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchAccountsList } from '../../model/services/fetchAccountsList/fetchAccountsList';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';

export function useAccountFilters() {
    const view = useSelector(getAccountsPageView);
    const sort = useSelector(getAccountsPageSort);
    const order = useSelector(getAccountsPageOrder);
    const search = useSelector(getAccountsPageSearch);
    const type = useSelector(getAccountsPageType);

    const dispatch = useAppDispatch();

    const fetchData = useCallback(() => {
        dispatch(fetchAccountsList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
        (view: AccountView) => {
            dispatch(accountsPageActions.setView(view));
        },
        [dispatch],
    );

    const onChangeSort = useCallback(
        (newSort: AccountSortField) => {
            dispatch(accountsPageActions.setSort(newSort));
            dispatch(accountsPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeOrder = useCallback(
        (newOrder: SortOrder) => {
            dispatch(accountsPageActions.setOrder(newOrder));
            dispatch(accountsPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(accountsPageActions.setSearch(search));
            dispatch(accountsPageActions.setPage(1));
            debouncedFetchData();
        },
        [dispatch, debouncedFetchData],
    );

    const onChangeType = useCallback(
        (value: AccountType) => {
            dispatch(accountsPageActions.setType(value));
            dispatch(accountsPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    return {
        view,
        sort,
        order,
        search,
        type,
        onChangeView,
        onChangeSort,
        onChangeOrder,
        onChangeSearch,
        onChangeType,
    };
}
