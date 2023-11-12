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

interface NotificationListProps {
    className?: string;
}

const reducers: ReducersList = {
    notifications: notificationsReducer,
};

export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
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
            <VStack
                gap="16"
                max
                className={classNames(cls.NotificationList, {}, [className])}
            >
                <SkeletonDeprecated width="100%" border="8px" height="80px" />
                <SkeletonDeprecated width="100%" border="8px" height="80px" />
                <SkeletonDeprecated width="100%" border="8px" height="80px" />
            </VStack>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <VStack
                gap="16"
                max
                className={classNames(cls.NotificationList, {}, [className])}
            >
                {notifications?.map((item) => (
                    <NotificationItem key={item.id} item={item} />
                ))}
            </VStack>
        </DynamicModuleLoader>
    );
});
