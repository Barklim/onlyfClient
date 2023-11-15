import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '../AccountListItem.module.scss';
import {
    AccountView, UserRole, UserRoleOptions,
} from '../../../model/consts/userConsts';
import {
    Card as CardMui,
    Button as ButtonMui,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Box,
    CardHeader,
    IconButton,
    Chip
} from '@mui/material';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { getRouteProfile } from '@/shared/const/router';
import { AccountListItemProps } from '../AccountListItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Public, CloudOff, Done, VisibilityOff } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { isUserAdmin } from '../../../model/selectors/roleSelectors';
import { ButtonSplit } from '@/shared/ui/material/ButtonSplit';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchInvite } from '@/entities/User/model/services/fetchInvite';
import { fetchInviteCancel } from '@/entities/User/model/services/fetchInviteCancel';

const lipsumText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.'

export const AccountListItemDeprecated = memo((props: AccountListItemProps) => {
    const { className, account, view, target } = props;
    const dispatch = useAppDispatch();
    const isAdmin = useSelector(isUserAdmin);
    const accountIsAdmin = account.roles?.includes(UserRole.ADMIN) || false;

    const handleClick = (value: any) => {
        dispatch(fetchInvite(value));
    }

    const handleClickCancel = (value: any) => {
        dispatch(fetchInviteCancel(value));
    }

    const cardActions =
        <CardActions>
            {
                isAdmin ?
                    account.profile?.verified ?
                        <ButtonMui
                            size="small"
                        >
                            <AppLink
                                data-testid="AccountListItem"
                                to={getRouteProfile(account.id)}
                            >
                                <Typography variant="subtitle2" color="primary">
                                    View
                                </Typography>
                            </AppLink>
                        </ButtonMui>
                        :
                        null
                    :
                    <ButtonMui
                        size="small"
                    >
                        <AppLink
                            data-testid="AccountListItem"
                            to={getRouteProfile(account.id)}
                        >
                            <Typography variant="subtitle2" color="primary">
                                View
                            </Typography>
                        </AppLink>
                    </ButtonMui>
            }
            {!accountIsAdmin ?
                isAdmin ?
                    account.profile?.verified ?
                        <Chip
                            className={cls.chip}
                            size="small"
                            color={'success'}
                            variant={'outlined'}
                            label={'Verified'}
                            disabled={account.profile?.isLoadingInviteCancel}
                            onDelete={() => {
                                handleClickCancel(account.id)
                            }}
                        />
                        :
                        <ButtonSplit
                            options={[UserRoleOptions.MODEL, UserRoleOptions.MANAGER, UserRoleOptions.ADMIN]}
                            id={account.id}
                            isLoading={account.profile?.isLoadingInvite}
                            onClick={handleClick}
                        >
                            Verify
                        </ButtonSplit>
                    :
                    account.profile?.verified ?
                        <Chip
                            className={cls.chip}
                            size="small"
                            color={'success'}
                            variant={'outlined'}
                            label={'Verified'}
                            deleteIcon={<Done />}
                            onDelete={() => {}}
                        />
                        :
                        null
                :
                null
            }
        </CardActions>

    if (view === AccountView.BIG) {
        return (
            <div
                data-testid="AccountListItem"
                className={classNames(cls.AccountListItem, {}, [
                    className,
                    cls[''],
                ])}
            >
                <CardMui
                    sx={{
                        width: '100%',
                        display: 'flex'
                    }}
                >
                    <AppLink
                        data-testid="AccountListItem"
                        to={getRouteProfile(account.id)}
                    >
                        <CardMedia
                            component="div"
                            sx={{
                                width: 300,
                                minWidth: 300,
                                height: '100%'
                            }}
                            image={account.profile?.avatar}
                        />
                        <div className={cls.cardGradientWrapper}>
                            <div className={cls.cardGradient}></div>
                        </div>
                        <div className={cls.statusContainer}>
                            <div className={cls.statusWrapper}>
                                {!accountIsAdmin ?
                                    account.online ?
                                        <Chip
                                            size="small"
                                            color={'success'}
                                            variant={'filled'}
                                            className={cls.status__big}
                                            label={'online'}
                                            onDelete={() => {
                                            }}
                                            deleteIcon={<Public />}
                                        />
                                        :
                                        <Chip
                                            size="small"
                                            color={'error'}
                                            variant={'filled'}
                                            className={cls.status__big}
                                            label={'off'}
                                            onDelete={() => {
                                            }}
                                            deleteIcon={<CloudOff />}
                                        />
                                    :
                                    <Chip
                                        size="small"
                                        color={'error'}
                                        variant={'filled'}
                                        className={cls.statusInvisible}
                                        label={'hidden'}
                                        onDelete={() => {}}
                                        deleteIcon={<VisibilityOff />}
                                    />
                                }
                            </div>
                        </div>
                    </AppLink>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardHeader
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={account?.profile?.username}
                            subheader={account.email}
                        />

                        <CardContent
                            sx={{ flexGrow: 1 }}
                        >
                            <Typography
                                gutterBottom
                                variant="subtitle1"
                                component="div"
                                color="text.secondary"
                                className={cls.subText}
                            >
                                {lipsumText}
                            </Typography>
                        </CardContent>
                        {cardActions}
                    </Box>
                </CardMui>
            </div>
        );
    }

    return (
        <CardMui
            sx={{
                display: 'flex'
            }}
            className={classNames(cls.AccountListItem, {}, [
                className,
                cls[''],
            ])}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <AppLink
                    data-testid="AccountListItem"
                    to={getRouteProfile(account.id)}
                    style={{ height: "100%"}}
                >
                    <CardMedia
                        component="div"
                        sx={{
                            width: 220,
                            height: '100%'
                        }}
                        image={account.profile?.avatar}
                        className={cls.cardImage}
                        // src={'@/shared/assets/icons/arrow-bottom.svg'}
                    />
                    <div className={cls.cardGradientWrapper}>
                        <div className={cls.cardGradient}></div>
                    </div>
                </AppLink>
                <div className={cls.statusContainer}>
                    <div className={cls.statusWrapper}>
                        {!accountIsAdmin ?
                            account.online ?
                                <Chip
                                    size="small"
                                    color={'success'}
                                    variant={'filled'}
                                    className={cls.status}
                                    label={'online'}
                                    onDelete={() => {}}
                                    deleteIcon={<Public />}
                                />
                                :
                                <Chip
                                    size="small"
                                    color={'error'}
                                    variant={'filled'}
                                    className={cls.status}
                                    label={'off'}
                                    onDelete={() => {}}
                                    deleteIcon={<CloudOff />}
                                />
                            :
                            <Chip
                                size="small"
                                color={'warning'}
                                variant={'filled'}
                                className={cls.statusInvisible}
                                label={'hidden'}
                                onDelete={() => {}}
                                deleteIcon={<VisibilityOff />}
                            />
                        }
                    </div>
                </div>
                <CardHeader
                    className={cls.cardHeader}
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={account?.profile?.username}
                    subheader={account.email}
                />
                {cardActions}
            </Box>
        </CardMui>
    );
});
