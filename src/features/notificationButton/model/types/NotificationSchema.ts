import { Notification } from '@/entities/Notification';
import { EntityState } from '@reduxjs/toolkit';

export interface NotificationSchema extends EntityState<Notification> {
    isLoading?: boolean;
    error?: string;
}
