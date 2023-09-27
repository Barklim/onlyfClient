import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { TableMassMailings } from '@/features/TableMassMailings';

const MassMailingsPage = () => {
    const { t } = useTranslation('about');

    return <Page data-testid="MassMailingsPage">
      <TableMassMailings />
    </Page>;
};

export default MassMailingsPage;
