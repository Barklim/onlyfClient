import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { settingsActions, settingsReducer } from '../../model/slices/settingsSlice';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SettingsVisible.module.scss';
import { Switch } from '@/shared/ui/material/Switch';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@/shared/ui/material/Typography';
import { Button, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { getUserSettings, userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchSettings } from '@/features/SettingsSections/model/services/fetchSettings/fetchSettings';
import { UpdateUserDto } from '@/features/SettingsSections/model/types/settingsSchema';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { fetchDelete } from '@/features/SettingsSections/model/services/fetchDelete/fetchDelete';
import { useNavigate } from 'react-router-dom';

const initialReducers: ReducersList = {
    settings: settingsReducer,
};

export const SettingsVisible = memo(() => {
    const { t } = useTranslation('settings');
    const dispatch = useAppDispatch();
    const userSettings = useSelector(getUserSettings);
    const settingsIsVisible = userSettings?.isVisible || false;
    const [isHidden, setVisibility] = useState<boolean>(!settingsIsVisible);
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleChange = (settingsItem: any) => {
        setVisibility(settingsItem.value)
        const updateUserData: UpdateUserDto = {};
        updateUserData.isVisible = !settingsItem.value;
        dispatch(fetchSettings(updateUserData))
    }

    const deleteUser = async () => {
        try {
            await dispatch(fetchDelete());
            setModalOpen(true)
            dispatch(userActions.logout());
            navigate('/');
        } catch (error) {}
    }

    const openModal = () => {setModalOpen(true)}
    const closeModal = () => {setModalOpen(false)}

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>

            <Modal isOpen={isModalOpen} lazy>
                <VStack max gap="16">
                    <Typography variant='h5' color='primary' fontWeight='700'>
                        {t('modal delete title')}
                    </Typography>
                    <Typography variant='subtitle1' color='primary' className={cls.notificationsSubtext}>
                        {t('modal delete subtext')}
                    </Typography>

                    <HStack gap={'16'} justify={'end'} className={cls.loginBtnWrapper} max>
                        <Button
                            size="medium"
                            onClick={deleteUser}
                            variant={'outlined'}
                            color='error'
                        >
                            <Typography
                                variant="subtitle2"
                                color="primary"
                            >
                                {t('delete')}
                            </Typography>
                        </Button>

                        <Button
                            size="medium"
                            onClick={closeModal}
                            variant={'contained'}
                        >
                            <Typography
                                variant="subtitle2"
                                color="primary"
                            >
                                {t('no')}
                            </Typography>
                        </Button>
                    </HStack>
                </VStack>
            </Modal>

            <Card sx={{ minWidth: 275 }} className={classNames(cls.card, {}, [])}>
                <CardContent>
                    <VStack max>
                        <Typography variant='h5' color='primary' fontWeight='700'>
                            {t('Visibility')}
                        </Typography>

                        <div className={cls.settings__article}>
                            <HStack align='start' gap='4' justify='between'>
                                <VStack gap='8' max>
                                    <HStack gap='8' justify='between' max>
                                        <Typography color='primary' fontWeight='700' fontSize='14px'>
                                            {t('Hide account')}
                                        </Typography>
                                        <Switch
                                            checked={isHidden}
                                            handleChange={handleChange}
                                        />
                                    </HStack>
                                    <Typography color='primary' fontWeight='400' fontSize='16px' className={cls.itemSubtext}>
                                        {t('visibility subtext')}
                                    </Typography>
                                </VStack>
                            </HStack>
                        </div>

                        <Divider className={cls.divider}/>

                        <div className={cls.settings__article}>
                            <VStack gap='8' max>
                                <Typography color='primary' fontWeight='700' fontSize='14px'>
                                    {t('Delete account')}
                                </Typography>
                                <HStack max justify='between'>
                                    <Typography color='red' className={cls.deleteSubText}>{t('delete subtext')}</Typography>
                                    <Button
                                        color='error'
                                        variant='contained'
                                        size='small'
                                        className={cls.deleteSubText}
                                        onClick={openModal}
                                    >{t('delete')}</Button>
                                </HStack>
                            </VStack>
                        </div>
                    </VStack>
                </CardContent>
            </Card>
        </DynamicModuleLoader>
    )
});

export default SettingsVisible;
