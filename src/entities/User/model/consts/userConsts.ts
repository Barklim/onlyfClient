export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MANAGER = 'MANAGER',
}

export enum AccountSortField {
    VIEWS = 'views',
    TITLE = 'title',
    CREATED = 'createdAt',
}

export enum AccountBlockType {
    CODE = 'CODE',
    IMAGE = 'IMAGE',
    TEXT = 'TEXT',
}

// TODO AccountType = USERRole
export enum AccountType {
    ALL = 'ALL',
    COURSE = 'COURSE',
    OTHER = 'OTHER',
    BOOK = 'BOOK',
}

export enum AccountView {
    BIG = 'BIG',
    SMALL = 'SMALL',
}
