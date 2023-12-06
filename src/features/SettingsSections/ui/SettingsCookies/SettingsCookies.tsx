import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { settingsActions, settingsReducer } from '../../model/slices/settingsSlice';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SettingsCookies.module.scss';
import { Switch } from '@/shared/ui/material/Switch';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@/shared/ui/material/Typography';
import { Divider } from '@mui/material';
import { CookiesType } from '@/entities/User/model/types/settings';
import { COOKIE_ANALYTICAL_LOCALSTORAGE_KEY, COOKIE_NECESSARY_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

const initialReducers: ReducersList = {
    settings: settingsReducer,
};

export const SettingsCookies = memo(() => {
    const { t } = useTranslation('settings');
    const [cookieNec, setCookieNec] = useState<boolean>(localStorage.getItem(COOKIE_NECESSARY_LOCALSTORAGE_KEY) === 'true');
    const [cookieAn, setCookieAn] = useState<boolean>(localStorage.getItem(COOKIE_ANALYTICAL_LOCALSTORAGE_KEY) === 'true');

    const handleChange = (settingsItem: any) => {
        if (settingsItem.type === CookiesType.NECESSARY) {
            setCookieNec(settingsItem.value)
            localStorage.setItem(COOKIE_NECESSARY_LOCALSTORAGE_KEY, String(settingsItem.value))
        }
        if (settingsItem.type === CookiesType.ANALYTICAL) {
            setCookieAn(settingsItem.value)
            localStorage.setItem(COOKIE_ANALYTICAL_LOCALSTORAGE_KEY, String(settingsItem.value))
        }
    }

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>

            <Card sx={{ minWidth: 275 }} className={classNames(cls.card, {}, [])}>
                <CardContent>
                    <VStack max>
                        <Typography variant='h5' color='primary' fontWeight='700'>
                            {t('Cookies')}
                        </Typography>

                        <div className={cls.settings__article}>
                            <HStack align='start' gap='4' justify='between'>
                                <VStack gap='8' max>
                                    <HStack gap='8' justify='between' max>
                                        <Typography color='primary' fontWeight='700' fontSize='14px'>
                                            {t('necessary cookies title')}
                                        </Typography>
                                        <Switch
                                            disabled
                                            checked={cookieNec}
                                            handleChange={handleChange}
                                            type={CookiesType.NECESSARY}/>
                                    </HStack>
                                    <Typography color='primary' fontWeight='400' fontSize='16px' className={cls.itemSubtext}>
                                        {t('necessary cookies subtext')}
                                    </Typography>
                                </VStack>
                            </HStack>
                        </div>

                        <Divider className={cls.divider}/>

                        <div className={cls.settings__article}>
                            <HStack align='start' gap='4' justify='between'>
                                <VStack gap='8' max>
                                    <HStack gap='8'max justify='between'>
                                        <Typography color='primary' fontWeight='700' fontSize='14px'>
                                            {t('analytical cookies title')}
                                        </Typography>
                                        <Switch
                                            checked={cookieAn}
                                            handleChange={handleChange}
                                            type={CookiesType.ANALYTICAL} />
                                    </HStack>
                                    <Typography color='primary' fontWeight='400' fontSize='16px' className={cls.itemSubtext}>
                                        {t('analytical cookies subtext')}
                                    </Typography>
                                </VStack>
                            </HStack>
                        </div>

                        <Divider className={cls.divider}/>
                    </VStack>
                </CardContent>
            </Card>
        </DynamicModuleLoader>
    )
});

export default SettingsCookies;
