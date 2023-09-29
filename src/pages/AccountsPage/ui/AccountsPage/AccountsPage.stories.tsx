import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AccountsPage from './AccountsPage';

export default {
    title: 'pages/AccountsPage/AccountsPage',
    component: AccountsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AccountsPage>;

const Template: ComponentStory<typeof AccountsPage> = (args) => (
    <AccountsPage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
