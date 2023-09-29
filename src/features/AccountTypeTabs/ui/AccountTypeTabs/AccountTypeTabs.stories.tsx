import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AccountTypeTabs } from './AccountTypeTabs';

export default {
    title: 'features/AccountTypeTabs',
    component: AccountTypeTabs,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AccountTypeTabs>;

const Template: ComponentStory<typeof AccountTypeTabs> = (args) => (
    <AccountTypeTabs {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
