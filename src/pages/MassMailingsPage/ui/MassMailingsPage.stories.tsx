import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import MassMailingsPage from './MassMailingsPage';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'pages/MassMailingsPage',
    component: MassMailingsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MassMailingsPage>;

const Template: ComponentStory<typeof MassMailingsPage> = () => <MassMailingsPage />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
