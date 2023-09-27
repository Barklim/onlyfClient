import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AppBar } from './AppBar';

export default {
    title: 'shared/AppBar',
    component: AppBar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AppBar>;

const Template: ComponentStory<typeof AppBar> = (args) => <AppBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
