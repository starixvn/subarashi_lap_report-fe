import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TurnoverRoute from '../../src/routes/TurnoverRoute';

jest.mock('../../src/pages/turnover', () => ({ 
    __esModule: true, 
    default: () => <div data-testid="turnover-page">Turnover Page</div> 
}));

describe('TurnoverRoute', () => {
    const renderWithRouter = (initialEntries = ['/']) => {
        return render(
            <MemoryRouter initialEntries={initialEntries}>
                <TurnoverRoute />
            </MemoryRouter>
        );
    };

    test('renders without crashing', () => {
        const { container } = renderWithRouter();
        expect(container).toBeInTheDocument();
    });

    test('renders Turnover component on index route', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('turnover-page')).toBeInTheDocument();
        expect(getByTestId('turnover-page')).toHaveTextContent('Turnover Page');
    });

    test('handles empty route path', () => {
        const { getByTestId } = renderWithRouter(['']);
        expect(getByTestId('turnover-page')).toBeInTheDocument();
    });

    test('has correct component structure', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('turnover-page')).toBeInTheDocument();
    });
});