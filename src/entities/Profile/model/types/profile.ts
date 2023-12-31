import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

export interface Profile {
    id?: string;
    first?: string;
    lastname?: string;
    age?: number;
    currency?: Currency;
    country?: Country;
    city?: string;
    username?: string;
    avatar?: string;
    stopWords?: string;
    verified?: boolean;
    countViolations?: number;
    countViolationsPercentage?: number;
    countViolationsTotal?: number;
    countActiveDialogs?: number;
    isLoadingInvite?: boolean;
    isLoadingInviteCancel?: boolean;
}
