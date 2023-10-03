import { HTMLAttributeAnchorTarget, memo } from 'react';
import { AccountView } from '../../model/consts/userConsts';
import { User } from '../../model/types/user';
import { AccountListItemDeprecated } from './AccountListItemDeprecated/AccountListItemDeprecated';

export interface AccountListItemProps {
    className?: string;
    account: User;
    view: AccountView;
    target?: HTMLAttributeAnchorTarget;
}

export const AccountListItem = memo((props: AccountListItemProps) => {
    return (
        <AccountListItemDeprecated {...props} />
    );
});
