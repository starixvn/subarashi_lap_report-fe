import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import DataGrid from '@/pages/subsidiaryperformance/components/DataGrid';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

jest.mock('@legion-lib/react-grid', () => ({
    Table: jest.fn(({ header, body, footer }) => (
        <div data-testid="table">
            <div data-testid="table-header">{header}</div>
            <div data-testid="table-body">{body}</div>
            <div data-testid="table-footer">{footer}</div>
        </div>
    )),
}));

jest.mock('@/components/ReportTitle', () => {
    return jest.fn(() => <div data-testid="report-title">Mock ReportTitle</div>);
});

jest.mock('@/components/NoDataTitle', () => {
    return jest.fn(() => <div data-testid="no-data-title">No Data</div>);
});

jest.mock('@/pages/subsidiaryperformance/gridBuilder', () => ({
    BuildBody: jest.fn(() => 'Mock Body'),
    BuildFooter: jest.fn(() => 'Mock Footer'),
    BuildHeaders: jest.fn(() => 'Mock Headers'),
}));

jest.mock('@/pages/subsidiaryperformance/common', () => ({
    generateReportTitle: jest.fn(() => 'Mock Report Title'),
}));

jest.mock('@/pages/subsidiaryperformance/components/GridBreadcrumb', () => {
    return jest.fn(() => <div data-testid="grid-breadcrumb">Grid Breadcrumb</div>);
});

describe('DataGrid', () => {
    const mockState = {
        formData: {
            viewType: 'detailed'
        },
        requestParam: {
            DrillDownLevel: 1,
            BaseCurrency: 'USD',
            FromDate: '2023-01-01',
            ToDate: '2023-01-31'
        },
        gridData: {
            data: [
                { id: 1, subsidiary: 'Sub1', revenue: 1000 },
                { id: 2, subsidiary: 'Sub2', revenue: 2000 }
            ],
            total: { totalRevenue: 3000 },
            grandTotal: { grandTotalRevenue: 3000 }
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
        useSelector.mockImplementation((selector) => {
            if (selector.toString().includes('formData')) {
                return mockState.formData;
            }
            if (selector.toString().includes('requestParam')) {
                return mockState.requestParam;
            }
            if (selector.toString().includes('gridData')) {
                return mockState.gridData;
            }
            return null;
        });
    });

    test('renders DataGrid with data', () => {
        render(<DataGrid />);
        
        expect(screen.getByTestId('grid-breadcrumb')).toBeInTheDocument();
        expect(screen.getByTestId('table')).toBeInTheDocument();
        expect(screen.getByTestId('report-title')).toBeInTheDocument();
        expect(screen.queryByTestId('no-data-title')).not.toBeInTheDocument();
    });

    test('renders NoDataTitle when data is empty', () => {
        useSelector.mockImplementation((selector) => {
            if (selector.toString().includes('formData')) {
                return mockState.formData;
            }
            if (selector.toString().includes('requestParam')) {
                return mockState.requestParam;
            }
            if (selector.toString().includes('gridData')) {
                return { ...mockState.gridData, data: [] };
            }
            return null;
        });

        render(<DataGrid />);
        
        expect(screen.getByTestId('report-title')).toBeInTheDocument();
        expect(screen.getByTestId('no-data-title')).toBeInTheDocument();
        expect(screen.queryByTestId('table')).not.toBeInTheDocument();
    });

    test('returns null when gridData is null', () => {
        useSelector.mockImplementation((selector) => {
            if (selector.toString().includes('formData')) {
                return mockState.formData;
            }
            if (selector.toString().includes('requestParam')) {
                return mockState.requestParam;
            }
            if (selector.toString().includes('gridData')) {
                return null;
            }
            return null;
        });

        const { container } = render(<DataGrid />);
        
        expect(container.firstChild).toBeNull();
    });

    test('generates report title correctly', () => {
        const Service = require('@/pages/subsidiaryperformance/common');
        
        render(<DataGrid />);
        
        expect(Service.generateReportTitle).toHaveBeenCalledWith(
            mockState.requestParam.FromDate,
            mockState.requestParam.ToDate,
            mockState.requestParam.BaseCurrency
        );
    });

    test('calls grid builders with correct options', () => {
        const { BuildBody, BuildFooter, BuildHeaders } = require('@/pages/subsidiaryperformance/gridBuilder');
        
        render(<DataGrid />);
        
        const expectedOptions = {
            drillDownLevel: mockState.requestParam.DrillDownLevel,
            baseCurrency: mockState.requestParam.BaseCurrency,
            viewType: mockState.formData.viewType,
        };

        expect(BuildHeaders).toHaveBeenCalledWith(expectedOptions);
        expect(BuildBody).toHaveBeenCalledWith(mockState.gridData.data, expectedOptions);
        expect(BuildFooter).toHaveBeenCalledWith({
            totalData: mockState.gridData.total,
            grandTotalData: mockState.gridData.grandTotal,
        }, expectedOptions);
    });

    test('renders with breadcrumb component', () => {
        render(<DataGrid />);
        
        expect(screen.getByTestId('grid-breadcrumb')).toBeInTheDocument();
    });
});