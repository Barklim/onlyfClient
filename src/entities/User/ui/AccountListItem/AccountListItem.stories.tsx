import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AccountView } from '../../model/consts/userConsts';
import { AccountListItem } from './AccountListItem';
import { User } from '../../model/types/user';

export default {
    title: 'entities/Account/AccountListItem',
    component: AccountListItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AccountListItem>;

const Template: ComponentStory<typeof AccountListItem> = (args) => (
    <AccountListItem {...args} />
);

const account = {
    id: '1',
    username: 'username',
    online: true,
} as User;

export const Big = Template.bind({});
Big.args = {
    view: AccountView.BIG,
    account,
};

export const Small = Template.bind({});
Small.args = {
    view: AccountView.SMALL,
    account,
};
