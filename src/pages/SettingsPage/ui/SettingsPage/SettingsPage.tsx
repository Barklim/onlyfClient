import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SettingsStopWords, SettingsAgencyName, SettingsNotifications } from '@/features/SettingsSections';
import { useSelector } from 'react-redux';
import { getUserAuthData, isUserAdmin } from '@/entities/User';
import { Chip, Divider } from '@mui/material';
import cls from './SettingsPage.module.scss';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchAgencyData } from '@/features/SettingsSections/model/services/fetchAgency/fetchAgencyData';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface SettingsPageProps {
    className?: string;
}

const SettingsPage = memo((props: SettingsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('settings');
    const isAdmin = useSelector(isUserAdmin);
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        dispatch(fetchAgencyData());
    });

    return (
        <Page>
            <VStack gap="16">
                {isAdmin ?
                    <>
                        <Divider textAlign="left" className={cls.divider}>
                            <Chip variant="outlined" label={t('Настройки агенства')} />
                        </Divider>
                        <SettingsStopWords />

                        <SettingsAgencyName />
                    </>
                    : null
                }

                <Divider textAlign="left" className={cls.divider}>
                    <Chip variant="outlined" label={t('Настройки приложения')} />
                </Divider>
                <UiDesignSwitcher />
                {authData ? <SettingsNotifications /> : null}
            </VStack>
        </Page>
    );
});

export default SettingsPage;
