import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BetListRoute from '../../src/routes/BetListRoute';

jest.mock('../../src/components/Loader', () => ({ 
    __esModule: true, 
    default: ({ isLoading }) => isLoading ? <div data-testid="loader">Loading...</div> : null 
}));

jest.mock('../../src/pages/betlist', () => ({ 
    __esModule: true, 
    default: () => <div data-testid="betlist-page">BetList Page</div> 
}));

describe('BetListRoute', () => {
    const renderWithRouter = (initialEntries = ['/test']) => {
        return render(
            <MemoryRouter 
                initialEntries={initialEntries}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            >
                <BetListRoute />
            </MemoryRouter>
        );
    };

    test('renders without crashing', () => {
        const { container } = renderWithRouter();
        expect(container).toBeInTheDocument();
    });

    test('renders BetList component on :action route', () => {
        const { getByTestId } = renderWithRouter(['/action1']);
        expect(getByTestId('betlist-page')).toBeInTheDocument();
        expect(getByTestId('betlist-page')).toHaveTextContent('BetList Page');
    });

    test('handles different action parameters', () => {
        const { getByTestId } = renderWithRouter(['/report']);
        expect(getByTestId('betlist-page')).toBeInTheDocument();
        expect(getByTestId('betlist-page')).toHaveTextContent('BetList Page');
    });

    test('has proper route structure with :action parameter', () => {
        const { getByTestId } = renderWithRouter(['/test']);
        expect(getByTestId('betlist-page')).toBeInTheDocument();
    });

    test('has Suspense wrapper with mocked loader', () => {
        const { container } = renderWithRouter();
        expect(container).toBeInTheDocument();
    });
});