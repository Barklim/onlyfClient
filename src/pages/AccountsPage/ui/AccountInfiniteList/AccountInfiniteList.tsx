import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { AccountsList } from '@/entities/User';
import { Text } from '@/shared/ui/deprecated/Text';
import { getAccounts } from '../../model/slices/accountsPageSlice';
import {
    getAccountsPageError,
    getAccountsPageIsLoading,
    getAccountsPageView,
} from '../../model/selectors/accountsPageSelectors';

interface AccountInfiniteListProps {
    className?: string;
}

export const AccountInfiniteList = memo((props: AccountInfiniteListProps) => {
    const { className } = props;
    const accounts = useSelector(getAccounts.selectAll);
    const isLoading = useSelector(getAccountsPageIsLoading);
    const view = useSelector(getAccountsPageView);
    const error = useSelector(getAccountsPageError);
    const { t } = useTranslation();

    if (error) {
        // TODO:
        return <Text text={t('Ошибка при загрузке статей')} />;
    }

    return (
        <AccountsList
            isLoading={isLoading}
            view={view}
            accounts={accounts}
            className={className}
        />
    );
});
