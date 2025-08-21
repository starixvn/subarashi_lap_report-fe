import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

jest.mock('@legion-lib/react-grid', () => ({
  Table: ({ onSort, onPaging, children }) => (
    <div data-testid="table">
      <button data-testid="sort" onClick={() => onSort('col', 'asc')}>s</button>
      <button data-testid="page" onClick={() => onPaging(2, 20)}>p</button>
      {children}
    </div>
  )
}))
jest.mock('@legion-lib/react-breadcrumb', () => ({ Breadcrumb: () => <div data-testid="breadcrumb" /> }))
jest.mock('@/components/NoDataTitle', () => () => <div>NoData</div>)
jest.mock('@/components/ReportTitle', () => () => <div data-testid="report-title" />)
jest.mock('@/components/Popup', () => ({ children }) => <div data-testid="popup">{children}</div>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postReportData: jest.fn(() => Promise.resolve({ data: {} })) } }))
jest.mock('@/pages/extrapayout/common/gridUtils', () => ({
  renderHeader: () => [<div key="h">H</div>],
  renderDataSection: () => ({ bodyData: [<div key="b">B</div>], index: 0 }),
  renderFooter: () => [<div key="f">F</div>]
}))
jest.mock('@/pages/extrapayout/common/service', () => ({ __esModule: true, default: { getFormattedDate: d => d, getTitle: () => 'title', showErrorMsg: jest.fn() } }))
jest.mock('@/pages/extrapayout/components/Detail', () => () => <div data-testid="detail" />)
jest.mock('@/pages/extrapayout/common/constants', () => ({ __esModule: true, ApiUrl: { REPORT_DATA_URL: '/api' }, ReportLevel: { MAIN: 0, CUSTOMER: 1 }, BreadcrumbText: { main: 'Main', customer: 'Customer' }, DefaultPagingOption: { PageIndex: 1, PageSize: 10, PageList: [10] } }))
jest.mock('@/pages/extrapayout/actions', () => ({ __esModule: true, default: { setRequestParam: jest.fn(p => ({ type: 'SET_REQUEST', payload: p })), toggleLoader: jest.fn(() => ({ type: 'TOGGLE' })), getReportData: jest.fn(() => ({ type: 'GET' })), setReportTitle: jest.fn(() => ({ type: 'SET_TITLE' })), setDetailParams: jest.fn(p => ({ type: 'SET_DETAIL', payload: p })) } }))

import Actions from '@/pages/extrapayout/actions'
import DataGrid from '@/pages/extrapayout/components/DataGrid'

const createMockStore = state => createStore(combineReducers({
  requestParam: (s = state.requestParam, a) => a?.type === 'SET_REQUEST' ? a.payload : s,
  reportData: (s = state.reportData) => s,
  reportTitle: (s = 't') => s,
  reloadReport: (s = 0) => s,
  detailParams: (s = null, a) => (a?.type === 'SET_DETAIL' ? a.payload : s),
  selectedCurrency: (s = 1) => s,
  isConvertAllToBaseCurrency: (s = false) => s
}))

describe('ExtraPayout DataGrid behavior', () => {
  test('triggers sort and paging handlers', () => {
    const store = createMockStore({ requestParam: { DrillDownLevel: 0, PageIndex: 1, PageSize: 10, CurrencyName: 'USD', BaseCurrencyName: 'USD' }, reportData: { data: [{}], totalRows: 1 } })
    render(<Provider store={store}><DataGrid /></Provider>)
    fireEvent.click(screen.getByTestId('sort'))
    fireEvent.click(screen.getByTestId('page'))
    expect(Actions.setRequestParam).toHaveBeenCalled()
    expect(Actions.getReportData).toHaveBeenCalled()
  })
})


