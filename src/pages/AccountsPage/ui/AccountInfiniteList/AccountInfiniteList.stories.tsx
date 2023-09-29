import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AccountInfiniteList } from './AccountInfiniteList';

export default {
    title: 'pages/AccountsPage/AccountInfiniteList',
    component: AccountInfiniteList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AccountInfiniteList>;

const Template: ComponentStory<typeof AccountInfiniteList> = (args) => (
    <AccountInfiniteList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
