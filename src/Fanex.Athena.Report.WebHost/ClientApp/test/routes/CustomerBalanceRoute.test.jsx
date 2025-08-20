import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CustomerBalanceRoute from '../../src/routes/CustomerBalanceRoute';

jest.mock('../../src/pages/customerbalance', () => ({ 
    __esModule: true, 
    default: () => <div data-testid="customerbalance-page">Customer Balance Page</div> 
}));

describe('CustomerBalanceRoute', () => {
    const renderWithRouter = (initialEntries = ['/']) => {
        return render(
            <MemoryRouter 
                initialEntries={initialEntries}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            >
                <CustomerBalanceRoute />
            </MemoryRouter>
        );
    };

    test('renders without crashing', () => {
        const { container } = renderWithRouter();
        expect(container).toBeInTheDocument();
    });

    test('renders CustomerBalance component on index route', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('customerbalance-page')).toBeInTheDocument();
        expect(getByTestId('customerbalance-page')).toHaveTextContent('Customer Balance Page');
    });

    test('handles empty route path', () => {
        const { getByTestId } = renderWithRouter(['']);
        expect(getByTestId('customerbalance-page')).toBeInTheDocument();
    });

    test('has correct component structure', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('customerbalance-page')).toBeInTheDocument();
    });
});