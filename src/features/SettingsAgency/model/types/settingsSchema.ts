export interface SettingsSchema {
    settingsSection?: SettingsSection;
    stopWords: StopWordsSectionSchema;
    agencyName: AgencyNameSectionSchema;
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