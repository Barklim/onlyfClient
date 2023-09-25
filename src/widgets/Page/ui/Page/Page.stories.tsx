import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Page } from './Page';

export default {
    title: 'widgets/Page',
    component: Page,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
