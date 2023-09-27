import React, { memo, Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserInited, initAuthData } from '@/entities/User';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleFeatures } from '@/shared/lib/features';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { PageLoader } from '@/widgets/PageLoader';
import { useAppToolbar } from './lib/useAppToolbar';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';
import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/const/localstorage';
import { CssBaseline } from '@mui/material';

const App = memo(() => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const inited = useSelector(getUserInited);
    const toolbar = useAppToolbar();

    const onToggle = () => {
        console.log(collapsed);
        setCollapsed((prev) => !prev);
    };

    useEffect(() => {
        const designKey = localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY);

        if (designKey === null) {
            localStorage.setItem(
                LOCAL_STORAGE_LAST_DESIGN_KEY,
                'new'
            );
            window.location.reload();
        }
    }, []);

    useEffect(() => {
        if (!inited) {
            dispatch(initAuthData());
        }
    }, [dispatch, inited]);

    if (!inited) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <div
                        id="app"
                        className={classNames('app_redesigned', {}, [theme])}
                    >
                        <AppLoaderLayout />{' '}
                    </div>
                }
                off={<PageLoader />}
            />
        );
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <div id="app" className={classNames('app', {}, [theme])}>
                    <Suspense fallback="">
                        <CssBaseline />
                        <Navbar onToggle={onToggle}/>
                        <div className="content-page">
                            <Sidebar collapsed={collapsed} onToggle={onToggle} />
                            <AppRouter />
                        </div>
                    </Suspense>
                </div>
            }
            on={
                <div
                    id="app"
                    className={classNames('app_redesigned', {}, [theme])}
                >
                    <Suspense fallback="">
                        <MainLayout
                            header={<Navbar />}
                            content={<AppRouter />}
                            sidebar={<Sidebar collapsed={collapsed} onToggle={onToggle} />}
                            toolbar={toolbar}
                        />
                    </Suspense>
                </div>
            }
        />
    );
});

export default withTheme(App);
