import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Typography } from '@/shared/ui/material/Typography';
import { Maintenance } from '@/shared/ui/material/Maintenance';

const MainPage = () => {
    const { t } = useTranslation('main');
    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <Page data-testid="MainPage">
            <Typography variant="h5" color='primary'>{t('MainPage')}</Typography>
            <Maintenance />
        </Page>
    );
};

export default MainPage;
