import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Typography } from '@/shared/ui/material/Typography';
import { AccountsList } from '@/features/accountsList/';
import { Maintenance } from '@/shared/ui/material/Maintenance';

const AccountsPage = () => {
    const { t } = useTranslation('about');

    return <Page data-testid="MassMailingsPage">
        <Typography variant="h5" color='primary'>{t('Accounts')}</Typography>
        <AccountsList />
        <Maintenance />
    </Page>;
};

export default AccountsPage;
