import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import React, { memo, useCallback, useState } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginEmail } from '../../model/selectors/getLoginEmail/getLoginEmail';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import { Input } from '@/shared/ui/material/Input';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { getRouteProfile } from '@/shared/const/router';
import { Button, Typography, Checkbox, FormControlLabel } from '@mui/material';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [isSignUp, setIsSignUp] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const email = useSelector(getLoginEmail);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);
    const forceUpdate = useForceUpdate();

    const onCheckboxChange = useCallback(() => {
        setIsOwner((prevIsOwner) => !prevIsOwner); // Toggle isOwner value
    }, []);


    const onChangeEmail = useCallback(
        (value: string) => {
            dispatch(loginActions.setEmail(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ email, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
            forceUpdate();
        }
    }, [dispatch, email, password, onSuccess, forceUpdate]);

    const modsFullWidth: Mods = {
        [cls.fullWidth]: true,
    };

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <VStack
                gap="16"
                className={classNames(cls.LoginForm, {}, [className])}
            >
                {isSignUp ? (
                    <>
                        <Text title={t('Форма регистрации')} />
                        {error && (
                            <Text
                                text={t('Вы ввели неверный логин или пароль')}
                                variant="error"
                            />
                        )}
                        <Input
                            autofocus
                            size={'medium'}
                            variant="filled"
                            label={t('Введите email')}
                            fullWidth
                            value={email}
                            className={classNames(cls.input, modsFullWidth, [className])}
                            onChange={onChangeEmail}
                            type="text"
                            placeholder={t('Введите email')}
                        />
                        <Input
                            variant="filled"
                            size={'medium'}
                            label={t('Введите пароль')}
                            fullWidth
                            value={password}
                            className={classNames(cls.input, modsFullWidth, [className])}
                            onChange={onChangePassword}
                            type="text"
                            placeholder={t('Введите пароль')}
                        />
                        { isOwner ? (
                            <Input
                                variant="filled"
                                size={'medium'}
                                label={t('Введите название агенства')}
                                fullWidth
                                value={password}
                                className={classNames(cls.input, modsFullWidth, [className])}
                                onChange={onChangePassword}
                                type="text"
                                placeholder={t('Введите название агенства')}
                            />
                        ) :
                            <></>
                        }
                        <HStack justify={'between'} className={cls.loginBtnWrapper} max>
                            <FormControlLabel
                                className={cls.formControlLabel}
                                control={
                                    <Checkbox
                                        onChange={onCheckboxChange}
                                        checked={isOwner}
                                    />
                                } label={t('Owner agency')}
                            />

                            <HStack gap={'16'} justify={'end'} className={cls.loginBtnWrapper} max>
                                <Button
                                    size="medium"
                                    className={cls.loginBtn}
                                    onClick={() => { setIsSignUp(false) }}
                                    disabled={isLoading}
                                    variant={'outlined'}
                                >
                                    <AppLink
                                        data-testid="AccountListItem"
                                        to={getRouteProfile('1')}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            color="primary"
                                            className={cls.registerBtnText}
                                        >
                                            {t('Войти')}
                                        </Typography>
                                    </AppLink>
                                </Button>

                                <Button
                                    size="medium"
                                    className={cls.loginBtn}
                                    onClick={onLoginClick}
                                    disabled={isLoading}
                                    variant={'contained'}
                                >
                                    <AppLink
                                        data-testid="AccountListItem"
                                        to={getRouteProfile('1')}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            color="primary"
                                            className={cls.loginBtnText}
                                        >
                                            {t('Регистрация')}
                                        </Typography>
                                    </AppLink>
                                </Button>
                            </HStack>
                        </HStack>
                    </>
                ) : (
                    <>
                        <Text title={t('Форма авторизации')} />
                        {error && (
                            <Text
                                text={t('Вы ввели неверный логин или пароль')}
                                variant="error"
                            />
                        )}
                        <Input
                            autofocus
                            size={'medium'}
                            variant="filled"
                            label={t('Введите email')}
                            fullWidth
                            value={email}
                            className={classNames(cls.input, modsFullWidth, [className])}
                            onChange={onChangeEmail}
                            type="text"
                            placeholder={t('Введите email')}
                        />
                        <Input
                            variant="filled"
                            size={'medium'}
                            label={t('Введите пароль')}
                            fullWidth
                            value={password}
                            className={classNames(cls.input, modsFullWidth, [className])}
                            onChange={onChangePassword}
                            type="text"
                            placeholder={t('Введите пароль')}
                        />
                        <HStack gap={'16'} justify={'end'} className={cls.loginBtnWrapper} max>
                            <Button
                                size="medium"
                                className={cls.loginBtn}
                                onClick={() => { setIsSignUp(true) }}
                                disabled={isLoading}
                                variant={'outlined'}
                            >
                                <AppLink
                                    data-testid="AccountListItem"
                                    to={getRouteProfile('1')}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        color="primary"
                                        className={cls.registerBtnText}
                                    >
                                        {t('Регистрация')}
                                    </Typography>
                                </AppLink>
                            </Button>
                            <Button
                                size="medium"
                                className={cls.loginBtn}
                                onClick={onLoginClick}
                                disabled={isLoading}
                                variant={'contained'}
                            >
                                <AppLink
                                    data-testid="AccountListItem"
                                    to={getRouteProfile('1')}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        color="primary"
                                        className={cls.loginBtnText}
                                    >
                                        {t('Войти')}
                                    </Typography>
                                </AppLink>
                            </Button>
                        </HStack>
                    </>
                )}
            </VStack>

        </DynamicModuleLoader>
    );
});

export default LoginForm;
