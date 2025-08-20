import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WeeklyLiveMatchRoute from '../../src/routes/WeeklyLiveMatchRoute';

jest.mock('../../src/pages/weeklylivematch', () => ({ 
    __esModule: true, 
    default: () => <div data-testid="weeklylivematch-page">Weekly Live Match Page</div> 
}));

describe('WeeklyLiveMatchRoute', () => {
    const renderWithRouter = (initialEntries = ['/']) => {
        return render(
            <MemoryRouter 
                initialEntries={initialEntries}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            >
                <WeeklyLiveMatchRoute />
            </MemoryRouter>
        );
    };

    test('renders without crashing', () => {
        const { container } = renderWithRouter();
        expect(container).toBeInTheDocument();
    });

    test('renders WeeklyLiveMatch component on index route', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('weeklylivematch-page')).toBeInTheDocument();
        expect(getByTestId('weeklylivematch-page')).toHaveTextContent('Weekly Live Match Page');
    });

    test('handles empty route path', () => {
        const { getByTestId } = renderWithRouter(['']);
        expect(getByTestId('weeklylivematch-page')).toBeInTheDocument();
    });

    test('has correct component structure', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('weeklylivematch-page')).toBeInTheDocument();
    });
});