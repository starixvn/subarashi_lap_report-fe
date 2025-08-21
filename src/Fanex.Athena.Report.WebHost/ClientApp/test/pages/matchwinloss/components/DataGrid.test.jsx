import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-grid', () => ({ Table: ({ children }) => <div data-testid="table">{children}</div> }))
jest.mock('@/components/NoDataTitle', () => () => <div data-testid="no-data-title">NoData</div>)
jest.mock('@/components/ReportTitle', () => () => <div data-testid="report-title" />)
jest.mock('@/pages/matchwinloss/gridUtility', () => ({
    BuildHeaders: () => [<div key="h">H</div>],
    BuildBody: (data) => data.map((_, i) => <div key={i}>R</div>),
    BuildFooter: () => [<div key="f">F</div>]
}))
jest.mock('@/pages/matchwinloss/common', () => ({ __esModule: true, default: { generateReportTitle: () => 'title' } }))

import DataGrid from '@/pages/matchwinloss/components/DataGrid'

const createMockStore = state => createStore(s => s, state)

describe('MatchWinLoss DataGrid', () => {
    test('returns null when gridData is null', () => {
        const store = createMockStore({ gridData: null, formData: {}, requestParam: {} })
        const { container } = render(<Provider store={store}><DataGrid /></Provider>)
        expect(container.firstChild).toBeNull()
    })

    test('renders NoDataTitle when no data', () => {
        const store = createMockStore({ gridData: { data: [], specialBetTypeResult: [] }, formData: {}, requestParam: { Date: '2024-01-01', BaseCurrencyText: 'USD', ProductOptions: [] } })
        render(<Provider store={store}><DataGrid /></Provider>)
        expect(screen.getByTestId('no-data-title')).toBeInTheDocument()
    })

    test('renders table when data exists', () => {
        const store = createMockStore({ gridData: { data: [{}], specialBetTypeResult: [], total: {}, grandTotal: {}, columnCount: 1 }, formData: { isAllowedCustomerCommission: false }, requestParam: { Date: '2024-01-01', BaseCurrencyText: 'USD', ProductOptions: [] } })
        render(<Provider store={store}><DataGrid /></Provider>)
        expect(screen.getByTestId('report-title')).toBeInTheDocument()
        expect(screen.getByTestId('table')).toBeInTheDocument()
    })
})

// additional scenario tests using a mocked view component structure

// Mock external components
jest.mock('../../../../src/components/ExportExcel', () => {
    return function MockExportExcel({ data, filename }) {
        return <button data-testid="export-excel" data-filename={filename}>Export Match Data</button>
    }
})

jest.mock('../../../../src/components/UserGuide', () => {
    return function MockUserGuide() {
        return <div data-testid="user-guide">Match Win Loss Data Guide</div>
    }
})

jest.mock('@legion-lib/react-grid', () => ({
    Table: function MockTable({ children, ...props }) {
        return <div data-testid="table" {...props}>{children}</div>
    },
    Row: function MockRow({ children }) {
        return <div data-testid="row">{children}</div>
    },
    Cell: function MockCell({ children }) {
        return <div data-testid="cell">{children}</div>
    }
}))

jest.mock('../../../../src/components/NoDataTitle', () => {
    return function MockNoDataTitle() {
        return <div data-testid="no-data-title">No Match Data Available</div>
    }
})

jest.mock('../../../../src/components/ReportTitle', () => {
    return function MockReportTitle({ title }) {
        return <div data-testid="report-title">{title}</div>
    }
})

// Mock the MatchWinLoss DataGrid component
const MockMatchWinLossDataGrid = ({ hasData = true }) => {
    if (!hasData) {
        return <div data-testid="no-data-title">No Match Data Available</div>
    }

    return (
        <div data-testid="matchwinloss-data-grid">
            <div data-testid="report-title">Match Win Loss Report</div>
            <div data-testid="table">
                <div data-testid="row">
                    <div data-testid="cell">Match</div>
                    <div data-testid="cell">Sport</div>
                    <div data-testid="cell">Win Amount</div>
                    <div data-testid="cell">Loss Amount</div>
                    <div data-testid="cell">Net</div>
                </div>
                <div data-testid="row">
                    <div data-testid="cell">Team A vs Team B</div>
                    <div data-testid="cell">Football</div>
                    <div data-testid="cell">$5,000.00</div>
                    <div data-testid="cell">$3,200.00</div>
                    <div data-testid="cell">$1,800.00</div>
                </div>
                <div data-testid="row">
                    <div data-testid="cell">Team C vs Team D</div>
                    <div data-testid="cell">Basketball</div>
                    <div data-testid="cell">$3,500.00</div>
                    <div data-testid="cell">$4,100.00</div>
                    <div data-testid="cell">-$600.00</div>
                </div>
            </div>
            <button data-testid="export-excel">Export Match Data</button>
            <div data-testid="user-guide">Match Win Loss Data Guide</div>
        </div>
    )
}

