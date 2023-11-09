import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { AccountType } from '@/entities/User';
import { ToggleFeatures } from '@/shared/lib/features';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

interface AccountTypeTabsProps {
    className?: string;
    value: AccountType;
    onChangeType: (type: AccountType) => void;
}

export const AccountTypeTabs = memo((props: AccountTypeTabsProps) => {
    const { className, value, onChangeType } = props;
    const { t } = useTranslation();

    const typeTabs = useMemo<TabItem[]>(
        () => [
            {
                value: AccountType.ALL,
                content: t('Все пользователи'),
            },
            {
                value: AccountType.MODEL,
                content: t('Модели'),
            },
            {
                value: AccountType.MANAGER,
                content: t('Мэнеджеры'),
            },
            {
                value: AccountType.ADMIN,
                content: t('Админы'),
            },
        ],
        [t],
    );

    const onTabClick = useCallback(
        (tab: TabItem) => {
            onChangeType(tab.value as AccountType);
        },
        [onChangeType],
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Tabs
                    direction="column"
                    tabs={typeTabs}
                    value={value}
                    onTabClick={onTabClick}
                    className={classNames('', {}, [className])}
                />
            }
            off={
                <TabsDeprecated
                    tabs={typeTabs}
                    value={value}
                    onTabClick={onTabClick}
                    className={classNames('', {}, [className])}
                />
            }
        />
    );
});
