import React, {
    ReactNode,
    useEffect,
    useState
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ButtonModal.module.scss';
import {
    IconButton as IconButtonMui,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { HTMLAttributes } from 'react';
import { useLocalStorage } from '@/app/lib/useLocalStorage';
import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Typography } from '@/shared/ui/material/Typography';

interface IconButtonProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    onClick?: () => void;
    children: ReactNode;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const ButtonModal = ((props: IconButtonProps) => {
    const {
        className,
        onClick,
        children,
    } = props;
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const { storageTheme } = useLocalStorage();
    const [lsTheme, setLsTheme] = useState<Theme>(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT);

    let mainColor = '';
    let mainContrastText = '';
    let secondary = '';

    switch (lsTheme) {
        case Theme.LIGHT:
            mainColor = '#00AFF0';
            mainContrastText = '#0232c2';
            secondary = '#e8e8ea';
            break;
        case Theme.DARK:
            mainColor = '#e8e8ea';
            mainContrastText = '#0232c2';
            secondary = '#27272B';
            break;
        case Theme.ORANGE:
            mainColor = '#27272B';
            mainContrastText = '#0232c2';
            secondary = '#e8e8ea';
            break;
        default:
            mainColor = '#00AFF0';
            mainContrastText = '#0232c2';
            secondary = '#0f0000';
            break;
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: mainColor,
                contrastText: mainContrastText,
            },
            secondary: {
                main: secondary,
                contrastText: '#fff',
            },
        },
    });

    useEffect(() => {
        setLsTheme(storageTheme);
    }, [storageTheme, lsTheme]);

    const text = (
        <div>
            <Typography variant="h4" color='primary'>{t('GreetingsText')}</Typography>
            <Typography variant="h6" color='primary'>{t('GreetingsSubText')}</Typography>
        </div>
    );

    const onClose = () => {
        setIsOpen(false);
    };

    const onOpen = () => {
        setIsOpen(true);
    };


    return (
        <ThemeProvider theme={theme}>
            <Modal lazy isOpen={isOpen} onClose={onClose}>
                {text}
            </Modal>
            <IconButtonMui
                className={classNames(cls.AppBarWrapper,{}, [className])}
                onClick={onClick ? onClick : onOpen}
            >
                {children}
            </IconButtonMui>
        </ThemeProvider>
    );
});
