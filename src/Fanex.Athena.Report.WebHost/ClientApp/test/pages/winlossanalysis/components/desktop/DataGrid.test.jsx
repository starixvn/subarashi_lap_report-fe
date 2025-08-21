import React from 'react';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@/pages/winlossanalysis/components/desktop/DataGrid';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
    shallowEqual: (a, b) => a === b,
}));

jest.mock('@legion-lib/react-grid', () => ({
    Table: jest.fn(({ header, body, footer, onSort, onPaging }) => (
        <div data-testid="table">
            <div data-testid="table-header">{header}</div>
            <div data-testid="table-body">{body}</div>
            <div data-testid="table-footer">{footer}</div>
            <button data-testid="sort-btn" onClick={() => onSort && onSort('test', 'asc')}>Sort</button>
            <button data-testid="page-btn" onClick={() => onPaging && onPaging(1, 10)}>Page</button>
        </div>
    )),
}));

jest.mock('@/components/NoDataTitle', () => {
    return jest.fn(() => <div data-testid="no-data-title">No Data</div>);
});

jest.mock('@/components/ReportTitle', () => {
    return jest.fn(() => <div data-testid="report-title">Mock ReportTitle</div>);
});

jest.mock('@/pages/winlossanalysis/common/gridUtils', () => ({
    renderHeader: jest.fn(() => 'Mock Header'),
    renderDataSection: jest.fn(() => 'Mock Data'),
    renderFooter: jest.fn(() => 'Mock Footer'),
}));

jest.mock('@/pages/winlossanalysis/actions', () => ({
    ActionCreators: {
        setRequestParam: jest.fn(() => ({ type: 'SET_REQUEST_PARAM' })),
        toggleLoader: jest.fn(() => ({ type: 'TOGGLE_LOADER' })),
        getReportData: jest.fn(() => ({ type: 'GET_REPORT_DATA' })),
    },
}));

jest.mock('@/pages/winlossanalysis/components/ExcelPopUp', () => {
    return jest.fn(() => <div data-testid="excel-popup">Excel Popup</div>);
});

describe('DataGrid', () => {
    const mockDispatch = jest.fn();
    const mockState = {
        requestParam: {
            GroupMode: 1,
            BreakdownMode: 1,
            PageIndex: 1,
            PageSize: 10,
            SubmitTime: '2023-01-01',
        },
        reportData: {
            data: [{ id: 1, name: 'Test Data' }],
            sumTotal: { total: 100 },
            totalRow: 50,
        },
        reportTitle: 'Test Report',
        reloadReport: false,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        useDispatch.mockReturnValue(mockDispatch);
        useSelector.mockImplementation((selector) => 
            selector(mockState)
        );
    });

    test('renders DataGrid with data', () => {
        render(<DataGrid />);
        
        expect(screen.getByTestId('table')).toBeInTheDocument();
        expect(screen.getByTestId('report-title')).toBeInTheDocument();
    });

    test('renders NoDataTitle when data is empty', () => {
        useSelector.mockImplementation((selector) => 
            selector({
                ...mockState,
                reportData: { ...mockState.reportData, data: [] }
            })
        );

        render(<DataGrid />);
        
        expect(screen.getByTestId('no-data-title')).toBeInTheDocument();
        expect(screen.queryByTestId('table')).not.toBeInTheDocument();
    });

    test('returns null when data is null', () => {
        useSelector.mockImplementation((selector) => 
            selector({
                ...mockState,
                reportData: { ...mockState.reportData, data: null }
            })
        );

        const { container } = render(<DataGrid />);
        
        expect(container.firstChild).toBeNull();
    });

    test('handles sort action', () => {
        render(<DataGrid />);
        
        const sortBtn = screen.getByTestId('sort-btn');
        sortBtn.click();
        
        expect(mockDispatch).toHaveBeenCalled();
    });

    test('handles paging action', () => {
        render(<DataGrid />);
        
        const pageBtn = screen.getByTestId('page-btn');
        pageBtn.click();
        
        expect(mockDispatch).toHaveBeenCalled();
    });

    test('memoizes header, body, and footer properly', () => {
        const { renderHeader, renderDataSection, renderFooter } = require('@/pages/winlossanalysis/common/gridUtils');
        
        render(<DataGrid />);
        
        expect(renderHeader).toHaveBeenCalled();
        expect(renderDataSection).toHaveBeenCalled();
        expect(renderFooter).toHaveBeenCalled();
    });
});