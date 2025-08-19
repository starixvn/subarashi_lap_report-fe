import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CustomerSupportTasksRoute from '../../src/routes/CustomerSupportTasksRoute';

jest.mock('../../src/pages/customersupporttask', () => ({ 
    __esModule: true, 
    default: () => <div data-testid="customersupporttask-page">Customer Support Task Page</div> 
}));

describe('CustomerSupportTasksRoute', () => {
    const renderWithRouter = (initialEntries = ['/']) => {
        return render(
            <MemoryRouter initialEntries={initialEntries}>
                <CustomerSupportTasksRoute />
            </MemoryRouter>
        );
    };

    test('renders without crashing', () => {
        const { container } = renderWithRouter();
        expect(container).toBeInTheDocument();
    });

    test('renders CustomerSupportTask component on index route', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('customersupporttask-page')).toBeInTheDocument();
        expect(getByTestId('customersupporttask-page')).toHaveTextContent('Customer Support Task Page');
    });

    test('handles empty route path', () => {
        const { getByTestId } = renderWithRouter(['']);
        expect(getByTestId('customersupporttask-page')).toBeInTheDocument();
    });

    test('has correct component structure', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('customersupporttask-page')).toBeInTheDocument();
    });
});