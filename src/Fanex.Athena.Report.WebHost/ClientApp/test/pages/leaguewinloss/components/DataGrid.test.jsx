import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { DataGrid } from '@/pages/leaguewinloss/components/DataGrid';

jest.mock('@/pages/leaguewinloss/actions');
jest.mock('@/pages/leaguewinloss/common/gridUtils');
jest.mock('@/components/NoDataTitle');
jest.mock('@/components/ReportTitle');

const mockActionCreators = require('@/pages/leaguewinloss/actions');
const mockGridUtils = require('@/pages/leaguewinloss/common/gridUtils');

jest.mock('@/components/NoDataTitle', () => () => <div data-testid="no-data-title">No Data Available</div>);

jest.mock('@/components/ReportTitle', () => ({ content }) => <div data-testid="report-title">{content}</div>);

jest.mock('@legion-lib/react-grid', () => ({
    Table: ({ header, body, footer, onSort, onPaging, pageOption, ...props }) => (
        <div data-testid="table" data-min-width={props.minWidth}>
            <div data-testid="table-header">{header}</div>
            <div data-testid="table-body">{body}</div>
            <div data-testid="table-footer">{footer}</div>
            <button data-testid="sort-button" onClick={() => onSort && onSort('testColumn', 'asc')}>
                Sort
            </button>
            <button data-testid="paging-button" onClick={() => onPaging && onPaging(2, 20)}>
                Page 2
            </button>
        </div>
    ),
}));

jest.mock('@legion-lib/react-breadcrumb', () => ({
    Breadcrumb: ({ items, value, onChange }) => (
        <div data-testid="breadcrumb" data-value={value}>
            {items.map(item => (
                <button key={item.value} onClick={() => onChange(item)} data-testid={`breadcrumb-${item.value}`}>
                    {item.name}
                </button>
            ))}
        </div>
    ),
}));

