export type NotificationCount = {
    count: number;
}

export interface NotificationCountSchema {
    count: number;
    isLoading?: boolean;
    error?: string;
}
