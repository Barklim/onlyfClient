import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Typography } from '@/shared/ui/material/Typography';

const AboutPage = () => {
    const { t } = useTranslation('about');

    return <Page data-testid="MassMailingsPage">
        <Typography variant="h5" color='primary'>{t('О сайте')}</Typography>
    </Page>;
};

export default AboutPage;
