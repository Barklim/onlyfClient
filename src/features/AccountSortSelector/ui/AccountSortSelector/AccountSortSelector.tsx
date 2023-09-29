import { useTranslation } from 'react-i18next';
import React, { memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select';
import { Select as SelectMui } from '@/shared/ui/material/Select';
import { SortOrder } from '@/shared/types/sort';
import cls from './AccountSortSelector.module.scss';
import { ArticleSortField } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Typography } from '@/shared/ui/material/Typography';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

export const AccountSortSelector = memo((props: ArticleSortSelectorProps) => {
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

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
        () => [
            {
                value: ArticleSortField.CREATED,
                // content: t('дате создания'),
                content: t('диалогам'),
            },
            {
                value: ArticleSortField.TITLE,
                // content: t('названию'),
                content: t('имени'),
            },
            {
                value: ArticleSortField.VIEWS,
                // content: t('просмотрам'),
                content: t('активности'),
            },
        ],
        [t],
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <div
                    className={classNames(
                        cls.ArticleSortSelectorRedesigned,
                        {},
                        [className],
                    )}
                >
                    <VStack gap="8">
                        <Typography variant="h5" color='primary'>{t('Сортировать по:')}</Typography>
                        <ListBox
                            items={sortFieldOptions}
                            value={sort}
                            onChange={onChangeSort}
                        />
                        <ListBox
                            items={orderOptions}
                            value={order}
                            onChange={onChangeOrder}
                        />
                    </VStack>
                </div>
            }
            off={
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
            }
        />
    );
});
