import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

jest.mock('@legion-lib/react-grid', () => ({
    Table: ({ children }) => <div data-testid="table">{children}</div>
}))
jest.mock('@/components/NoDataTitle', () => () => <div data-testid="no-data-title">NoData</div>)
jest.mock('@/components/ReportTitle', () => ({ content }) => <div data-testid="report-title">{content}</div>)

jest.mock('@/pages/turnover/common', () => ({
    __esModule: true,
    default: { generateReportTitle: () => 'Turnover, 2024-01-01 → 2024-01-02, Currency: USD, BaseCurrency: USD' },
    constants: { TableSettings: { MinWidth: 1000 } }
}))
jest.mock('@/pages/turnover/gridBuilder', () => ({
    BuildBody: () => <div data-testid="body" />,
    BuildFooter: () => <div data-testid="footer" />,
    BuildHeader: () => <div data-testid="header" />
}))

import DataGrid from '@/pages/turnover/components/DataGrid'

const createMockStore = state => createStore(combineReducers({
    gridData: (s = state.gridData) => s,
    formData: (s = state.formData) => s,
    requestParam: (s = state.requestParam) => s
}))

describe('Turnover DataGrid', () => {
    test('returns null when gridData is null', () => {
        const store = createMockStore({ gridData: null, formData: {}, requestParam: {} })
        const { container } = render(<Provider store={store}><DataGrid /></Provider>)
        expect(container.firstChild).toBeNull()
    })

    test('renders NoDataTitle when no data', () => {
        const store = createMockStore({ gridData: { data: [] }, formData: {}, requestParam: { FromDate: '2024-01-01', ToDate: '2024-01-02', CurrencyName: 'USD', BaseCurrencyName: 'USD', UserName: '' } })
        render(<Provider store={store}><DataGrid /></Provider>)
        expect(screen.getByTestId('no-data-title')).toBeInTheDocument()
    })

    test('renders table when data exists', () => {
        const store = createMockStore({
            gridData: { data: [{ id: 1 }], totalData: {}, totalRows: 1 },
            formData: { isAllowedCustomerCommission: true, isAllowedCasinoTransfer: false, isEnableSingleWallet: false, isHidePlayerWl: false },
            requestParam: { FromDate: '2024-01-01', ToDate: '2024-01-02', CurrencyName: 'USD', BaseCurrencyName: 'USD', UserName: '' }
        })
        render(<Provider store={store}><DataGrid /></Provider>)
        expect(screen.getByTestId('report-title')).toBeInTheDocument()
        expect(screen.getByTestId('table')).toBeInTheDocument()
    })
})
