import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { LoginModal } from '@/features/AuthByUsername';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropdown } from '@/features/avatarDropdown';
import cls from './Navbar.module.scss';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import { AppBar } from '@/shared/ui/material/AppBar';
import { Typography } from '@/shared/ui/material/Typography';
import { IconButton } from '@/shared/ui/material/IconButton';
import LogoDarkIcon from '../../../shared/assets/icons/logo2.png';
import LogoIcon from '../../../shared/assets/icons/logo.png';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { useLocalStorage } from '@/app/lib/useLocalStorage';
import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';
import { isJsonModeServer } from '@/shared/const/global';

interface NavbarProps {
    className?: string;
    onToggle?: () => void;
}

export const Navbar = memo(({ className, onToggle }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);
    const { storageTheme } = useLocalStorage();
    const [lsTheme, setLsTheme] = useState<Theme>(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.NavbarRedesigned,
        off: () => cls.Navbar,
    });

    useEffect(() => {
        setLsTheme(storageTheme);
    }, [storageTheme, lsTheme]);

    if (authData) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <header className={classNames(mainClass, {}, [className])}>
                        <HStack gap="16" className={cls.actions}>
                            <NotificationButton />
                            <AvatarDropdown />
                        </HStack>
                    </header>
                }
                off={
                    <>
                        <CssBaseline />
                        <Box component="nav">
                            <AppBar position="static" className={classNames(cls.AppBar, {}, [className])}>
                                <Toolbar>
                                    <IconButton className={classNames(cls.IconButton, {}, [className])} onClick={onToggle}>
                                        <Menu color='secondary'/>
                                    </IconButton>
                                    <IconButton className={classNames(cls.IconLogoWrapper, {}, [className])}>
                                        {lsTheme === Theme.ORANGE ? (
                                            <img className={classNames(cls.IconLogo, {}, [className])} src={LogoIcon} width={24} />
                                        ) : (
                                            <img className={classNames(cls.IconLogo, {}, [className])} src={LogoDarkIcon} width={24} />
                                        )}
                                    </IconButton>
                                    <Typography color='secondary'>{t('OFTracker')}</Typography>
                                    {
                                        isJsonModeServer ? (
                                            <Typography color='secondary'>&nbsp; | Dev Stand</Typography>
                                        ) : null
                                    }
                                    <HStack gap="16" className={cls.actions}>
                                        <ThemeSwitcher />
                                        <NotificationButton />
                                        <AvatarDropdown />
                                    </HStack>
                                </Toolbar>
                            </AppBar>
                        </Box>
                    </>
                }
            />
        );
    }

    return (
        <>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <header className={classNames(mainClass, {}, [className])}>
                        <Button
                            variant="clear"
                            className={cls.links}
                            onClick={onShowModal}
                        >
                            {t('Войти')}
                        </Button>
                    </header>
                }
                off={
                    <>
                        <CssBaseline />
                        <Box component="nav">
                            <AppBar position="static" className={classNames(cls.AppBar, {}, [className])}>
                                <Toolbar>
                                    <IconButton className={classNames(cls.IconButton, {}, [className])} onClick={onToggle}>
                                        <Menu color='secondary'/>
                                    </IconButton>
                                    <Typography color='secondary'>{t('OnlyfTracker')}</Typography>

                                    <div className={cls.links}>
                                        <ThemeSwitcher />
                                        <ButtonDeprecated
                                            theme={ButtonTheme.CLEAR_INVERTED}
                                            onClick={onShowModal}
                                        >
                                            {t('Войти')}
                                        </ButtonDeprecated>
                                    </div>
                                </Toolbar>
                            </AppBar>
                        </Box>
                    </>
                }
            />

            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            )}
        </>
    );
});
