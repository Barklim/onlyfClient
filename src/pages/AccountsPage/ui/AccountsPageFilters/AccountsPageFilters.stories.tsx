import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AccountsPageFilters } from './AccountsPageFilters';

export default {
    title: 'pages/AccountsPage/AccountsPageFilters',
    component: AccountsPageFilters,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AccountsPageFilters>;

const Template: ComponentStory<typeof AccountsPageFilters> = (args) => (
    <AccountsPageFilters {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
