import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';

import ListIcon from '@/shared/assets/icons/burger.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';

import cls from './AccountViewSelector.module.scss';
import { AccountView } from '@/entities/User';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { IconButton } from '@/shared/ui/material/IconButton';

interface AccountViewSelectorProps {
    className?: string;
    view: AccountView;
    onViewClick?: (view: AccountView) => void;
}

const viewTypes = [
    {
        view: AccountView.SMALL,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => TiledIcon,
            off: () => TiledIconDeprecated,
        }),
        ButtonIcon: GridViewIcon,
    },
    {
        view: AccountView.BIG,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ListIcon,
            off: () => ListIconDeprecated,
        }),
        ButtonIcon: TableRowsIcon,
    },
];

export const AccountViewSelector = memo((props: AccountViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: AccountView) => () => {
        onViewClick?.(newView);
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card
                    className={classNames(
                        cls.AccountViewSelectorRedesigned,
                        {},
                        [className],
                    )}
                    border="round"
                >
                    <HStack gap="8">
                        {viewTypes.map((viewType) => (
                            <Icon
                                clickable
                                key={viewType.view}
                                onClick={onClick(viewType.view)}
                                Svg={viewType.icon}
                                className={classNames('', {
                                    [cls.notSelected]: viewType.view !== view,
                                })}
                            />
                        ))}
                    </HStack>
                </Card>
            }
            off={
                <div
                    className={classNames(cls.AccountViewSelector, {}, [
                        className,
                    ])}
                >
                    {viewTypes.map((viewType) => (
                        <IconButton
                            key={viewType.view}
                            className={classNames('', {}, [className])}
                            onClick={onClick(viewType.view)}
                        >
                            <viewType.ButtonIcon
                                color={
                                    viewType.view === view
                                        ? 'secondary'
                                        : undefined
                                }
                                className={classNames(cls.IconButton, {
                                    [cls.notSelected]: viewType.view !== view,
                                })}
                            />
                        </IconButton>
                    ))}
                </div>
            }
        />
    );
});
