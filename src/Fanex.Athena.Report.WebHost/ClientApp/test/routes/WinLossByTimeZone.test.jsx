import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LicenseeWinLossByTimeZoneRoute from '../../src/routes/WinLossByTimeZone';

jest.mock('../../src/pages/winlossbytimezone', () => ({ 
    __esModule: true, 
    default: () => <div data-testid="winlossbytimezone-page">Licensee Win Loss By Time Zone Page</div> 
}));

describe('LicenseeWinLossByTimeZoneRoute', () => {
    const renderWithRouter = (initialEntries = ['/']) => {
        return render(
            <MemoryRouter initialEntries={initialEntries}>
                <LicenseeWinLossByTimeZoneRoute />
            </MemoryRouter>
        );
    };

    test('renders without crashing', () => {
        const { container } = renderWithRouter();
        expect(container).toBeInTheDocument();
    });

    test('renders WinLossByTimeZone component on index route', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('winlossbytimezone-page')).toBeInTheDocument();
        expect(getByTestId('winlossbytimezone-page')).toHaveTextContent('Licensee Win Loss By Time Zone Page');
    });

    test('handles empty route path', () => {
        const { getByTestId } = renderWithRouter(['']);
        expect(getByTestId('winlossbytimezone-page')).toBeInTheDocument();
    });

    test('has correct component structure', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('winlossbytimezone-page')).toBeInTheDocument();
    });
});