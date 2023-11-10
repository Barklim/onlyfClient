import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Typography } from '@/shared/ui/material/Typography';
import { Maintenance } from '@/shared/ui/material/Maintenance';

interface SettingsPageProps {
    className?: string;
}

const SettingsPage = memo((props: SettingsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <Page>
            <VStack gap="16">
                <Typography variant="h5" color='primary'>
                    {t('Настройки пользователя')}
                </Typography>

                <Maintenance />
                {/* TODO: show for user.role admin */}
                {/*<UiDesignSwitcher />*/}
            </VStack>
        </Page>
    );
});

export default SettingsPage;
