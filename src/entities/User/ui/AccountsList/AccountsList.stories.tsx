import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AccountView } from '../../model/consts/userConsts';
import { AccountsList } from './AccountsList';
import { User } from '../../model/types/user';

export default {
    title: 'entities/User/AccountsList',
    component: AccountsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AccountsList>;

const Template: ComponentStory<typeof AccountsList> = (args) => (
    <AccountsList {...args} />
);

// TODO
const account = {
    id: '1',
    profileId: "1",
    username: "admin",
    online: true,
    password: "123",
    roles: [
        "admin"
    ],
    features: {
        "isArticleRatingEnabled": true,
        "isCounterEnabled": true,
        "isAppRedesigned": false
    },
    avatar: "https://mobimg.b-cdn.net/v3/fetch/22/2207633df03a819cd72889249c8361a8.jpeg?w=1470&r=0.5625",
    jsonSettings: {
        "isArticlesPageWasOpened": true,
        "theme": "app_orange_theme",
        "isAccountsPageWasOpened": true,
        "isCookieDefined": true
    }

} as User;

export const LoadingBig = Template.bind({});
LoadingBig.args = {
    accounts: [],
    isLoading: true,
    view: AccountView.BIG,
};

export const LoadingSmall = Template.bind({});
LoadingSmall.args = {
    accounts: [],
    isLoading: true,
    view: AccountView.SMALL,
};

export const ListSmall = Template.bind({});
ListSmall.args = {
    accounts: new Array(9).fill(0).map((item, index) => ({
        ...account,
        id: String(index),
    })),
    isLoading: false,
    view: AccountView.SMALL,
};

export const ListBig = Template.bind({});
ListBig.args = {
    accounts: new Array(9).fill(0).map((item, index) => ({
        ...account,
        id: String(index),
    })),
    isLoading: false,
    view: AccountView.BIG,
};
