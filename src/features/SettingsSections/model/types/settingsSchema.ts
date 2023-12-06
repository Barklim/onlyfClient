import { NotificationsSettings } from '@/entities/User/model/types/settings';
import { Theme } from '@/shared/const/theme';

export interface SettingsSchema {
    settingsSection?: SettingsSection;
    stopWords: StopWordsSectionSchema;
    agencyName: AgencyNameSectionSchema;
    notificationsLoaders: NotificationsSettings;
}

export interface StopWordsSectionSchema {
    data?: StopWords;
    form?: StopWords;
    isLoading: boolean;
    error?: string;
}

export interface AgencyNameSectionSchema {
    data?: AgencyName;
    form?: AgencyName;
    isLoading: boolean;
    error?: string;
}

export interface StopWords {
    stopWords?: string;
}

export interface AgencyName {
    name?: string;
}

export interface SettingsStopWords {
    stopWords?: string;
    name?: string;
}

export type TUserFeatures = {
    [key: string]: boolean;
};

export interface UpdateUserDto {
    isVisible?: boolean;
    isAccountsPageWasOpened?: boolean;
    isCookieDefined?: boolean;
    isArticlesPageWasOpened?: boolean;
    theme?: Theme;
    features?: TUserFeatures;
}

export interface Agency {
    id: number;
    created_at: string;
    ownerId: string;
    name: string;
    plan: string;
    stopWords: string;
    invites: any[];
    userTimeConstraint: any;
    admins: string[];
    managers: string[];
    models: string[];
    verified: boolean;
}

export enum SettingsSection {
    STOPWORDS = 'stopWords',
    AGENCYNAME = 'agencyName',
}