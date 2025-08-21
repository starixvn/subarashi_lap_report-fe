import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

// Mock dependencies will be set up with doMock below

// Then import the component lazily after mocks are set
let DataGrid;

jest.mock('@legion-lib/react-grid', () => ({
    Table: ({ header, body, footer, minWidth, autoWidth, bodyHeight }) => (
        <div data-testid="table" data-min-width={minWidth} data-auto-width={autoWidth} data-body-height={bodyHeight}>
            <div data-testid="table-header">{header}</div>
            <div data-testid="table-body">{body}</div>
            <div data-testid="table-footer">{footer}</div>
        </div>
    ),
}));

jest.mock('@/components/NoDataTitle', () => ({ __esModule: true, default: () => <div data-testid="no-data-title">No Data Available</div> }));

jest.mock('@/components/ReportTitle', () => ({ __esModule: true, default: ({ content }) => <div data-testid="report-title">{content}</div> }));

// Avoid resetting modules so mocks above remain effective

const mockService = {
    getReportTitle: jest.fn(() => 'Mock Report Title'),
};

jest.mock('@/pages/winlossbytimezone/lib/service', () => ({
    __esModule: true,
    default: mockService,
}));

const mockBuildHeader = jest.fn(() => <div data-testid="mock-header">Mock Header</div>);
const mockBuildBody = jest.fn(() => <div data-testid="mock-body">Mock Body</div>);
const mockBuildFooter = jest.fn(() => <div data-testid="mock-footer">Mock Footer</div>);

jest.mock('@/pages/winlossbytimezone/gridBuilder', () => ({
    __esModule: true,
    BuildHeader: mockBuildHeader,
    BuildBody: mockBuildBody,
    BuildFooter: mockBuildFooter,
}));

jest.mock('@/pages/winlossbytimezone/constants', () => ({
    __esModule: true,
    TimeZones: [
        { value: 'UTC+0', label: 'UTC' },
        { value: 'UTC+8', label: 'GMT+8' },
        { value: 'UTC-5', label: 'GMT-5' },
    ],
}));

