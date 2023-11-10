import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { getUserAuthData, getUserByIdData, isUserAdmin, UserRole } from '@/entities/User';
import { profileActions } from '../../model/slice/profileSlice';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { Button as ButtonMui } from '@mui/material';
import { Typography } from '@/shared/ui/material/Typography'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { CloudOff, Public } from '@mui/icons-material';

interface EditableProfileCardHeaderProps {
    id?: string;
    className?: string;
}

// TODO: fix inline styles here
export const EditableProfileCardHeader = memo(
    (props: EditableProfileCardHeaderProps) => {
        const { className, id } = props;

        const { t } = useTranslation('profile');
        const profileData = useSelector(getProfileData);
        const isAdmin = useSelector(isUserAdmin);
        const authData = useSelector(getUserAuthData);
        const userByIdData = useSelector(getUserByIdData);
        const invisibleStatus = userByIdData?.roles?.includes(UserRole.ADMIN) || false;
        const readonly = useSelector(getProfileReadonly);
        const dispatch = useAppDispatch();

        const onEdit = useCallback(() => {
            dispatch(profileActions.setReadonly(false));
        }, [dispatch]);

        const onCancelEdit = useCallback(() => {
            dispatch(profileActions.cancelEdit());
        }, [dispatch]);

        const onSave = useCallback(() => {
            dispatch(updateProfileData());
        }, [dispatch]);

        return (
            <HStack
                max
                justify="between"
            >
                <HStack gap={'16'} align={'end'}>
                    <Typography variant='h5' color='primary'>
                        {profileData?.username}
                    </Typography>
                    {!invisibleStatus ?
                        userByIdData?.online ?
                            <Typography
                                variant='subtitle1'
                                color='#9a9a9a'
                                style={{ paddingLeft: "10px", display: 'flex', verticalAlign: 'end', alignItems: 'end'}}
                            >
                                online
                                <Public style={{ height: '12px', position: 'relative', top: '1px' }} />
                            </Typography>
                            :
                            <Typography
                                variant='subtitle1'
                                color='#9a9a9a'
                                style={{ paddingLeft: "10px", display: 'flex', verticalAlign: 'end', alignItems: 'end'}}
                            >
                                off
                                <CloudOff style={{ height: '12px', position: 'relative', top: '1px' }} />
                            </Typography>
                        :
                        null
                    }
                </HStack>
                {isAdmin && (
                    <div>
                        {readonly ? (
                            <ButtonMui
                                variant='outlined'
                                size='medium'
                                onClick={onEdit}
                                data-testid="EditableProfileCardHeader.EditButton"
                            >
                                {t('Редактировать')}
                            </ButtonMui>
                        ) : (
                            <HStack gap="8">
                                <ButtonMui
                                    variant='outlined'
                                    size='medium'
                                    onClick={onCancelEdit}
                                    startIcon={<CloseIcon />}
                                    color='error'
                                    data-testid="EditableProfileCardHeader.CancelButton"
                                >
                                    {t('Отменить')}
                                </ButtonMui>
                                <ButtonMui
                                    variant='contained'
                                    size='medium'
                                    onClick={onSave}
                                    endIcon={<DoneIcon />}
                                    color='success'
                                    data-testid="EditableProfileCardHeader.SaveButton"
                                >
                                    {t('Сохранить')}
                                </ButtonMui>
                            </HStack>
                        )}
                    </div>
                )}
            </HStack>
        );
    },
);
