import { useTranslation } from 'react-i18next';

import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { Profile } from '../../model/types/profile';
import {
    ProfileCardDeprecated,
    ProfileCardDeprecatedError,
    ProfileCardDeprecatedLoader,
} from '../ProfileCardDeprecated/ProfileCardDeprecated';
import { UserRole } from '@/entities/User';

export interface ProfileCardProps {
    className?: string;
    role?: Array<UserRole>;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeLastname?: (value?: string) => void;
    onChangeFirstname?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeStopWords?: (value?: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const { isLoading, error } = props;

    if (isLoading) {
        return (
            <ProfileCardDeprecatedLoader />
        );
    }

    if (error) {
        return (
            <ProfileCardDeprecatedError />
        );
    }

    return (
        <ProfileCardDeprecated {...props} />
    );
};
