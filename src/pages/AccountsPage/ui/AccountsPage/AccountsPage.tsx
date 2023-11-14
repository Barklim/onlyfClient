import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page';
import { AccountInfiniteList } from '../AccountInfiniteList/AccountInfiniteList';
import { AccountsPageFilters } from '../AccountsPageFilters/AccountsPageFilters';
import { fetchNextAccountsPage } from '../../model/services/fetchNextAccountsPage/fetchNextAccountsPage';
import { initAccountsPage } from '../../model/services/initAccountsPage/initAccountsPage';
import cls from './AccountsPage.module.scss';
import { AccountPageGreeting } from '@/features/accountPageGreeting';
import { accountsPageReducer } from '../../model/slices/accountsPageSlice';

interface AccountsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    accountsPage: accountsPageReducer,
};

const AccountsPage = (props: AccountsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextAccountsPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initAccountsPage(searchParams));
    });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <Page
                data-testid="AccountsPage"
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.AccountsPage, {}, [className])}
            >
                <AccountsPageFilters />
                <AccountInfiniteList className={cls.list} />
                <AccountPageGreeting />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(AccountsPage);
