import React, {
    ReactNode,
    useEffect,
    useState
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ListItemIcon.module.scss';
import {
    AppBar as AppBarMui,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { HTMLAttributes } from 'react';
import { useLocalStorage } from '@/app/lib/useLocalStorage';
import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';
import { ListItemIcon as ListItemIconMui } from '@mui/material';

interface ListItemIconProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const ListItemIcon = ((props: ListItemIconProps) => {
    const {
        className,
        children,
    } = props;
    const { storageTheme } = useLocalStorage();
    const [lsTheme, setLsTheme] = useState<Theme>(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT);

    let mainColor = '';

    switch (lsTheme) {
        case Theme.LIGHT:
            mainColor = '#00AFF0';
            break;
        case Theme.DARK:
            mainColor = '#e8e8ea';
            break;
        case Theme.ORANGE:
            mainColor = '#bd5012';
            break;
        default:
            mainColor = '#00AFF0';
            break;
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: mainColor,
                contrastText: '#fff',
            },
        },
    });

    useEffect(() => {
        setLsTheme(storageTheme);
    }, [storageTheme, lsTheme]);

    return (
        <ThemeProvider theme={theme}>
            <ListItemIconMui
                className={classNames(cls.ListItemIconMui,{}, [className])}
            >
                {children}
            </ListItemIconMui>
        </ThemeProvider>
    );
});
