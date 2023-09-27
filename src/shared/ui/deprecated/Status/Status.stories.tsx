import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Status } from './Status';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/Status',
    component: Status,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Status>;

const Template: ComponentStory<typeof Status> = (args) => <Status {...args} />;

export const Primary = Template.bind({});

export const Error = Template.bind({});

export const onlyTitle = Template.bind({});

export const onlyText = Template.bind({});

export const PrimaryDark = Template.bind({});

export const onlyTitleDark = Template.bind({});

onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTextDark = Template.bind({});

onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeL = Template.bind({});

export const SizeM = Template.bind({});

export const SizeS = Template.bind({});
