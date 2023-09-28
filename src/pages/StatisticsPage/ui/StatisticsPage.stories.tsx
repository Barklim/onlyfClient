import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import StatisticsPage from './StatisticsPage';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'pages/StatisticsPage',
    component: StatisticsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof StatisticsPage>;

const Template: ComponentStory<typeof StatisticsPage> = () => <AboutPage />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
