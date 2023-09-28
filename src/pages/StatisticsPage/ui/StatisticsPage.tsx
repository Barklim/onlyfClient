import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Typography } from '@/shared/ui/material/Typography';

const StatisticsPage = () => {
    const { t } = useTranslation('statistics');

    return <Page data-testid="StatisticsPage">
        <Typography variant="h5" color='primary'>{t('Statistics')}</Typography>
    </Page>;
};

export default StatisticsPage;
