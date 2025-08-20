import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WinLossAnalysisRoute from '../../src/routes/WinLossAnalysis';

jest.mock('../../src/pages/winlossanalysis', () => ({ 
    __esModule: true, 
    default: () => <div data-testid="winlossanalysis-page">Win Loss Analysis Page</div> 
}));

describe('WinLossAnalysisRoute', () => {
    const renderWithRouter = (initialEntries = ['/']) => {
        return render(
            <MemoryRouter 
                initialEntries={initialEntries}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            >
                <WinLossAnalysisRoute />
            </MemoryRouter>
        );
    };

    test('renders without crashing', () => {
        const { container } = renderWithRouter();
        expect(container).toBeInTheDocument();
    });

    test('renders WinLossAnalysis component on index route', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('winlossanalysis-page')).toBeInTheDocument();
        expect(getByTestId('winlossanalysis-page')).toHaveTextContent('Win Loss Analysis Page');
    });

    test('handles empty route path', () => {
        const { getByTestId } = renderWithRouter(['']);
        expect(getByTestId('winlossanalysis-page')).toBeInTheDocument();
    });

    test('has correct component structure', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('winlossanalysis-page')).toBeInTheDocument();
    });
});