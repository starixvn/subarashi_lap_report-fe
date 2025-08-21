import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

jest.mock('@legion-lib/react-grid', () => ({
  Table: ({ onSort, onPaging }) => (
    <div data-testid="table">
      <button data-testid="sort" onClick={() => onSort('Col', 'asc')}>s</button>
      <button data-testid="page" onClick={() => onPaging(2)}>p</button>
    </div>
  )
}))
jest.mock('@/components/ReportTitle', () => ({ content }) => <div data-testid="report-title">{content}</div>)
jest.mock('@/hooks/useToggleRequest', () => ({ __esModule: true, default: () => ({ sendRequest: (fn, cb) => { cb && cb({ data: { data: [{}], totalRows: 1, total: {} } }) } }) }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postReportData: jest.fn(() => Promise.resolve({ data: { data: [{}], totalRows: 1, total: {} } })) } }))
jest.mock('@/pages/customerbalance/gridUtility', () => ({
  BuildBody: () => <div data-testid="body" />, BuildFooter: () => <div data-testid="footer" />, BuildHeaders: () => <div data-testid="header" />, GenerateReportTitle: () => 'T', GetDefaultPagingOptions: () => ({})
}))
jest.mock('@/pages/customerbalance/actions', () => ({ ActionCreators: { setRequestParam: v => ({ type: 'SET_REQ', v }), setGridData: v => ({ type: 'SET_GRID', v }) } }))
jest.mock('@/pages/customerbalance/common', () => ({ __esModule: true, default: { getOrderItem: () => 'Col-asc' }, constants: { ApiUrl: { DATA_URL: '/api' }, TableSettings: { MinWidth: 1000 } } }))

import DataGrid from '@/pages/customerbalance/components/DataGrid'

const createMockStore = state => createStore(combineReducers({
  gridData: (s = state.gridData) => s,
  formData: (s = state.formData) => s,
  requestParam: (s = state.requestParam) => s
}))

describe('CustomerBalance DataGrid behavior', () => {
  test('fires sort and paging callbacks', () => {
    const store = createMockStore({ gridData: { data: [{ id: 1 }], totalRows: 1, total: {} }, formData: { isAllowedCustomerCommission: false, isEnableSingleWallet: false }, requestParam: { FromDate: '2024-01-01', ToDate: '2024-01-02', CurrencyName: 'USD', PageIndex: 1 } })
    render(<Provider store={store}><DataGrid /></Provider>)
    fireEvent.click(screen.getByTestId('sort'))
    fireEvent.click(screen.getByTestId('page'))
    expect(screen.getByTestId('table')).toBeInTheDocument()
  })
})


