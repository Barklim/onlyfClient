import { useDispatch } from 'react-redux';
import { fetchNotificationsCount } from '@/features/notificationButton/model/services/fetchNotificationsCount/fetchNotificationsCount';
import { useEffect } from 'react';
import { AppDispatch } from '@/app/providers/StoreProvider';

export const useFetchNotificationsCount = (userId: string) => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(fetchNotificationsCount({ id: userId }));
        }, 10*1000);

        return () => {
            clearInterval(interval);
        };
    }, [dispatch, userId]);
};