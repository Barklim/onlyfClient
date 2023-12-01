import React, { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { settingsActions, settingsReducer } from '../../model/slices/settingsSlice';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SettingsNotifications.module.scss';
import { useSelector } from 'react-redux';
import { getSettingsNotificationsLoading } from '@/features/SettingsSections/model/selectors/getSettingsForm/getSettingsForm';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
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
import {
    NotificationsSource,
    NotificationsType,
    TUserSettingsNotificationsItem,
} from '@/entities/User/model/types/settings';
import { fetchSettingsNotifications } from '@/features/SettingsSections/model/fetchSettingsNotifications/fetchSettingsNotifications';

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
    const userSettings = useSelector(getUserSettings);
    const notificationLoaders = useSelector(getSettingsNotificationsLoading);

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

    const onChangeSwitch = useCallback(
        (settingsItem: TUserSettingsNotificationsItem) => {
            dispatch(fetchSettingsNotifications([settingsItem]))
        },
        [dispatch],
    );

    const handleChange = (notificationItem: TUserSettingsNotificationsItem) => onChangeSwitch(notificationItem);

    const onChangeAgencyName = useCallback(
        (value?: string) => {
            dispatch(settingsActions.updateProfile({ name: value || '' }));
        },
        [dispatch],
    );

    // console.log('!!! render');
    // console.log(notificationsState);
    // console.log(notificationLoaders);
    // console.log('!!!');

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
                                        {
                                            notificationLoaders?.push.comments ?
                                                <Loader /> : null
                                        }
                                        <Switch
                                            handleChange={handleChange}
                                            defaultChecked={notificationsState.comments.push}
                                            source={NotificationsSource.COMMENTS}
                                            type={NotificationsType.PUSH}

                                        />
                                    </HStack>
                                    <HStack gap='16' max justify='end'>
                                        <Typography color='primary' fontWeight='500' fontSize='14px'>
                                            Email
                                        </Typography>
                                        {
                                            notificationLoaders?.email.comments ?
                                                <Loader /> : null
                                        }
                                        <Switch
                                            handleChange={handleChange}
                                            defaultChecked={notificationsState.comments.email}
                                            source={NotificationsSource.COMMENTS}
                                            type={NotificationsType.EMAIL}
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
                                        {
                                            notificationLoaders?.push.events ?
                                                <Loader /> : null
                                        }
                                        <Switch
                                            handleChange={handleChange}
                                            defaultChecked={notificationsState.events.push}
                                            source={NotificationsSource.EVENTS}
                                            type={NotificationsType.PUSH}
                                        />
                                    </HStack>
                                    <HStack gap='16' max justify='end'>
                                        <Typography color='primary' fontWeight='500' fontSize='14px'>
                                            Email
                                        </Typography>
                                        {
                                            notificationLoaders?.email.events ?
                                                <Loader /> : null
                                        }
                                        <Switch
                                            handleChange={handleChange}
                                            defaultChecked={notificationsState.events.email}
                                            source={NotificationsSource.EVENTS}
                                            type={NotificationsType.EMAIL}
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
                                        {
                                            notificationLoaders?.push.info ?
                                                <Loader /> : null
                                        }
                                        <Switch
                                            handleChange={handleChange}
                                            defaultChecked={notificationsState.information.push}
                                            source={NotificationsSource.INFO}
                                            type={NotificationsType.PUSH}
                                        />
                                    </HStack>
                                    <HStack gap='16' max justify='end'>
                                        {/*<Typography color='primary' fontWeight='500' fontSize='14px'>*/}
                                        {/*    Email*/}
                                        {/*</Typography>*/}

                                        <Typography color='primary' fontWeight='500' fontSize='14px'>
                                            {!notificationLoaders?.email.info ?
                                                'Email' :
                                                '...Loading'
                                            }
                                        </Typography>

                                        <Switch
                                            handleChange={handleChange}
                                            defaultChecked={notificationsState.information.email}
                                            source={NotificationsSource.INFO}
                                            type={NotificationsType.EMAIL}
                                            data-testid="Settings.switchInfoEmail"
                                        />
                                    </HStack>
                                </VStack>
                            </HStack>
                        </div>

                        <Divider className={cls.divider}/>
                    </VStack>
                </CardContent>
            </Card>
        </DynamicModuleLoader>
    )
});

export default SettingsNotifications;
