import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ButtonModal } from './ButtonModal';

export default {
    title: 'shared/ButtonModal',
    component: ButtonModal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ButtonModal>;

const Template: ComponentStory<typeof ButtonModal> = (args) => <ButtonModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
