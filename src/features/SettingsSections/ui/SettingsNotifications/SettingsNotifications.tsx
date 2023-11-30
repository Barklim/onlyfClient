import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { settingsActions, settingsReducer } from '../../model/slices/settingsSlice';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SettingsNotifications.module.scss';
import { useSelector } from 'react-redux';
import {
    getAgencyIsLoading,
    getSettingsForm,
} from '@/features/SettingsSections/model/selectors/getSettingsForm/getSettingsForm';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchSettingsAgency } from '@/features/SettingsSections/model/services/fetchSettingsAgency/fetchSettingsAgency';
import { Switch } from '@/shared/ui/material/Switch';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@/shared/ui/material/Typography';
import { getUserSettings } from '@/entities/User';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Icon } from '@/shared/ui/redesigned/Icon';
import CommentsSvg from '@/shared/assets/icons/settingsComments.svg';
import EventsSvg from '@/shared/assets/icons/settingsEvents.svg';
import BellSvg from '@/shared/assets/icons/settingsBell.svg';
import { Divider } from '@mui/material';

interface NotificationState {
    push: boolean;
    email: boolean;
}

interface NotificationsState {
    comments: NotificationState;
    events: NotificationState;
    information: NotificationState;
}

const initialReducers: ReducersList = {
    settings: settingsReducer,
};

export const SettingsNotifications = memo(() => {
    const { t } = useTranslation('settings');
    const dispatch = useAppDispatch();
    const data = useSelector(getSettingsForm);
    const isLoading = useSelector(getAgencyIsLoading);
    const userSettings = useSelector(getUserSettings);

    const [notificationsState, setNotificationsState] = useState<NotificationsState>({
        comments: {
            push: userSettings?.notifications.push.comments as boolean,
            email: userSettings?.notifications.email.comments as boolean
        },
        events: {
            push: userSettings?.notifications.push.events as boolean,
            email: userSettings?.notifications.email.events as boolean,
        },
        information: {
            push: userSettings?.notifications.push.info as boolean,
            email: userSettings?.notifications.email.info as boolean
        },
    });

    const onChangeSwitch = useCallback((type: keyof NotificationsState, method: keyof NotificationState) => {
        setNotificationsState((prevState) => ({
            ...prevState,
            [type]: {
                ...prevState[type],
                [method]: !prevState[type][method],
            },
        }));
    }, []);

    const onChangeAgencyName = useCallback(
        (value?: string) => {
            dispatch(settingsActions.updateProfile({ name: value || '' }));
        },
        [dispatch],
    );

    const onSave = useCallback(() => {
        // dispatch(fetchSettingsAgency());
    }, [dispatch]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Card sx={{ minWidth: 275 }} className={classNames(cls.card, {}, [])}>
                <CardContent>
                    <VStack
                        max
                    >
                        <Typography variant='h5' color='primary' fontWeight='700'>
                            {t('Notifications')}
                        </Typography>
                        <Typography variant='subtitle1' color='primary' className={cls.notificationsSubtext}>
                            {t('notifications subtext')}
                        </Typography>

                        <div className={cls.settings__article}>
                            <HStack align='start' gap='4' justify='between'>
                                <VStack gap='8' className={cls.leftSide}>
                                    <HStack gap='8'>
                                        <Icon Svg={CommentsSvg} height={24} width={24} />
                                        <Typography color='primary' fontWeight='700' fontSize='14px'>
                                            {t('notifications comments title')}
                                        </Typography>
                                    </HStack>
                                    <Typography color='primary' fontWeight='400' fontSize='16px' className={cls.itemSubtext}>
                                        {t('notifications comments subtext')}
                                    </Typography>
                                </VStack>
                                <VStack gap='8' max>
                                    <HStack gap='16' max justify='end'>
                                        <Typography color='primary' fontWeight='500' fontSize='14px'>
                                            Push
                                        </Typography>
                                        <Switch
                                            checked={notificationsState.comments.push}
                                            onChange={() => onChangeSwitch('comments', 'push')}
                                        />
                                    </HStack>
                                    <HStack gap='16' max justify='end'>
                                        <Typography color='primary' fontWeight='500' fontSize='14px'>
                                            Email
                                        </Typography>
                                        <Switch
                                            checked={notificationsState.comments.email}
                                            onChange={() => onChangeSwitch('comments', 'email')}
                                        />
                                    </HStack>
                                </VStack>
                            </HStack>
                        </div>

                        <Divider className={cls.divider}/>

                        <div className={cls.settings__article}>
                            <HStack align='start' gap='4' justify='between'>
                                <VStack gap='8' className={cls.leftSide}>
                                    <HStack gap='8'>
                                        <Icon Svg={EventsSvg} height={24} width={24} />
                                        <Typography color='primary' fontWeight='700' fontSize='14px'>
                                            {t('notifications events title')}
                                        </Typography>
                                    </HStack>
                                    <Typography color='primary' fontWeight='400' fontSize='16px' className={cls.itemSubtext}>
                                        {t('notifications events subtext')}
                                    </Typography>
                                </VStack>
                                <VStack gap='8' max>
                                    <HStack gap='16' max justify='end'>
                                        <Typography color='primary' fontWeight='500' fontSize='14px'>
                                            Push
                                        </Typography>
                                        <Switch
                                            checked={notificationsState.events.push}
                                            onChange={() => onChangeSwitch('events', 'push')}
                                        />
                                    </HStack>
                                    <HStack gap='16' max justify='end'>
                                        <Typography color='primary' fontWeight='500' fontSize='14px'>
                                            Email
                                        </Typography>
                                        <Switch
                                            checked={notificationsState.events.email}
                                            onChange={() => onChangeSwitch('events', 'email')}
                                        />
                                    </HStack>
                                </VStack>
                            </HStack>
                        </div>

                        <Divider className={cls.divider}/>

                        <div className={cls.settings__article}>
                            <HStack align='start' gap='4' justify='between'>
                                <VStack gap='8' className={cls.leftSide}>
                                    <HStack gap='8'>
                                        <Icon Svg={BellSvg} height={24} width={24} />
                                        <Typography color='primary' fontWeight='700' fontSize='14px'>
                                            {t('notifications information title')}
                                        </Typography>
                                    </HStack>
                                    <Typography color='primary' fontWeight='400' fontSize='16px' className={cls.itemSubtext}>
                                        {t('notifications information subtext')}
                                    </Typography>
                                </VStack>
                                <VStack gap='8' max>
                                    <HStack gap='16' max justify='end'>
                                        <Typography color='primary' fontWeight='500' fontSize='14px'>
                                            Push
                                        </Typography>
                                        <Switch
                                            checked={notificationsState.information.push}
                                            onChange={() => onChangeSwitch('information', 'push')}
                                        />
                                    </HStack>
                                    <HStack gap='16' max justify='end'>
                                        <Typography color='primary' fontWeight='500' fontSize='14px'>
                                            Email
                                        </Typography>
                                        <Switch
                                            checked={notificationsState.information.email}
                                            onChange={() => onChangeSwitch('information', 'email')}
                                            data-testid="Settings.switchInfoEmail"
                                        />
                                    </HStack>
                                </VStack>
                            </HStack>
                        </div>

                        <Divider className={cls.divider}/>
                        {/*<Loader />*/}
                    </VStack>
                </CardContent>
            </Card>
        </DynamicModuleLoader>
    )
});

export default SettingsNotifications;