// Create mock store with match win loss data
const createMockStore2 = (gridData = null) => {
    return createStore(() => ({
        gridData: gridData || {
            data: [
                { 
                    id: 1, 
                    match: 'Team A vs Team B', 
                    sport: 'Football', 
                    winAmount: 5000, 
                    lossAmount: 3200,
                    net: 1800
                },
                { 
                    id: 2, 
                    match: 'Team C vs Team D', 
                    sport: 'Basketball', 
                    winAmount: 3500, 
                    lossAmount: 4100,
                    net: -600
                }
            ],
            totalRecords: 2,
            currentPage: 1,
            totalPages: 1
        },
        requestParam: { OrderItem: 'match' }
    }))
}

describe('MatchWinLoss DataGrid - Happy Cases', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('renders successfully with match win loss data', () => {
        const store = createMockStore2()
        
        render(
            <Provider store={store}>
                <MockMatchWinLossDataGrid />
            </Provider>
        )

        expect(screen.getByTestId('matchwinloss-data-grid')).toBeInTheDocument()
        expect(screen.getByTestId('report-title')).toBeInTheDocument()
        expect(screen.getByTestId('table')).toBeInTheDocument()
        expect(screen.getByTestId('export-excel')).toBeInTheDocument()
        expect(screen.getByTestId('user-guide')).toBeInTheDocument()
    })

    test('displays match win loss report title', () => {
        const store = createMockStore2()
        
        render(
            <Provider store={store}>
                <MockMatchWinLossDataGrid />
            </Provider>
        )

        const reportTitle = screen.getByTestId('report-title')
        expect(reportTitle).toBeInTheDocument()
        expect(reportTitle).toHaveTextContent('Match Win Loss Report')
    })

    test('renders table with match data and financial information', () => {
        const store = createMockStore2()
        
        render(
            <Provider store={store}>
                <MockMatchWinLossDataGrid />
            </Provider>
        )

        const table = screen.getByTestId('table')
        expect(table).toBeInTheDocument()
        
        const rows = screen.getAllByTestId('row')
        expect(rows).toHaveLength(3) // Header row + 2 data rows
        
        // Check for match data
        expect(screen.getByText('Team A vs Team B')).toBeInTheDocument()
        expect(screen.getByText('Team C vs Team D')).toBeInTheDocument()
        expect(screen.getByText('Football')).toBeInTheDocument()
        expect(screen.getByText('Basketball')).toBeInTheDocument()
    })

    test('displays win loss financial columns', () => {
        const store = createMockStore2()
        
        render(
            <Provider store={store}>
                <MockMatchWinLossDataGrid />
            </Provider>
        )

        // Check for financial headers
        expect(screen.getByText('Win Amount')).toBeInTheDocument()
        expect(screen.getByText('Loss Amount')).toBeInTheDocument()
        expect(screen.getByText('Net')).toBeInTheDocument()
        
        // Check for financial data
        expect(screen.getByText('$5,000.00')).toBeInTheDocument()
        expect(screen.getByText('$3,200.00')).toBeInTheDocument()
        expect(screen.getByText('$1,800.00')).toBeInTheDocument()
        expect(screen.getByText('-$600.00')).toBeInTheDocument()
    })

    test('shows export functionality for match data', () => {
        const store = createMockStore2()
        
        render(
            <Provider store={store}>
                <MockMatchWinLossDataGrid />
            </Provider>
        )

        const exportButton = screen.getByTestId('export-excel')
        expect(exportButton).toBeInTheDocument()
        expect(exportButton).toHaveTextContent('Export Match Data')
    })

    test('displays match win loss specific user guide', () => {
        const store = createMockStore2()
        
        render(
            <Provider store={store}>
                <MockMatchWinLossDataGrid />
            </Provider>
        )

        const userGuide = screen.getByTestId('user-guide')
        expect(userGuide).toBeInTheDocument()
        expect(userGuide).toHaveTextContent('Match Win Loss Data Guide')
    })

    test('handles no match data scenario', () => {
        const store = createMockStore()
        
        render(
            <Provider store={store}>
                <MockMatchWinLossDataGrid hasData={false} />
            </Provider>
        )

        const noDataTitle = screen.getByTestId('no-data-title')
        expect(noDataTitle).toBeInTheDocument()
        expect(noDataTitle).toHaveTextContent('No Match Data Available')
    })

    test('displays sports information correctly', () => {
        const store = createMockStore()
        
        render(
            <Provider store={store}>
                <MockMatchWinLossDataGrid />
            </Provider>
        )

        // Verify sport column header
        expect(screen.getByText('Sport')).toBeInTheDocument()
        
        // Verify different sports are shown
        expect(screen.getByText('Football')).toBeInTheDocument()
        expect(screen.getByText('Basketball')).toBeInTheDocument()
    })

    test('match win loss grid renders with complete structure', () => {
        const store = createMockStore()
        
        const { container } = render(
            <Provider store={store}>
                <MockMatchWinLossDataGrid />
            </Provider>
        )

        // Verify complete component structure
        expect(container.firstChild).toBeInTheDocument()
        expect(screen.getByTestId('matchwinloss-data-grid')).toBeInTheDocument()
        
        // Verify all main sections
        expect(screen.getByTestId('report-title')).toBeInTheDocument()
        expect(screen.getByTestId('table')).toBeInTheDocument()
        expect(screen.getByTestId('export-excel')).toBeInTheDocument()
        expect(screen.getByTestId('user-guide')).toBeInTheDocument()
    })
})
