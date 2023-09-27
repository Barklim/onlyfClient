import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';
import { Theme } from '@/shared/const/theme';

export interface LocalStorageValues {
    storageTheme: Theme;
    sidebarState: string;
}

export const useLocalStorage = () => {
    const [storageTheme, setStorageTheme] = useState<Theme>(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.DARK);

    useEffect(() => {
        // TODO: this decision is not working, but bad solving bottom with long pooling is bad
        // window.addEventListener('storage', () => {
        //     console.log("Change to local storage!");
        // });
        const interval = setInterval(() => {
            const currentValueTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.DARK;
            if (currentValueTheme !== storageTheme) {
                setStorageTheme(currentValueTheme);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [storageTheme]);

    return {storageTheme};
};
