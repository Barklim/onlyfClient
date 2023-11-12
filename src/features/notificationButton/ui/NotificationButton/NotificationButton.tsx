import React, { memo, useCallback, useEffect, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { NotificationList } from '@/entities/Notification';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import cls from './NotificationButton.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge } from '@/shared/ui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationCount } from '@/features/notificationButton/model/selectors/getNotificationsCount';
import { useFetchNotificationsCount } from '@/app/lib/useFetchNotificationsCount';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { notificationsCountActions, notificationsCountReducer } from '../../model/slices/notificationsCountSlice';
import { AppDispatch } from '@/app/providers/StoreProvider';
import { fetchNotificationsCount } from '@/features/notificationButton/model/services/fetchNotificationsCount/fetchNotificationsCount';

interface NotificationButtonProps {
    className?: string;
}

const reducers: ReducersList = {
    notificationsCount: notificationsCountReducer,
};

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;
    const [isOpen, setIsOpen] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const notificationCount = useSelector(getNotificationCount);
    useFetchNotificationsCount('1');

    useEffect(() => {
        dispatch(fetchNotificationsCount({ id: '1' }));
    });

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const trigger = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />
            }
            off={
                <Badge badgeContent={notificationCount} color="info" onClick={onOpenDrawer} >
                    <NotificationsIcon color='secondary'/>
                </Badge>
            }
        />
    );

    return (
        <div>
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
                <BrowserView>
                    <PopoverDeprecated
                        className={classNames(cls.NotificationButton, {}, [
                            className,
                        ])}
                        direction="bottom left"
                        trigger={trigger}
                    >
                        <NotificationList className={cls.notifications} />
                    </PopoverDeprecated>
                </BrowserView>
                <MobileView>
                    {trigger}
                    <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                        <NotificationList />
                    </Drawer>
                </MobileView>
            </DynamicModuleLoader>
        </div>
    );
});
