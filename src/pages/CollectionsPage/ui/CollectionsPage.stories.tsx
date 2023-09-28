import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import CollectionsPage from './CollectionsPage';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'pages/CollectionsPage',
    component: CollectionsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CollectionsPage>;

const Template: ComponentStory<typeof CollectionsPage> = () => <CollectionsPage />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
