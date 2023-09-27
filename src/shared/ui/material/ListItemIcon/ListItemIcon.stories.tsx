import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ListItemIcon } from './ListItemIcon';

export default {
    title: 'shared/ListItemIcon',
    component: ListItemIcon,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ListItemIcon>;

const Template: ComponentStory<typeof ListItemIcon> = (args) => <ListItemIcon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
