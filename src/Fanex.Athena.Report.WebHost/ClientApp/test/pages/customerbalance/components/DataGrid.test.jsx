import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

jest.mock('@legion-lib/react-grid', () => ({ Table: ({ children, ...rest }) => <div data-testid="table" {...rest}>{children}</div> }))
jest.mock('@/components/NoDataTitle', () => () => <div data-testid="no-data-title">NoData</div>)
jest.mock('@/components/ReportTitle', () => ({ content }) => <div data-testid="report-title">{content}</div>)
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postReportData: jest.fn(() => Promise.resolve({ data: { data: [{ id: 1 }], totalRows: 1, total: {} } })) } }))
jest.mock('@/hooks/useToggleRequest', () => ({ __esModule: true, default: () => ({ sendRequest: (fn, cb) => fn().then(cb) }) }))

jest.mock('@/pages/customerbalance/gridUtility', () => ({
    BuildBody: () => <div data-testid="body" />,
    BuildFooter: () => <div data-testid="footer" />,
    BuildHeaders: () => <div data-testid="header" />,
    GenerateReportTitle: () => 'Customer Balance, 2024-01-01 → 2024-01-02, USD',
    GetDefaultPagingOptions: () => ({})
}))
jest.mock('@/pages/customerbalance/actions', () => ({ ActionCreators: { setRequestParam: v => ({ type: 'SET_REQ', v }), setGridData: v => ({ type: 'SET_GRID', v }) } }))
jest.mock('@/pages/customerbalance/common', () => ({ constants: { ApiUrl: { DATA_URL: '/api' }, TableSettings: { MinWidth: 1000 } } }))

import DataGrid from '@/pages/customerbalance/components/DataGrid'

const createMockStore = state => createStore(combineReducers({
    gridData: (s = state.gridData) => s,
    formData: (s = state.formData) => s,
    requestParam: (s = state.requestParam) => s
}))

describe('CustomerBalance DataGrid', () => {
    test('returns null when gridData is null', () => {
        const store = createMockStore({ gridData: null, formData: {}, requestParam: {} })
        const { container } = render(<Provider store={store}><DataGrid /></Provider>)
        expect(container.firstChild).toBeNull()
    })

    test('renders NoDataTitle when no data', () => {
        const store = createMockStore({ gridData: { data: [] }, formData: {}, requestParam: { FromDate: '2024-01-01', ToDate: '2024-01-02', CurrencyName: 'USD' } })
        render(<Provider store={store}><DataGrid /></Provider>)
        expect(screen.getByTestId('no-data-title')).toBeInTheDocument()
    })

    test('renders table when data exists', () => {
        const store = createMockStore({ gridData: { data: [{ id: 1 }], totalRows: 1, total: {} }, formData: { isAllowedCustomerCommission: false, isEnableSingleWallet: false }, requestParam: { FromDate: '2024-01-01', ToDate: '2024-01-02', CurrencyName: 'USD', PageIndex: 1 } })
        render(<Provider store={store}><DataGrid /></Provider>)
        expect(screen.getByTestId('report-title')).toBeInTheDocument()
        expect(screen.getByTestId('table')).toBeInTheDocument()
    })
})
