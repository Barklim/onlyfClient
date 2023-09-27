import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Maintenance } from './Maintenance';

export default {
    title: 'shared/Maintenance',
    component: Maintenance,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Maintenance>;

const Template: ComponentStory<typeof Maintenance> = (args) => <Maintenance {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
