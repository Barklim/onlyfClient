import { memo } from 'react';
import { AccountViewSelector } from '@/features/AccountViewSelector';
import { useAccountFilters } from '../../lib/hooks/useAccountFilters';

interface ViewSelectorContainerProps {
    className?: string;
}

export const ViewSelectorContainer = memo(
    (props: ViewSelectorContainerProps) => {
        const { className } = props;
        const { view, onChangeView } = useAccountFilters();

        return (
            <AccountViewSelector
                className={className}
                view={view}
                onViewClick={onChangeView}
            />
        );
    },
);
