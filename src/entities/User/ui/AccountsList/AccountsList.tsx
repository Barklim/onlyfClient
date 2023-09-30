import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { AccountView } from '../../model/consts/userConsts';
// import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
// import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './AccountsList.module.scss';
import { User } from '../../model/types/user';

interface AccountListProps {
    className?: string;
    accounts: User[];
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    view?: AccountView;
}

const getSkeletons = (view: AccountView) =>
    new Array(view === AccountView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            // <ArticleListItemSkeleton
            //     className={cls.card}
            //     key={index}
            //     view={view}
            // />
            <div>{index}</div>
        ));

export const AccountsList = memo((props: AccountListProps) => {
    const {
        className,
        accounts,
        view = AccountView.SMALL,
        isLoading,
        target,
    } = props;
    const { t } = useTranslation();

    if (!isLoading && !accounts.length) {
        return (
            <div
                className={classNames(cls.AccountList, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Text size={TextSize.L} title={t('Пользователи не найдены')} />
            </div>
        );
    }

    return (
        <div
            className={classNames(cls.ArticleList, {}, [
                className,
                cls[view],
            ])}
            data-testid="AccountsList"
        >
            {accounts.map((item, index) => (
                // <ArticleListItem
                //     article={item}
                //     view={view}
                //     target={target}
                //     key={item.id}
                //     className={cls.card}
                // />
                <div>a {index}</div>
            ))}
            {isLoading && getSkeletons(view)}
        </div>
    );
});
