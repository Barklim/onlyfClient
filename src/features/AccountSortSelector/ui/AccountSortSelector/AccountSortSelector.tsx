import { useTranslation } from 'react-i18next';
import React, { memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SelectOption } from '@/shared/ui/deprecated/Select';
import { Select as SelectMui } from '@/shared/ui/material/Select';
import { SortOrder } from '@/shared/types/sort';
import cls from './AccountSortSelector.module.scss';
import { AccountSortField } from '@/entities/User';
import { Typography } from '@/shared/ui/material/Typography';

interface AccountSortSelectorProps {
    className?: string;
    sort: AccountSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: AccountSortField) => void;
}

export const AccountSortSelector = memo((props: AccountSortSelectorProps) => {
    const { className, onChangeOrder, onChangeSort, order, sort } = props;
    const { t } = useTranslation();

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
        () => [
            {
                value: 'asc',
                content: t('возрастанию'),
            },
            {
                value: 'desc',
                content: t('убыванию'),
            },
        ],
        [t],
    );

    const sortFieldOptions = useMemo<SelectOption<AccountSortField>[]>(
        () => [
            {
                value: AccountSortField.CREATED,
                content: t('дате создания'),
            },
            {
                value: AccountSortField.TITLE,
                content: t('названию'),
            },
            {
                value: AccountSortField.VIEWS,
                content: t('просмотрам'),
            },
        ],
        [t],
    );

    return (
        <div
            className={classNames(cls.AccountSortSelector, {}, [
                className,
            ])}
        >
            <Typography variant="subtitle1" color='primary' noWrap>{t('Сортировать по:')}</Typography>
            <SelectMui
                options={sortFieldOptions}
                value={sort}
                onChange={onChangeSort}
                className={cls.order}
            />
            <SelectMui
                options={orderOptions}
                value={order}
                onChange={onChangeOrder}
                className={cls.order}
            />
        </div>
    );
});
