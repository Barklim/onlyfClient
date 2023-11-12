import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import cls from './NotificationList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getNotifications, notificationsReducer } from '@/features/notificationButton/model/slices/notificationsSlice';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchNotifications } from '@/features/notificationButton/model/services/fetchNotifications/fetchNotifications';
import { useSelector } from 'react-redux';
import {
    getNotificationsError,
    getNotificationsIsLoading,
} from '@/features/notificationButton/model/selectors/notificationsSelector';
import { Typography } from '@/shared/ui/material/Typography';
import { useTranslation } from 'react-i18next';

interface NotificationListProps {
    className?: string;
}

const reducers: ReducersList = {
    notifications: notificationsReducer,
};

export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation('main');
    const notifications = useSelector(getNotifications.selectAll)
    const isLoading = useSelector(getNotificationsIsLoading);
    const error = useSelector(getNotificationsError);

    useInitialEffect(() => {
        dispatch(fetchNotifications({id: ''}));
    });

    if (error) {
        return (
            <div>Something wrong. Cannot get notifications.</div>
        );
    }

    if (isLoading) {
        return (
        <div className={classNames(cls.NotificationWrapper, {}, [className])}>
            <Typography
                color='primary'
                fontWeight={'700'}
                fontSize={'14px'}
                className={classNames(cls.NotificationTopTitle, {}, [className])}
            >{t('Notifications')}</Typography>
            <VStack
                gap="8"
                max
                className={classNames(cls.NotificationList, {}, [className])}
            >
                {
                    ['145px','124px','170px'].map((item) => (
                        <NotificationItem
                            key={item}
                            skeleton={
                                <SkeletonDeprecated width="100%" border="8px" height={item} className={classNames(cls.NotificationItemSkeleton, {}, [className])} />
                            }
                        />
                    ))

                }
            </VStack>
        </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <div className={classNames(cls.NotificationWrapper, {}, [className])}>
                <Typography
                    color='primary'
                    fontWeight={'700'}
                    fontSize={'14px'}
                    className={classNames(cls.NotificationTopTitle, {}, [className])}
                >{t('Notifications')}</Typography>
                <VStack
                    gap="8"
                    max
                    className={classNames(cls.NotificationList, {}, [className])}
                >
                    {
                        notifications.length !== 0 ?
                            notifications.map((item) => (
                                <NotificationItem
                                    key={item.id}
                                    item={item}
                                    className={classNames(cls.NotificationItem, {}, [className])}
                                />
                            ))
                            :

                            <Typography
                                color='primary'
                                fontWeight={'400'}
                                fontSize={'16px'}
                            >
                                {t('There are no notifications for you yet...')}
                            </Typography>
                    }
                </VStack>
            </div>
        </DynamicModuleLoader>
    );
});
