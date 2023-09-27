import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Sidebar } from '../Sidebar/Sidebar';
import { useState } from 'react';

const [collapsed, setCollapsed] = useState(false);

const onToggle = () => {
    console.log(collapsed);
    setCollapsed((prev) => !prev);
};

describe('Sidebar', () => {
    test('with only first param', () => {
        componentRender(<Sidebar collapsed={collapsed} onToggle={onToggle} />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('test toggle', () => {
        componentRender(<Sidebar collapsed={collapsed} onToggle={onToggle} />);
        const toggleBtn = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
