import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CustomerTurnoverRoute from '../../src/routes/CustomerTurnoverRoute';

jest.mock('../../src/pages/customerturnover', () => ({ 
    __esModule: true, 
    default: () => <div data-testid="customerturnover-page">Customer Turnover Page</div> 
}));

describe('CustomerTurnoverRoute', () => {
    const renderWithRouter = (initialEntries = ['/']) => {
        return render(
            <MemoryRouter initialEntries={initialEntries}>
                <CustomerTurnoverRoute />
            </MemoryRouter>
        );
    };

    test('renders without crashing', () => {
        const { container } = renderWithRouter();
        expect(container).toBeInTheDocument();
    });

    test('renders CustomerTurnover component on index route', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('customerturnover-page')).toBeInTheDocument();
        expect(getByTestId('customerturnover-page')).toHaveTextContent('Customer Turnover Page');
    });

    test('handles empty route path', () => {
        const { getByTestId } = renderWithRouter(['']);
        expect(getByTestId('customerturnover-page')).toBeInTheDocument();
    });

    test('has correct component structure', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('customerturnover-page')).toBeInTheDocument();
    });
});