import { UserRole } from '../consts/userConsts';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { JsonSettings } from './jsonSettings';
import { Profile } from '@/entities/Profile';
import { TUserSettings } from '@/entities/User/model/types/settings';

export interface User {
    id: string;
    accessToken?: string;
    refreshToken?: string;
    username: string;
    email?: string;
    profileId: string;
    online: boolean;
    avatar?: string;
    roles?: UserRole[];
    features?: FeatureFlags;
    jsonSettings?: JsonSettings;
    settings?: TUserSettings;
    profile?: Profile;
}

export interface UserSchema {
    authData?: User;

    _inited: boolean;
}

export interface UserByIdSchema {
    data?: User;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
}

export interface UserToken {
    accessToken: string;
    refreshToken: string;
}

