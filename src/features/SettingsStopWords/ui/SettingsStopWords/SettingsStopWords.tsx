import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { settingsActions, settingsReducer } from '../../model/slices/settingsSlice';
import { Input } from '@/shared/ui/material/Input';
import { Switch } from '@/shared/ui/material/Switch';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SettingsStopWords.module.scss';
import { useSelector } from 'react-redux';
import {
    getSettingsAgencyIsLoading,
    getSettingsForm,
} from '@/features/SettingsStopWords/model/selectors/getSettingsForm/getSettingsForm';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchSettingsAgency } from '@/features/SettingsStopWords/model/services/fetchSettingsAgency/fetchSettingsAgency';
import { Button as ButtonMui } from '@mui/material';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchAgencyData } from '@/features/SettingsStopWords/model/services/fetchAgency/fetchAgencyData';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@/shared/ui/material/Typography';

const initialReducers: ReducersList = {
    settings: settingsReducer,
};

export const SettingsStopWords = memo(() => {
    const { t } = useTranslation('settings');
    const dispatch = useAppDispatch();
    const data = useSelector(getSettingsForm);
    const isLoading = useSelector(getSettingsAgencyIsLoading);

    useInitialEffect(() => {
        dispatch(fetchAgencyData());
    });

    const onChangeStopWords = useCallback(
        (value?: string) => {
            dispatch(settingsActions.updateProfile({ stopWords: value || '' }));
        },
        [dispatch],
    );

    const onSave = useCallback(() => {
        dispatch(fetchSettingsAgency());
    }, [dispatch]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Card sx={{ minWidth: 275 }} className={classNames(cls.card, {}, [])}>
                <CardContent>
                    <VStack
                        gap="16"
                        max
                    >
                        <Typography variant='h5' color='primary' fontWeight='700'>
                            {t('Стоп слова')}
                        </Typography>
                        <Typography variant='subtitle1' color='primary'>
                            {t('stop words subtext')}
                        </Typography>
                        <Input
                            variant="filled"
                            placeholder={t('Введите стоп слова')}
                            fullWidth
                            value={data?.stopWords}
                            className={classNames(cls.fullWidth, {}, [])}
                            onChange={onChangeStopWords}
                            multiline
                            data-testid="Settings.stopWords"
                        />
                        <ButtonMui
                            variant='contained'
                            size='medium'
                            onClick={onSave}
                            color='primary'
                            data-testid="Settings.SaveButton"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : t('Сохранить')}
                        </ButtonMui>
                    </VStack>
                </CardContent>
            </Card>
        </DynamicModuleLoader>
    )
});

export default SettingsStopWords;
