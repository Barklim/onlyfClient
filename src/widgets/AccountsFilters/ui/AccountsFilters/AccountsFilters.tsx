import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AccountsFilters.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { AccountSortSelector } from '@/features/AccountSortSelector';
import { AccountTypeTabs } from '@/features/AccountTypeTabs';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { AccountSortField, AccountType } from '@/entities/User';
import { SortOrder } from '@/shared/types/sort';
import { Input } from '@/shared/ui/redesigned/Input';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface AccountsFiltersProps {
    className?: string;
    sort: AccountSortField;
    order: SortOrder;
    type: AccountType;
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: AccountSortField) => void;
    onChangeType: (type: AccountType) => void;
}

export const AccountsFilters = memo((props: AccountsFiltersProps) => {
    const {
        className,
        onChangeType,
        onChangeSearch,
        search,
        onChangeSort,
        sort,
        onChangeOrder,
        order,
        type,
    } = props;
    const { t } = useTranslation();

    return (
        <Card
            className={classNames(cls.AccountsFilters, {}, [className])}
            padding="24"
        >
            <VStack gap="32">
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    size="s"
                    placeholder={t('Поиск')}
                    addonLeft={<Icon Svg={SearchIcon} />}
                />
                <AccountTypeTabs
                    value={type}
                    onChangeType={onChangeType}
                    className={cls.tabs}
                />
                <AccountSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
            </VStack>
        </Card>
    );
});
