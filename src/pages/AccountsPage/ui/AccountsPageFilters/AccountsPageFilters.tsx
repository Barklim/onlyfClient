import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input as InputMui } from '@/shared/ui/material/Input';
import cls from './AccountsPageFilters.module.scss';

import { AccountSortSelector } from '@/features/AccountSortSelector';
import { AccountViewSelector } from '@/features/AccountViewSelector';
import { AccountTypeTabs } from '@/features/AccountTypeTabs';
import { useAccountFilters } from '../../lib/hooks/useAccountFilters';
import { ButtonModal } from '@/shared/ui/material/ButtonModal';
import { HelpOutline } from '@mui/icons-material';

interface AccountsPageFiltersProps {
    className?: string;
}

export const AccountsPageFilters = memo((props: AccountsPageFiltersProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const {
        onChangeSort,
        onChangeType,
        sort,
        type,
        onChangeSearch,
        search,
        onChangeView,
        view,
        onChangeOrder,
        order,
    } = useAccountFilters();

    return (
        <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
            <div className={cls.headerWrapper}>
                <div className={cls.sortWrapper}>
                    <AccountSortSelector
                        order={order}
                        sort={sort}
                        onChangeOrder={onChangeOrder}
                        onChangeSort={onChangeSort}
                    />
                    <AccountViewSelector view={view} onViewClick={onChangeView} />
                </div>
            </div>
            <InputMui
                className={cls.input}
                onChange={onChangeSearch}
                value={search}
                placeholder={t('Поиск')}
                fullWidth
                variant={'filled'}
                size={'medium'}
            />
            <div className={cls.tabsWrapper}>
                <AccountTypeTabs
                    value={type}
                    onChangeType={onChangeType}
                    className={cls.tabs}
                />
                <ButtonModal>
                    <HelpOutline color='primary' className={cls.buttonModal}/>
                </ButtonModal>
            </div>
        </div>
    );
});
