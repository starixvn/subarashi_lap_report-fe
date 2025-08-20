import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SubsidiaryPerformanceRoute from '../../src/routes/SubsidiaryPerformanceRoute';

jest.mock('../../src/pages/subsidiaryperformance', () => ({ 
    __esModule: true, 
    default: () => <div data-testid="subsidiaryperformance-page">Subsidiary Performance Page</div> 
}));

describe('SubsidiaryPerformanceRoute', () => {
    const renderWithRouter = (initialEntries = ['/']) => {
        return render(
            <MemoryRouter 
                initialEntries={initialEntries}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            >
                <SubsidiaryPerformanceRoute />
            </MemoryRouter>
        );
    };

    test('renders without crashing', () => {
        const { container } = renderWithRouter();
        expect(container).toBeInTheDocument();
    });

    test('renders SubsidiaryPerformance component on index route', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('subsidiaryperformance-page')).toBeInTheDocument();
        expect(getByTestId('subsidiaryperformance-page')).toHaveTextContent('Subsidiary Performance Page');
    });

    test('handles empty route path', () => {
        const { getByTestId } = renderWithRouter(['']);
        expect(getByTestId('subsidiaryperformance-page')).toBeInTheDocument();
    });

    test('has correct component structure', () => {
        const { getByTestId } = renderWithRouter(['/']);
        expect(getByTestId('subsidiaryperformance-page')).toBeInTheDocument();
    });
});