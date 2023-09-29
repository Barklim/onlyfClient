import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Select.module.scss';
import { FormControl, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useLocalStorage } from '@/app/lib/useLocalStorage';
import React, { useEffect, useState } from 'react';
import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export interface SelectOption<T extends string> {
    value: T;
    content: string;
}

interface CustomSelectProps<T extends string> {
    className?: string;
    options?: SelectOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
    readonly?: boolean;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
const SelectMui = <T extends string>(props: CustomSelectProps<T>) => {
    const { className, options, onChange, value, readonly } = props;

    const { storageTheme } = useLocalStorage();
    const [lsTheme, setLsTheme] = useState<Theme>(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT);

    let mainColor = '';
    let mainContrastText = '';
    let secondary = '';
    let selectBgColor = '';

    switch (lsTheme) {
        case Theme.LIGHT:
            mainColor = '#00AFF0';
            mainContrastText = '#3caff0';
            secondary = '#e8e8ea';
            break;
        case Theme.DARK:
            mainColor = '#166ea2';
            mainContrastText = '#fff';
            secondary = '#27272B';
            selectBgColor = '#eeeeee';
            break;
        case Theme.ORANGE:
            mainColor = '#018CF1';
            mainContrastText = '#27272B';
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
        components: {
            MuiSelect: {
                styleOverrides: {
                    // https://stackoverflow.com/questions/60299377/material-ui-update-select-style-globally-with-theme
                    root: {
                        "& $notchedOutline": {
                            borderColor: "pink !important"
                        },
                        "&$focused $notchedOutline": {
                            borderColor: "red !important"
                        },
                        color: mainContrastText,

                        "& .MuiSelect-root ~ $notchedOutline": {
                            borderColor: "green !important"
                        },
                        "&$focused .MuiSelect-root ~ $notchedOutline": {
                            borderColor: "orange !important"
                        },
                        "& .MuiSelect-root": {
                            color: "purple !important"
                        }
                    }
                }
            }
        }
    });

    const onChangeHandler = (event: SelectChangeEvent) => {
        if (onChange) {
            onChange(event.target.value as T);
        }
    };

    const mods: Mods = {};

    useEffect(() => {
        setLsTheme(storageTheme);
    }, [storageTheme, lsTheme]);

    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            <ThemeProvider theme={theme}>
                <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                    <Select
                        value={value ?? ''}
                        onChange={onChangeHandler}
                        autoWidth
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        {options?.map((opt: any) => (
                            <MenuItem value={opt.value} key={opt.value}>
                                {opt.content}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </ThemeProvider>
        </div>
    );
};

export {SelectMui as Select};
