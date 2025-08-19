import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExtraPayoutRoute from '../../src/routes/ExtraPayoutRoute';

jest.mock('../../src/pages/extrapayout', () => ({ 
    __esModule: true, 
    default: () => <div data-testid="extrapayout-page">Extra Payout Page</div> 
}));

describe('ExtraPayoutRoute', () => {
    const renderWithRouter = (initialEntries = ['/']) => {
        return render(
            <MemoryRouter initialEntries={initialEntries}>
                <ExtraPayoutRoute />
            </MemoryRouter>
        );
    };

    test('renders without crashing', () => {
        const { container } = renderWithRouter();
        expect(container).toBeInTheDocument();
    });

    test('renders ExtraPayout component on index route', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('extrapayout-page')).toBeInTheDocument();
        expect(getByTestId('extrapayout-page')).toHaveTextContent('Extra Payout Page');
    });

    test('handles empty route path', () => {
        const { getByTestId } = renderWithRouter(['']);
        expect(getByTestId('extrapayout-page')).toBeInTheDocument();
    });

    test('has correct component structure', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('extrapayout-page')).toBeInTheDocument();
    });
});