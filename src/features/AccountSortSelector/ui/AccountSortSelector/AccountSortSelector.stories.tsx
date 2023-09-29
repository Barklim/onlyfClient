import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AccountSortSelector } from './AccountSortSelector';

export default {
    title: 'features/AccountSortSelector',
    component: AccountSortSelector,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AccountSortSelector>;

const Template: ComponentStory<typeof AccountSortSelector> = (args) => (
    <AccountSortSelector {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
