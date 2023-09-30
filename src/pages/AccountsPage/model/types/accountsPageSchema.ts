import { EntityState } from '@reduxjs/toolkit';
import {
    User,
    AccountView,
    AccountSortField,
    AccountType,
} from '@/entities/User';
import { SortOrder } from '@/shared/types/sort';

export interface AccountsPageSchema extends EntityState<User> {
    isLoading?: boolean;
    error?: string;

    // pagination
    page: number;
    limit: number;
    hasMore: boolean;
    // filters
    view: AccountView;
    order: SortOrder;
    sort: AccountSortField;
    search: string;
    type: AccountType;

    _inited: boolean;
}
