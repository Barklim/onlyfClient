import React, {
    ReactNode,
    useEffect,
    useState
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Badge.module.scss';
import {
    Badge as BadgeMui,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { HTMLAttributes } from 'react';
import { useLocalStorage } from '@/app/lib/useLocalStorage';
import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    color?: any;
    badgeContent?: number;
    onClick?: () => void;
    children: ReactNode;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Badge = ((props: BadgeProps) => {
    const {
        className,
        color,
        badgeContent,
        onClick,
        children,
    } = props;
    const { storageTheme } = useLocalStorage();
    const [lsTheme, setLsTheme] = useState<Theme>(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT);

    let mainColor = '';
    let mainContrastText = '';
    let secondary = '';
    let infoMainColor = ''
    let infoContrastText = ''

    switch (lsTheme) {
        case Theme.LIGHT:
            mainColor = '#00AFF0';
            mainContrastText = '#0232c2';
            secondary = '#e8e8ea';
            infoMainColor = '#018CF1'
            infoContrastText = '#e8e8ea';
            break;
        case Theme.DARK:
            mainColor = '#e8e8ea';
            mainContrastText = '#0232c2';
            secondary = '#27272B';
            infoMainColor = '#00AFF0'
            infoContrastText = '#e8e8ea';
            break;
        case Theme.ORANGE:
            mainColor = '#bd5012';
            mainContrastText = '#0232c2';
            secondary = '#e8e8ea';
            infoMainColor = '#00AFF0'
            infoMainColor = '#ee1b1b'
            infoContrastText = '#e8e8ea';
            break;
        default:
            mainColor = '#00AFF0';
            mainContrastText = '#0232c2';
            secondary = '#0f0000';
            infoMainColor = '#00AFF0'
            infoMainColor = '#ee1b1b'
            infoContrastText = '#e8e8ea';
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
            info: {
                main: infoMainColor,
                contrastText: infoContrastText,
            }
        },
    });

    useEffect(() => {
        setLsTheme(storageTheme);
    }, [storageTheme, lsTheme]);

    return (
        <ThemeProvider theme={theme}>
            <BadgeMui
                className={classNames(cls.AppBarWrapper,{}, [className])}
                color={color}
                badgeContent={badgeContent}
                onClick={onClick}
            >
                {children}
            </BadgeMui>
        </ThemeProvider>
    );
});
