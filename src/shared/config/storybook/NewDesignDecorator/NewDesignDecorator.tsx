import { Story } from '@storybook/react';
import { setFeatureFlags } from '@/shared/lib/features';
import { getAllFeatureFlags } from '@/shared/lib/features/lib/setGetFeatures';
// eslint-disable-next-line ulbi-tv-plugin/layer-imports

export const NewDesignDecorator = (StoryComponent: Story) => {
    setFeatureFlags({ ...getAllFeatureFlags(), isAppRedesigned: true });
    return (
        <div className="app_redesigned">
            <StoryComponent />
        </div>
    );
};
