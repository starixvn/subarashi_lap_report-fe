import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MatchWinLossRoute from '../../src/routes/MatchWinLossRoute';

jest.mock('../../src/pages/matchwinloss', () => ({ 
    __esModule: true, 
    default: () => <div data-testid="matchwinloss-page">Match Win Loss Page</div> 
}));

describe('MatchWinLossRoute', () => {
    const renderWithRouter = (initialEntries = ['/']) => {
        return render(
            <MemoryRouter initialEntries={initialEntries}>
                <MatchWinLossRoute />
            </MemoryRouter>
        );
    };

    test('renders without crashing', () => {
        const { container } = renderWithRouter();
        expect(container).toBeInTheDocument();
    });

    test('renders MatchWinLoss component on index route', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('matchwinloss-page')).toBeInTheDocument();
        expect(getByTestId('matchwinloss-page')).toHaveTextContent('Match Win Loss Page');
    });

    test('handles empty route path', () => {
        const { getByTestId } = renderWithRouter(['']);
        expect(getByTestId('matchwinloss-page')).toBeInTheDocument();
    });

    test('has correct component structure', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('matchwinloss-page')).toBeInTheDocument();
    });
});