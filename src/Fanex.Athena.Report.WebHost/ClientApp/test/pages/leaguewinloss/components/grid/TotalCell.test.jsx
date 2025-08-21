import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { TotalCell } from '@/pages/leaguewinloss/components/grid/TotalCell';
import { ReportLevel } from '@/pages/leaguewinloss/common/constants';

jest.mock('@legion-lib/react-grid', () => ({
    Cell: ({ children, colSpan, className, style }) => (
        <div 
            data-testid="cell" 
            data-col-span={colSpan} 
            className={className}
            style={style}
        >
            {children}
        </div>
    ),
}));

describe('TotalCell Component', () => {
    let mockProps;

    const mockReportData = {
        data: [
            {
                sportType: 1,
                sportName: 'Football',
                isBreakdown: false,
            },
            {
                leagueId: 10,
                leagueName: 'Premier League',
                isBreakdown: true,
            },
            {
                matchId: 100,
                matchName: 'Team A vs Team B',
                isBreakdown: false,
            },
        ],
    };

    beforeEach(() => {
        mockProps = {
            reportData: mockReportData,
            setReportData: jest.fn(),
            toggleLoader: jest.fn(),
            setReloadReport: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('MAIN level (Sport)', () => {
        beforeEach(() => {
            mockProps.level = ReportLevel.MAIN;
            mockProps.rowData = {
                sportType: 1,
                sportName: 'Football',
                isBreakdown: false,
            };
        });

        test('renders sport name with correct text and arrow', () => {
            render(<TotalCell {...mockProps} />);
            
            expect(screen.getByTestId('cell')).toHaveAttribute('data-col-span', '3');
            expect(screen.getByTestId('cell')).toHaveClass('left-align');
            expect(screen.getByText('Football')).toBeInTheDocument();
            
            const arrow = screen.getByText('Football').parentElement.querySelector('i');
            expect(arrow).toHaveClass('icon-strong-arrow', 'left', 'arrow-right');
        });

        test('shows arrow-down when isBreakdown is true', () => {
            mockProps.rowData.isBreakdown = true;
            render(<TotalCell {...mockProps} />);
            
            const arrow = screen.getByText('Football').parentElement.querySelector('i');
            expect(arrow).toHaveClass('arrow-down');
            expect(arrow).not.toHaveClass('arrow-right');
        });

        test('handles breakdown toggle for sport', () => {
            render(<TotalCell {...mockProps} />);
            
            const arrow = screen.getByText('Football').parentElement.querySelector('i');
            fireEvent.click(arrow);
            
            expect(mockProps.setReloadReport).toHaveBeenCalledWith(false);
            expect(mockProps.setReportData).toHaveBeenCalled();
            expect(mockProps.toggleLoader).toHaveBeenCalledWith(false);
            
            const setReportDataCall = mockProps.setReportData.mock.calls[0][0];
            expect(setReportDataCall.dataList[0].isBreakdown).toBe(true);
        });

        test('returns early when item not found in data list', () => {
            mockProps.rowData.sportType = 999;
            render(<TotalCell {...mockProps} />);
            
            const arrow = screen.getByText('Football').parentElement.querySelector('i');
            fireEvent.click(arrow);
            
            expect(mockProps.setReportData).not.toHaveBeenCalled();
            expect(mockProps.toggleLoader).not.toHaveBeenCalled();
            expect(mockProps.setReloadReport).not.toHaveBeenCalled();
        });
    });

    describe('MATCH level (League)', () => {
        beforeEach(() => {
            mockProps.level = ReportLevel.MATCH;
            mockProps.rowData = {
                leagueId: 10,
                leagueName: 'Premier League',
                isBreakdown: true,
            };
        });

        test('renders league name with correct properties', () => {
            render(<TotalCell {...mockProps} />);
            
            expect(screen.getByText('Premier League')).toBeInTheDocument();
            
            const arrow = screen.getByText('Premier League').parentElement.querySelector('i');
            expect(arrow).toHaveClass('arrow-down');
        });

        test('handles breakdown toggle for league', () => {
            render(<TotalCell {...mockProps} />);
            
            const arrow = screen.getByText('Premier League').parentElement.querySelector('i');
            fireEvent.click(arrow);
            
            expect(mockProps.setReportData).toHaveBeenCalled();
            const setReportDataCall = mockProps.setReportData.mock.calls[0][0];
            expect(setReportDataCall.dataList[1].isBreakdown).toBe(false);
        });
    });

    describe('BETTYPE level (Match)', () => {
        beforeEach(() => {
            mockProps.level = ReportLevel.BETTYPE;
            mockProps.rowData = {
                matchId: 100,
                matchName: 'Team A vs Team B',
                isBreakdown: false,
            };
        });

        test('renders match name with correct properties', () => {
            render(<TotalCell {...mockProps} />);
            
            expect(screen.getByText('Team A vs Team B')).toBeInTheDocument();
            
            const arrow = screen.getByText('Team A vs Team B').parentElement.querySelector('i');
            expect(arrow).toHaveClass('arrow-right');
        });

        test('handles breakdown toggle for match', () => {
            render(<TotalCell {...mockProps} />);
            
            const arrow = screen.getByText('Team A vs Team B').parentElement.querySelector('i');
            fireEvent.click(arrow);
            
            expect(mockProps.setReportData).toHaveBeenCalled();
            const setReportDataCall = mockProps.setReportData.mock.calls[0][0];
            expect(setReportDataCall.dataList[2].isBreakdown).toBe(true);
        });
    });

    describe('Cell styling and structure', () => {
        beforeEach(() => {
            mockProps.level = ReportLevel.MAIN;
            mockProps.rowData = {
                sportType: 1,
                sportName: 'Football',
                isBreakdown: false,
            };
        });

        test('renders cell with correct attributes', () => {
            render(<TotalCell {...mockProps} />);
            
            const cell = screen.getByTestId('cell');
            expect(cell).toHaveAttribute('data-col-span', '3');
            expect(cell).toHaveClass('left-align');
            expect(cell).toHaveStyle({ whiteSpace: 'pre-wrap' });
        });

        test('renders arrow with correct click handler', () => {
            render(<TotalCell {...mockProps} />);
            
            const arrow = screen.getByText('Football').parentElement.querySelector('i');
            expect(arrow).toHaveClass('icon-strong-arrow', 'left', 'arrow-right');
            
            fireEvent.click(arrow);
            expect(mockProps.setReportData).toHaveBeenCalled();
        });
    });

    describe('Breakdown state management', () => {
        test('preserves other data when updating breakdown status', () => {
            const extendedReportData = {
                data: [
                    {
                        sportType: 1,
                        sportName: 'Football',
                        isBreakdown: false,
                        otherProperty: 'preserve this',
                    },
                ],
                totalRecords: 100,
                otherReportProperty: 'keep this too',
            };

            mockProps.reportData = extendedReportData;
            mockProps.level = ReportLevel.MAIN;
            mockProps.rowData = {
                sportType: 1,
                sportName: 'Football',
                isBreakdown: false,
            };

            render(<TotalCell {...mockProps} />);
            
            const arrow = screen.getByText('Football').parentElement.querySelector('i');
            fireEvent.click(arrow);
            
            const setReportDataCall = mockProps.setReportData.mock.calls[0][0];
            expect(setReportDataCall.totalRecords).toBe(100);
            expect(setReportDataCall.otherReportProperty).toBe('keep this too');
            expect(setReportDataCall.dataList[0].otherProperty).toBe('preserve this');
            expect(setReportDataCall.dataList[0].isBreakdown).toBe(true);
        });

        test('creates new array reference when updating data', () => {
            mockProps.level = ReportLevel.MAIN;
            mockProps.rowData = {
                sportType: 1,
                sportName: 'Football',
                isBreakdown: false,
            };

            render(<TotalCell {...mockProps} />);
            
            const arrow = screen.getByText('Football').parentElement.querySelector('i');
            fireEvent.click(arrow);
            
            const setReportDataCall = mockProps.setReportData.mock.calls[0][0];
            expect(setReportDataCall.dataList).not.toBe(mockReportData.data);
        });
    });

    describe('Edge cases', () => {
        test('handles undefined level gracefully', () => {
            mockProps.level = undefined;
            mockProps.rowData = {};

            const { container } = render(<TotalCell {...mockProps} />);
            expect(container.firstChild).not.toBeNull();
        });

        test('handles empty report data', () => {
            mockProps.reportData = { data: [] };
            mockProps.level = ReportLevel.MAIN;
            mockProps.rowData = {
                sportType: 1,
                sportName: 'Football',
                isBreakdown: false,
            };

            render(<TotalCell {...mockProps} />);
            
            const arrow = screen.getByText('Football').parentElement.querySelector('i');
            fireEvent.click(arrow);
            
            expect(mockProps.setReportData).not.toHaveBeenCalled();
        });

        test('handles null rowData properties', () => {
            mockProps.level = ReportLevel.MAIN;
            mockProps.rowData = {
                sportType: null,
                sportName: null,
                isBreakdown: false,
            };

            render(<TotalCell {...mockProps} />);
            expect(screen.getByTestId('cell')).toBeInTheDocument();
        });
    });
});