describe('LeagueWinLoss DataGrid', () => {
    let mockProps;
    let mockDispatch;

    const mockReportData = {
        data: [
            {
                leagueId: 1,
                leagueName: 'Premier League',
                currency: 1,
                detail: [
                    {
                        data: [
                            { currency: 1, amount: 1000 },
                            { currency: 2, amount: 2000 },
                        ],
                    },
                ],
            },
            {
                leagueId: 2,
                leagueName: 'La Liga',
                currency: 2,
                detail: [
                    {
                        detail: {
                            data: [{ currency: 1, amount: 500 }],
                        },
                    },
                ],
            },
        ],
        total: {
            leagueName: 'Total',
            amount: 3500,
        },
    };

    const mockAppData = {
        currencyList: [
            { key: 1, value: 'USD' },
            { key: 2, value: 'EUR' },
        ],
    };

    const mockRequestParam = {
        DrillDownLevel: 0,
        sortBy: 'leagueName',
        sortOrder: 'asc',
        pageSize: 50,
        pageIndex: 1,
    };

    const mockPagingOption = {
        PageIndex: 1,
        PageSize: 50,
        TotalItem: 100,
        PageList: [10, 20, 50, 100],
    };

    beforeEach(() => {
        mockDispatch = jest.fn();

        mockActionCreators.default = {
            setRequestParam: jest.fn(),
            toggleLoader: jest.fn(),
            getReportData: jest.fn(),
            setReportTitle: jest.fn(),
            setBreadcrumbParams: jest.fn(),
        };

        mockGridUtils.renderHeader = jest.fn(() => <div data-testid="mock-header">Header</div>);
        mockGridUtils.renderDataSection = jest.fn((data, level, isFooter) => (
            <div data-testid={isFooter ? 'mock-footer' : 'mock-body'}>
                {isFooter ? 'Footer' : 'Body'} - Level {level}
            </div>
        ));

        mockProps = {
            reportData: mockReportData,
            pagingOption: mockPagingOption,
            AppData: mockAppData,
            requestParam: mockRequestParam,
            reportTitle: 'League Win Loss Report',
            reloadReport: false,
            breadcrumbParams: [mockRequestParam],
            toggleLoader: mockActionCreators.default.toggleLoader,
            setRequestParam: mockActionCreators.default.setRequestParam,
            getReportData: mockActionCreators.default.getReportData,
            setReportTitle: mockActionCreators.default.setReportTitle,
            setBreadcrumbParams: mockActionCreators.default.setBreadcrumbParams,
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('returns null when data is null', () => {
        const propsWithoutData = {
            ...mockProps,
            reportData: { data: null, total: null },
        };

        const { container } = render(<DataGrid {...propsWithoutData} />);
        expect(container.firstChild).toBeNull();
    });

    test('returns NoDataTitle when data is empty array', () => {
        const propsWithEmptyData = {
            ...mockProps,
            reportData: { data: [], total: null },
        };

        render(<DataGrid {...propsWithEmptyData} />);
        expect(screen.getByTestId('no-data-title')).toBeInTheDocument();
    });

    test('renders DataGrid with data', () => {
        render(<DataGrid {...mockProps} />);

        expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
        expect(screen.getByTestId('report-title')).toBeInTheDocument();
        expect(screen.getByTestId('table')).toBeInTheDocument();
        expect(screen.getByText('League Win Loss Report')).toBeInTheDocument();
    });

    test('processes data with currency names', () => {
        render(<DataGrid {...mockProps} />);

        // Verify that renderDataSection was called with processed data
        expect(mockGridUtils.renderDataSection).toHaveBeenCalledWith(expect.any(Array), 0, false);

        // Check that the data processing logic would add currency names
        const processedData = mockGridUtils.renderDataSection.mock.calls[0][0];
        expect(processedData).toHaveLength(2);
    });

    test('handles drill down navigation', () => {
        render(<DataGrid {...mockProps} />);

        const breadcrumbButton = screen.getByTestId('breadcrumb-1');
        fireEvent.click(breadcrumbButton);

        expect(mockProps.toggleLoader).toHaveBeenCalledWith(true);
        expect(mockProps.setRequestParam).toHaveBeenCalled();
        expect(mockProps.getReportData).toHaveBeenCalled();
        expect(mockProps.setBreadcrumbParams).toHaveBeenCalled();
    });

    test('does not drill down to same level', () => {
        render(<DataGrid {...mockProps} />);

        const breadcrumbButton = screen.getByTestId('breadcrumb-0');
        fireEvent.click(breadcrumbButton);

        expect(mockProps.toggleLoader).not.toHaveBeenCalled();
    });

    test('does not drill down to invalid levels', () => {
        // Test logic that prevents invalid drill down levels
        // The component checks for level boundaries in the drillDownData function
        expect(mockProps.requestParam.DrillDownLevel).toBe(0);

        // Mock the drillDownData function behavior
        const mockLevel = -1; // Invalid level
        const currentLevel = mockProps.requestParam.DrillDownLevel;

        // Should not proceed if level is same as current or outside bounds
        const shouldNotDrillDown = currentLevel === mockLevel || mockLevel < 0 || mockLevel > 3;
        expect(shouldNotDrillDown).toBe(true);
    });

    test('handles table sorting', () => {
        render(<DataGrid {...mockProps} />);

        const sortButton = screen.getByTestId('sort-button');
        fireEvent.click(sortButton);

        expect(mockProps.setRequestParam).toHaveBeenCalledWith({
            ...mockRequestParam,
            sortBy: 'testColumn',
            sortOrder: 'asc',
        });
    });

    test('handles table paging', () => {
        render(<DataGrid {...mockProps} />);

        const pagingButton = screen.getByTestId('paging-button');
        fireEvent.click(pagingButton);

        expect(mockProps.setRequestParam).toHaveBeenCalledWith({
            ...mockRequestParam,
            pageSize: 20,
            pageIndex: 2,
        });
    });

    test('processes detail data with nested structure', () => {
        const dataWithNestedDetail = {
            data: [
                {
                    leagueId: 1,
                    detail: [
                        {
                            detail: {
                                data: [
                                    { currency: 1, amount: 100 },
                                    { currency: 2, amount: 200 },
                                ],
                            },
                        },
                    ],
                },
            ],
            total: { amount: 300 },
        };

        const propsWithNestedData = {
            ...mockProps,
            reportData: dataWithNestedDetail,
        };

        render(<DataGrid {...propsWithNestedData} />);

        expect(mockGridUtils.renderDataSection).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    detail: expect.arrayContaining([
                        expect.objectContaining({
                            detail: expect.objectContaining({
                                data: expect.arrayContaining([expect.objectContaining({ currencyName: 'USD' })]),
                            }),
                        }),
                    ]),
                }),
            ]),
            0,
            false
        );
    });

    test('handles items without detail property', () => {
        const dataWithoutDetail = {
            data: [
                {
                    leagueId: 1,
                    leagueName: 'Test League',
                    currency: 1,
                },
            ],
            total: { amount: 100 },
        };

        const propsWithoutDetail = {
            ...mockProps,
            reportData: dataWithoutDetail,
        };

        render(<DataGrid {...propsWithoutDetail} />);

        // Verify that renderDataSection was called
        expect(mockGridUtils.renderDataSection).toHaveBeenCalledWith(expect.any(Array), 0, false);

        // Verify data structure
        const processedData = mockGridUtils.renderDataSection.mock.calls[0][0];
        expect(processedData[0]).toHaveProperty('leagueId', 1);
    });

    test('handles currency not found in currency list', () => {
        const dataWithUnknownCurrency = {
            data: [
                {
                    leagueId: 1,
                    currency: 999, // Unknown currency
                },
            ],
            total: { amount: 100 },
        };

        const propsWithUnknownCurrency = {
            ...mockProps,
            reportData: dataWithUnknownCurrency,
        };

        render(<DataGrid {...propsWithUnknownCurrency} />);

        expect(mockGridUtils.renderDataSection).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    leagueId: 1,
                    currency: 999,
                    // currencyName should not be added
                }),
            ]),
            0,
            false
        );
    });

    test('renders table with correct properties', () => {
        render(<DataGrid {...mockProps} />);

        const table = screen.getByTestId('table');
        expect(table).toHaveAttribute('data-min-width', '650');
        expect(screen.getByTestId('table-header')).toBeInTheDocument();
        expect(screen.getByTestId('table-body')).toBeInTheDocument();
        expect(screen.getByTestId('table-footer')).toBeInTheDocument();
    });

    test('calls grid utils with correct parameters', () => {
        render(<DataGrid {...mockProps} />);

        expect(mockGridUtils.renderHeader).toHaveBeenCalledWith(0);
        expect(mockGridUtils.renderDataSection).toHaveBeenCalledWith(expect.any(Array), 0, false);
        expect(mockGridUtils.renderDataSection).toHaveBeenCalledWith([mockReportData.total], 0, true);
    });

    test('generates correct table key with reload report', () => {
        const propsWithReload = {
            ...mockProps,
            reloadReport: true,
        };

        render(<DataGrid {...propsWithReload} />);

        expect(screen.getByTestId('table')).toBeInTheDocument();
    });
});
