import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IconButton } from './IconButton';

export default {
    title: 'shared/IconButton',
    component: IconButton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
