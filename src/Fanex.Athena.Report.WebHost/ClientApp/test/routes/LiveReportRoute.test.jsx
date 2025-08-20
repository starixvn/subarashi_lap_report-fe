import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LiveReportRoute from '../../src/routes/LiveReportRoute';

jest.mock('../../src/pages/livereport/summary', () => ({ 
    __esModule: true, 
    default: () => <div data-testid="livereport-summary-page">Live Report Summary Page</div> 
}));

jest.mock('../../src/pages/livereport/matchlist', () => ({ 
    __esModule: true, 
    default: () => <div data-testid="livereport-matchlist-page">Live Report Match List Page</div> 
}));

describe('LiveReportRoute', () => {
    const renderWithRouter = (initialEntries = ['/']) => {
        return render(
            <MemoryRouter 
                initialEntries={initialEntries}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            >
                <LiveReportRoute />
            </MemoryRouter>
        );
    };

    test('renders without crashing', () => {
        const { container } = renderWithRouter();
        expect(container).toBeInTheDocument();
    });

    test('renders Summary component on index route', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('livereport-summary-page')).toBeInTheDocument();
        expect(getByTestId('livereport-summary-page')).toHaveTextContent('Live Report Summary Page');
    });

    test('has correct route structure for MatchList', () => {
        const { container } = renderWithRouter(['/MatchList']);
        expect(container).toBeInTheDocument();
    });

    test('renders MatchList component on /MatchList route', () => {
        const { getByTestId } = renderWithRouter(['/MatchList']);
        expect(getByTestId('livereport-matchlist-page')).toBeInTheDocument();
        expect(getByTestId('livereport-matchlist-page')).toHaveTextContent('Live Report Match List Page');
    });
});