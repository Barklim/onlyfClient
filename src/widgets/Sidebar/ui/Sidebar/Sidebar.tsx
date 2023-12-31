import React, { memo, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { useSidebarItems } from '../../model/selectors/getSidebarItems';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Box, List, Toolbar } from '@mui/material';
import { ContactSupport } from '@mui/icons-material';
import { IconButton } from '@/shared/ui/material/IconButton';
import { Typography } from '@/shared/ui/material/Typography';
import { appVersion } from '@/shared/const/global';

interface SidebarProps {
    className?: string;
    collapsed: boolean;
    onToggle: () => void;
}

export const Sidebar = memo(({ className, collapsed, onToggle }: SidebarProps) => {
    const sidebarItemsList = useSidebarItems();

    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItem
                    item={item}
                    collapsed={collapsed}
                    key={item.path}
                />
            )),
        [collapsed, sidebarItemsList],
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <aside
                    data-testid="sidebar"
                    className={classNames(
                        cls.SidebarRedesigned,
                        { [cls.collapsedRedesigned]: collapsed },
                        [className],
                    )}
                >
                    <AppLogo
                        size={collapsed ? 30 : 50}
                        className={cls.appLogo}
                    />
                    <VStack role="navigation" gap="8" className={cls.items}>
                        <Box   component="div">
                            <List>
                                {itemsList}
                            </List>
                        </Box>
                    </VStack>
                    <Icon
                        data-testid="sidebar-toggle"
                        onClick={onToggle}
                        className={cls.collapseBtn}
                        Svg={ArrowIcon}
                        clickable
                    />
                    <div className={cls.switchers}>
                        <ThemeSwitcher />
                        <LangSwitcher short={collapsed} className={cls.lang} />
                    </div>
                </aside>
            }
            off={
                <aside
                    data-testid="sidebar"
                    className={classNames(
                        cls.Sidebar,
                        { [cls.collapsed]: collapsed },
                        [className],
                    )}
                >
                    <VStack role="navigation" gap="8" className={cls.items}>
                        {itemsList}
                    </VStack>
                    <div className={cls.switchers}>
                        <IconButton className={classNames(cls.IconButton, {}, [className])}>
                            <ContactSupport color='secondary'/>
                        </IconButton>
                        <LangSwitcher short={collapsed} className={cls.lang} />
                    </div>
                    {
                        !collapsed ? (
                            <HStack justify='between' className={cls.versionSection}>
                                <Typography color='secondary' fontSize='10px' className={cls.privacyPolicy}>Privacy & Policy</Typography>
                                <Typography color='secondary' fontSize='10px' className={ collapsed ? cls.version_collapsed : cls.version}>{appVersion}</Typography>
                            </HStack>
                        ) : (
                            <HStack justify='between' className={cls.versionSection_collapsed}>
                                <Typography color='secondary' fontSize='10px' className={cls.version_collapsed}>{appVersion}</Typography>
                            </HStack>
                        )
                    }
                </aside>
            }
        />
    );
});
