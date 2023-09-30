import { memo } from 'react';
import { AccountsFilters } from '@/widgets/AccountsFilters';
import { useAccountFilters } from '../../lib/hooks/useAccountFilters';

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const { className } = props;
    const {
        onChangeSort,
        onChangeType,
        sort,
        type,
        onChangeSearch,
        search,
        onChangeOrder,
        order,
    } = useAccountFilters();

    return (
        <AccountsFilters
            type={type}
            onChangeSearch={onChangeSearch}
            order={order}
            onChangeOrder={onChangeOrder}
            search={search}
            sort={sort}
            onChangeSort={onChangeSort}
            onChangeType={onChangeType}
            className={className}
        />
    );
});
