import { ButtonHTMLAttributes, memo, ReactNode, MouseEventHandler } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './ButtonSplit.module.scss';
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import {
    UserRole,
    UserRoleOptions,
    UserRoleOptionsReverseMap,
} from '@/entities/User/model/consts/userConsts';

type InviteObj = {
    id: string,
    role: UserRole
}

interface ButtonProps {
    className?: string;
    id?: string;
    options: UserRoleOptions[];
    children?: ReactNode;
    onClick?: (value: InviteObj) => void;
}

export const ButtonSplit = memo((props: ButtonProps) => {
    const {
        className,
        id,
        onClick,
        options,
        children,
        ...otherProps
    } = props;

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClick = () => {
        const selectedOption = options[selectedIndex];
        const userRoleKey = UserRoleOptionsReverseMap[selectedOption] as keyof typeof UserRole;

        if (onClick) {
            const inviteObj = {
                id: id,
                role: UserRole[userRoleKey]
            } as InviteObj;
            onClick(inviteObj);
        }
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    return (
        <React.Fragment>
            <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                <Button size={'small'} onClick={handleClick}>{`Invite as ${options[selectedIndex]}`}</Button>
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal={false}
                placement="bottom-end"
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
});
