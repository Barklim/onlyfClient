import React, {
    ReactNode,
    useEffect,
    useState
} from 'react';
import cls from './Switch.module.scss';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { useLocalStorage } from '@/app/lib/useLocalStorage';
import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';
import {
    NotificationsSource,
    NotificationsType,
    TUserSettingsNotificationsItem,
} from '@/entities/User/model/types/settings';

interface SwitchMuiProps {
    className?: string;
    defaultChecked?: boolean;
    type?: NotificationsType;
    source?: NotificationsSource;
    handleChange?: (item: any) => void;
    checked?: boolean;
    mainColor?: string;
    children?: ReactNode;
}

interface SwitchPropsExtended extends SwitchProps {
    // TODO: Additional props
    type?: NotificationsType;
    source?: NotificationsSource;
    handleChange?: any;
    checked?: any;
    mainColor?: string;
}

// DONE: smooth animation is lost
// https://github.com/mui/material-ui/issues/32186
const IOSSwitch = styled(({ checked, handleChange, source, type, ...props }: SwitchPropsExtended) => (
    <Switch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        inputProps={{ 'aria-label': 'controlled' }}
        //  TODO: disabled
        onChange={(event) => {
            const notificationItem = {
                type: type,
                source: source,
                value: event.target.checked
            } as TUserSettingsNotificationsItem

            handleChange(notificationItem);
        }}
        checked={checked}
        {...props} />
))(({ theme, mainColor }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : mainColor,
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: mainColor,
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

export const SwitchMui = ((props: SwitchMuiProps) => {
    const {
        className,
        type,
        source,
        handleChange,
        checked
    } = props;
    const { storageTheme } = useLocalStorage();
    const [lsTheme, setLsTheme] = useState<Theme>(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT);

    let mainColor = '';

    switch (lsTheme) {
        case Theme.LIGHT:
            mainColor = '#3caff0';
            break;
        case Theme.DARK:
            mainColor = '#3caff0';
            break;
        case Theme.ORANGE:
            mainColor = '#338cf1';
            break;
        default:
            mainColor = '#338cf1';
            break;
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: mainColor,
                contrastText: '#fff',
            },
            secondary: {
                main: '#fff',
                contrastText: '#fff',
            },
        },
    });

    useEffect(() => {
        setLsTheme(storageTheme);
    }, [storageTheme, lsTheme]);

    return (
        <ThemeProvider theme={theme}>
            <IOSSwitch
                checked={checked}
                handleChange={handleChange}
                source={source}
                type={type}
                mainColor={mainColor} />
        </ThemeProvider>
    );
});
