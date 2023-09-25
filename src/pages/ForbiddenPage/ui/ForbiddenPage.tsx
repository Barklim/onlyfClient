import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const ForbiddenPage = () => {
    const { t } = useTranslation('');

    return (
        <Page data-testid="ForbiddenPage">
            {t('У вас нет доступа к этой странице')}
        </Page>
    );
};

export default ForbiddenPage;
