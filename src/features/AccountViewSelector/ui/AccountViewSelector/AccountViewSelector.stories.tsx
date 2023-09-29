import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AccountViewSelector } from './AccountViewSelector';

export default {
    title: 'features/AccountViewSelector',
    component: AccountViewSelector,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AccountViewSelector>;

const Template: ComponentStory<typeof AccountViewSelector> = (args) => (
    <AccountViewSelector {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
