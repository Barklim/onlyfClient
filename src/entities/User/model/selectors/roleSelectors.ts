import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { UserRole } from '../consts/userConsts';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const isUserAdmin = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(UserRole.ADMIN)),
);
export const isUserManager = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(UserRole.MANAGER)),
);
