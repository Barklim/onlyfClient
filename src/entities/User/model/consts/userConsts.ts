export enum UserRole {
    ADMIN = 'admin',
    REGULAR = 'regular',
    MANAGER = 'manager',
    SUPERUSER = 'superuser',
    MODEL = 'model'
}

export enum AccountSortField {
    USERNAME = 'username',
    ONLINE = 'online',
    CREATED = 'createdAt',
}

export enum AccountBlockType {
    CODE = 'CODE',
    IMAGE = 'IMAGE',
    TEXT = 'TEXT',
}

export enum AccountType {
    ALL = 'ALL',
    ADMIN = 'ADMIN',
    MODEL = 'MODEL',
    MANAGER = 'MANAGER',
}

export enum AccountView {
    BIG = 'BIG',
    SMALL = 'SMALL',
}

export enum UserRoleOptions {
    ADMIN = 'Admin',
    REGULAR = 'Regular',
    MANAGER = 'Manager',
    SUPERUSER = 'Superuser',
    MODEL = 'Model'
}

export const UserRoleOptionsReverseMap = {
    'Admin': 'ADMIN',
    'Regular': 'REGULAR',
    'Manager': 'MANAGER',
    'Superuser': 'SUPERUSER',
    'Model': 'MODEL',
};
