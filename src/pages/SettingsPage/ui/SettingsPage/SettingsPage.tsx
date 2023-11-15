import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Maintenance } from '@/shared/ui/material/Maintenance';
import { SettingsStopWords } from '@/features/SettingsStopWords';
import { useSelector } from 'react-redux';
import { isUserAdmin } from '@/entities/User';

interface SettingsPageProps {
    className?: string;
}

const SettingsPage = memo((props: SettingsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const isAdmin = useSelector(isUserAdmin);

    return (
        <Page>
            <VStack gap="16">
                {/* TODO: show for user.role admin */}
                {/*<UiDesignSwitcher />*/}
                {isAdmin ? <SettingsStopWords /> : <Maintenance/>}
            </VStack>
        </Page>
    );
});

export default SettingsPage;
