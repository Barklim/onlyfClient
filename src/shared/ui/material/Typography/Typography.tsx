import React, {
    ReactNode,
    useEffect,
    useState
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Typography.module.scss';
import {
    Typography as TypographyMui,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { HTMLAttributes } from 'react';
import { useLocalStorage } from '@/app/lib/useLocalStorage';
import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';
import { Variant } from "@mui/material/styles/createTypography";

interface TypographyProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    // https://stackoverflow.com/questions/71797203/how-to-use-material-ui-custom-variants-in-react-with-typescript
    // variant?: OverridableStringUnion<
    //     Variant | "inherit" | "caption12r" | "caption12ruc" | "caption12buc",
    //     TypographyPropsVariantOverrides
    //     >;
    variant?: Variant;
    color?: any;
    noWrap?: boolean;
    lineHeight?: string;
    fontWeight?: string;
    fontSize?: string;
    children: ReactNode;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Typography = ((props: TypographyProps) => {
    const {
        className,
        variant,
        color,
        noWrap,
        lineHeight,
        fontWeight,
        fontSize,
        children,
    } = props;
    // TODO: execute dublicate code
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

    return (
        <ThemeProvider theme={theme}>
            <TypographyMui
                variant={variant}
                color={color}
                className={classNames(cls.TypographyWrapper,{}, [className])}
                noWrap={noWrap}
                lineHeight={lineHeight}
                fontSize={fontSize}
                fontWeight={fontWeight}
            >
                {children}
            </TypographyMui>
        </ThemeProvider>
    );
});