describe('WinLossByTimezone DataGrid', () => {
    let mockUseSelector;

    const mockRequestParam = {
        FromDate: '2023-01-01',
        ToDate: '2023-12-31',
        BaseCurrency: 'USD',
        CurrencyName: 'USD',
        IsConvertAll: false,
        ReportBy: 'daily',
        GroupBy: 'timezone',
        TimeZone: 'UTC+8',
    };

    const mockGridData = {
        data: [
            { timezone: 'GMT+8', amount: 1000 },
            { timezone: 'GMT+0', amount: 2000 },
        ],
        total: { totalAmount: 3000 },
    };

    beforeEach(() => {
        DataGrid = require('@/pages/winlossbytimezone/components/Datagrid').default;
        mockUseSelector = useSelector;
        jest.clearAllMocks();
        mockService.getReportTitle.mockReturnValue('Mock Report Title');
        mockBuildHeader.mockReturnValue(<div data-testid="mock-header">Mock Header</div>);
        mockBuildBody.mockReturnValue(<div data-testid="mock-body">Mock Body</div>);
        mockBuildFooter.mockReturnValue(<div data-testid="mock-footer">Mock Footer</div>);
    });

    test('returns null when gridData is null', () => {
        mockUseSelector
            .mockReturnValueOnce(null) // gridData
            .mockReturnValueOnce(mockRequestParam); // requestParam

        const { container } = render(<DataGrid />);
        expect(container.firstChild).toBeNull();
    });

    test('returns null when gridData is undefined', () => {
        mockUseSelector
            .mockReturnValueOnce(undefined) // gridData
            .mockReturnValueOnce(mockRequestParam); // requestParam

        const { container } = render(<DataGrid />);
        expect(container.firstChild).toBeNull();
    });

    test('renders NoDataTitle when gridData.data is empty', () => {
        const emptyGridData = { data: [], total: null };

        mockUseSelector
            .mockReturnValueOnce(emptyGridData) // gridData
            .mockReturnValueOnce(mockRequestParam); // requestParam

        render(<DataGrid />);

        expect(screen.getByTestId('no-data-title')).toBeInTheDocument();
        expect(screen.getByTestId('report-title')).toBeInTheDocument();
        expect(screen.queryByTestId('table')).not.toBeInTheDocument();
    });

    test('renders NoDataTitle when gridData.data is null', () => {
        const nullDataGridData = { data: null, total: null };

        mockUseSelector
            .mockReturnValueOnce(nullDataGridData) // gridData
            .mockReturnValueOnce(mockRequestParam); // requestParam

        render(<DataGrid />);

        expect(screen.getByTestId('no-data-title')).toBeInTheDocument();
        expect(screen.getByTestId('report-title')).toBeInTheDocument();
        expect(screen.queryByTestId('table')).not.toBeInTheDocument();
    });

    test('renders DataGrid with data', () => {
        mockUseSelector
            .mockReturnValueOnce(mockGridData) // gridData
            .mockReturnValueOnce(mockRequestParam); // requestParam

        render(<DataGrid />);

        expect(screen.getByTestId('report-title')).toBeInTheDocument();
        expect(screen.getByTestId('table')).toBeInTheDocument();
        expect(screen.getByTestId('mock-header')).toBeInTheDocument();
        expect(screen.getByTestId('mock-body')).toBeInTheDocument();
        expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    });

    test('calls Service.getReportTitle with correct parameters', () => {
        const mockService = require('@/pages/winlossbytimezone/lib/service').default;

        mockUseSelector
            .mockReturnValueOnce(mockGridData) // gridData
            .mockReturnValueOnce(mockRequestParam); // requestParam

        render(<DataGrid />);

        expect(mockService.getReportTitle).toHaveBeenCalledWith(
            'GMT+8', // selectedTimezone
            '2023-01-01', // FromDate
            '2023-12-31', // ToDate
            'USD', // CurrencyName
            'USD', // BaseCurrency
            false // IsConvertAll
        );
    });

    test('finds correct timezone label from TimeZones', () => {
        const mockService = require('@/pages/winlossbytimezone/lib/service').default;

        mockUseSelector
            .mockReturnValueOnce(mockGridData) // gridData
            .mockReturnValueOnce(mockRequestParam); // requestParam

        render(<DataGrid />);

        expect(mockService.getReportTitle).toHaveBeenCalledWith(
            'GMT+8',
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(Boolean)
        );
    });

    test('handles unknown timezone gracefully', () => {
        const mockService = require('@/pages/winlossbytimezone/lib/service').default;
        const unknownTimezoneRequestParam = {
            ...mockRequestParam,
            TimeZone: 'UNKNOWN_TZ',
        };

        mockUseSelector
            .mockReturnValueOnce(mockGridData) // gridData
            .mockReturnValueOnce(unknownTimezoneRequestParam); // requestParam

        render(<DataGrid />);

        expect(mockService.getReportTitle).toHaveBeenCalledWith(
            undefined, // selectedTimezone (not found)
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(Boolean)
        );
    });

    test('calls BuildHeader with correct options', () => {
        const mockBuildHeader = require('@/pages/winlossbytimezone/gridBuilder').BuildHeader;

        mockUseSelector
            .mockReturnValueOnce(mockGridData) // gridData
            .mockReturnValueOnce(mockRequestParam); // requestParam

        render(<DataGrid />);

        expect(mockBuildHeader).toHaveBeenCalledWith({
            reportBy: 'daily',
            groupBy: 'timezone',
        });
    });

    test('calls BuildBody with correct parameters', () => {
        const mockBuildBody = require('@/pages/winlossbytimezone/gridBuilder').BuildBody;

        mockUseSelector
            .mockReturnValueOnce(mockGridData) // gridData
            .mockReturnValueOnce(mockRequestParam); // requestParam

        render(<DataGrid />);

        expect(mockBuildBody).toHaveBeenCalledWith(mockGridData.data, {
            reportBy: 'daily',
            groupBy: 'timezone',
        });
    });

    test('calls BuildFooter with correct parameters', () => {
        const mockBuildFooter = require('@/pages/winlossbytimezone/gridBuilder').BuildFooter;

        mockUseSelector
            .mockReturnValueOnce(mockGridData) // gridData
            .mockReturnValueOnce(mockRequestParam); // requestParam

        render(<DataGrid />);

        expect(mockBuildFooter).toHaveBeenCalledWith(mockGridData.total, {
            reportBy: 'daily',
            baseCurrency: 'USD',
        });
    });

    test('renders Table with correct props', () => {
        mockUseSelector
            .mockReturnValueOnce(mockGridData) // gridData
            .mockReturnValueOnce(mockRequestParam); // requestParam

        render(<DataGrid />);

        const table = screen.getByTestId('table');
        expect(table).toHaveAttribute('data-min-width', '600');
        expect(table).toHaveAttribute('data-auto-width', 'true');
        expect(table).toHaveAttribute('data-body-height', '300');
    });

    test('renders result-content wrapper', () => {
        mockUseSelector
            .mockReturnValueOnce(mockGridData) // gridData
            .mockReturnValueOnce(mockRequestParam); // requestParam

        const { container } = render(<DataGrid />);

        expect(container.querySelector('.result-content')).toBeInTheDocument();
    });

    test('handles IsConvertAll true parameter', () => {
        const mockService = require('@/pages/winlossbytimezone/lib/service').default;
        const convertAllRequestParam = {
            ...mockRequestParam,
            IsConvertAll: true,
        };

        mockUseSelector
            .mockReturnValueOnce(mockGridData) // gridData
            .mockReturnValueOnce(convertAllRequestParam); // requestParam

        render(<DataGrid />);

        expect(mockService.getReportTitle).toHaveBeenCalledWith('GMT+8', '2023-01-01', '2023-12-31', 'USD', 'USD', true);
    });

    test('handles missing requestParam properties gracefully', () => {
        const incompleteRequestParam = {
            TimeZone: 'UTC+0',
        };

        mockUseSelector
            .mockReturnValueOnce(mockGridData) // gridData
            .mockReturnValueOnce(incompleteRequestParam); // requestParam

        expect(() => render(<DataGrid />)).not.toThrow();
    });

    test('handles gridData with missing total', () => {
        const mockBuildFooter = require('@/pages/winlossbytimezone/gridBuilder').BuildFooter;
        const gridDataWithoutTotal = {
            data: [{ timezone: 'GMT+8', amount: 1000 }],
            // no total property
        };

        mockUseSelector
            .mockReturnValueOnce(gridDataWithoutTotal) // gridData
            .mockReturnValueOnce(mockRequestParam); // requestParam

        render(<DataGrid />);

        expect(mockBuildFooter).toHaveBeenCalledWith(undefined, {
            reportBy: 'daily',
            baseCurrency: 'USD',
        });
    });

    test('renders correctly when data array has length but is not empty', () => {
        mockUseSelector
            .mockReturnValueOnce(mockGridData) // gridData
            .mockReturnValueOnce(mockRequestParam); // requestParam

        render(<DataGrid />);

        expect(screen.getByTestId('table')).toBeInTheDocument();
        expect(screen.queryByTestId('no-data-title')).not.toBeInTheDocument();
    });

    test('selector calls are made in correct order', () => {
        const mockSelector = jest
            .fn()
            .mockReturnValueOnce(mockGridData) // gridData
            .mockReturnValueOnce(mockRequestParam); // requestParam

        useSelector.mockImplementation(mockSelector);

        render(<DataGrid />);

        expect(mockSelector).toHaveBeenCalledTimes(2);
        expect(mockSelector.mock.calls[0][0]).toEqual(expect.any(Function));
        expect(mockSelector.mock.calls[1][0]).toEqual(expect.any(Function));
    });

    test('handles different ReportBy and GroupBy combinations', () => {
        const mockBuildHeader = require('@/pages/winlossbytimezone/gridBuilder').BuildHeader;
        const mockBuildBody = require('@/pages/winlossbytimezone/gridBuilder').BuildBody;

        const differentRequestParam = {
            ...mockRequestParam,
            ReportBy: 'weekly',
            GroupBy: 'product',
        };

        mockUseSelector
            .mockReturnValueOnce(mockGridData) // gridData
            .mockReturnValueOnce(differentRequestParam); // requestParam

        render(<DataGrid />);

        expect(mockBuildHeader).toHaveBeenCalledWith({
            reportBy: 'weekly',
            groupBy: 'product',
        });

        expect(mockBuildBody).toHaveBeenCalledWith(mockGridData.data, {
            reportBy: 'weekly',
            groupBy: 'product',
        });
    });
});
