import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SettledMatchCountRoute from '../../src/routes/SettledMatchCountRoute';

jest.mock('../../src/pages/settledmatchcount', () => ({ 
    __esModule: true, 
    default: () => <div data-testid="settledmatchcount-page">Settled Match Count Page</div> 
}));

describe('SettledMatchCountRoute', () => {
    const renderWithRouter = (initialEntries = ['/']) => {
        return render(
            <MemoryRouter 
                initialEntries={initialEntries}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            >
                <SettledMatchCountRoute />
            </MemoryRouter>
        );
    };

    test('renders without crashing', () => {
        const { container } = renderWithRouter();
        expect(container).toBeInTheDocument();
    });

    test('renders SettledMatchCount component on index route', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('settledmatchcount-page')).toBeInTheDocument();
        expect(getByTestId('settledmatchcount-page')).toHaveTextContent('Settled Match Count Page');
    });

    test('handles empty route path', () => {
        const { getByTestId } = renderWithRouter(['']);
        expect(getByTestId('settledmatchcount-page')).toBeInTheDocument();
    });

    test('has correct component structure', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('settledmatchcount-page')).toBeInTheDocument();
    });
});