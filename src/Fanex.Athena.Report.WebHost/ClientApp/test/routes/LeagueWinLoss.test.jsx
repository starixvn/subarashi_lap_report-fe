import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LeagueWinLossRoute from '../../src/routes/LeagueWinLossRoute';

jest.mock('../../src/pages/leaguewinloss', () => ({ 
    __esModule: true, 
    default: () => <div data-testid="leaguewinloss-page">League Win Loss Page</div> 
}));

describe('LeagueWinLossRoute', () => {
    const renderWithRouter = (initialEntries = ['/']) => {
        return render(
            <MemoryRouter 
                initialEntries={initialEntries}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            >
                <LeagueWinLossRoute />
            </MemoryRouter>
        );
    };

    test('renders without crashing', () => {
        const { container } = renderWithRouter();
        expect(container).toBeInTheDocument();
    });

    test('renders LeagueWinLoss component on index route', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('leaguewinloss-page')).toBeInTheDocument();
        expect(getByTestId('leaguewinloss-page')).toHaveTextContent('League Win Loss Page');
    });

    test('handles empty route path', () => {
        const { getByTestId } = renderWithRouter(['']);
        expect(getByTestId('leaguewinloss-page')).toBeInTheDocument();
    });

    test('has correct component structure', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('leaguewinloss-page')).toBeInTheDocument();
    });
});