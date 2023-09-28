import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';

export const AccountsList = memo(() => {
    const { t } = useTranslation('accounts');

    return <>
        <HStack justify='between'>
            {/*AccountsList*/}
        </HStack>
    </>;
});

export default AccountsList;
