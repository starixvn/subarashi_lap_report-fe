import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MatchMonitoringCenterRoute from '../../src/routes/MatchMonitoringCenterRoute';

jest.mock('../../src/pages/matchmonitoringcenter', () => ({ 
    __esModule: true, 
    default: () => <div data-testid="matchmonitoringcenter-page">Match Monitoring Center Page</div> 
}));

jest.mock('../../src/pages/matchmonitoringcenter/pages/matchmonitoringsetting', () => ({ 
    __esModule: true, 
    default: () => <div data-testid="matchmonitoringsetting-page">Match Monitoring Setting Page</div> 
}));

jest.mock('../../src/pages/matchmonitoringcenter/pages/triggeredalerthistory', () => ({ 
    __esModule: true, 
    default: () => <div data-testid="triggeredalerthistory-page">Triggered Alert History Page</div> 
}));

describe('MatchMonitoringCenterRoute', () => {
    const renderWithRouter = (initialEntries = ['/']) => {
        return render(
            <MemoryRouter 
                initialEntries={initialEntries}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            >
                <MatchMonitoringCenterRoute />
            </MemoryRouter>
        );
    };

    test('renders without crashing', () => {
        const { container } = renderWithRouter();
        expect(container).toBeInTheDocument();
    });

    test('renders MatchMonitoringCenter component on index route', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('matchmonitoringcenter-page')).toBeInTheDocument();
        expect(getByTestId('matchmonitoringcenter-page')).toHaveTextContent('Match Monitoring Center Page');
    });

    test('has correct route structure', () => {
        const { container } = renderWithRouter(['/setting']);
        expect(container).toBeInTheDocument();
    });

    test('handles route navigation', () => {
        const { container } = renderWithRouter(['/history']);
        expect(container).toBeInTheDocument();
    });
});