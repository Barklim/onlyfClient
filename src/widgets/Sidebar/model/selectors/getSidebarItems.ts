import { useSelector } from 'react-redux';
import { getUserAuthData, UserRole } from '@/entities/User';
import MainIconDeprecated from '@/shared/assets/icons/main-20-20.svg';
import SupervisorAccountIcon from '@/shared/assets/icons/SupervisorAccount.svg';
import CollectionsBookmarkIcon from '@/shared/assets/icons/CollectionsBookmark.svg';
import MailingIcon from '@/shared/assets/icons/mailing.svg';
import StatisticsIcon from '@/shared/assets/icons/statistics.svg';
import AboutIcon from '@/shared/assets/icons/about.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';

import { SidebarItemType } from '../types/sidebar';
import {
    getRouteAbout,
    getRouteAccounts,
    getRouteCollections,
    getRouteMain,
    getRouteMassMailings, getRouteStatistics,
} from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features';

export const useSidebarItems = () => {
    const userData = useSelector(getUserAuthData);
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => MainIconDeprecated,
                on: () => MainIcon,
            }),
            text: 'Главная',
        },
    ];

    if (userData) {
        sidebarItemsList.push(
            {
                path: getRouteAccounts(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => SupervisorAccountIcon,
                    on: () => ProfileIcon,
                }),
                text: 'Accounts',
                authOnly: true,
                roles: [UserRole.ADMIN]
            },
            {
                path: getRouteMassMailings(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => MailingIcon,
                    on: () => ProfileIcon,
                }),
                text: 'Mass mailings',
                authOnly: true,
                roles: [UserRole.ADMIN]
            },
            {
                path: getRouteCollections(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => CollectionsBookmarkIcon,
                    on: () => ProfileIcon,
                }),
                text: 'Collections',
                authOnly: true,
                roles: [UserRole.ADMIN]
            },
            {
                path: getRouteStatistics(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => StatisticsIcon,
                    on: () => ProfileIcon,
                }),
                text: 'Statistics',
                authOnly: true,
                roles: [UserRole.ADMIN]
            },
        );
    }

    sidebarItemsList.push(
        {
            path: getRouteAbout(),
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => AboutIcon,
                on: () => AboutIcon,
            }),
            text: 'О сайте',
        },
    )

    return sidebarItemsList;
};
