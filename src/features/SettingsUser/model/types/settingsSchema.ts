export interface SettingsSchema {
    data?: SettingsStopWords;
    form?: SettingsStopWords;
    isLoading: boolean;
    error?: string;
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