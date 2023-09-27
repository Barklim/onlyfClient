import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Badge } from './Badge';

export default {
    title: 'shared/Badge',
    component: Badge,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
