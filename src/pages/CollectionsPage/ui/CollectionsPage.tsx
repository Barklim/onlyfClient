import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Typography } from '@/shared/ui/material/Typography';

const CollectionsPage = () => {
    const { t } = useTranslation('collections');

    return <Page data-testid="CollectionsPage">
        <Typography variant="h5" color='primary'>{t('Collections')}</Typography>
    </Page>;
};

export default CollectionsPage;
