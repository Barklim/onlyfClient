export enum NotificationsType {
    PUSH = 'push',
    EMAIL = 'email',
}

export enum NotificationsSource {
    COMMENTS = 'comments',
    EVENTS = 'events',
    INFO = 'info',
}

export type NotificationsSettings = {
    [key in NotificationsType]: NotificationsSettingsItem
};

export type NotificationsSettingsItem = {
    [key in NotificationsSource]: boolean
};

export type TUserSettings = {
    notifications: NotificationsSettings,
    isVisible: boolean
};

export type TUserSettingsNotificationsItem = {
    type: NotificationsType,
    source: NotificationsSource,
    value: boolean
};

export type TUserSettingsNotifications = Array<TUserSettingsNotificationsItem>;

export enum CookiesType {
    ANALYTICAL = 'analytical',
    NECESSARY = 'necessary',
}

export type TUserSettingsCookiesItem = {
    type: CookiesType,
    value: boolean
};
