import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('@legion-lib/react-breadcrumb', () => ({ Breadcrumb: ({ items, value, onChange }) => (
  <div data-testid="bc" data-value={value}>
    {items.map(it => <button key={it.value} data-testid={`bc-${it.value}`} onClick={() => onChange(it)}>{it.label}</button>)}
  </div>
)}))

jest.mock('@legion-lib/react-grid', () => ({
  Table: ({ onSort, onPaging, header, body, footer }) => (
    <div>
      <button data-testid="sort" onClick={() => onSort && onSort('col', 'asc')}>S</button>
      <button data-testid="page" onClick={() => onPaging && onPaging(2, 20)}>P</button>
      <div data-testid="header">{header}</div>
      <div data-testid="body">{body}</div>
      <div data-testid="footer">{footer}</div>
    </div>
  )
}))

jest.mock('@/components/NoDataTitle', () => () => <div data-testid="nodata" />)
jest.mock('@/components/ReportTitle', () => ({ content }) => <div data-testid="title">{content}</div>)
jest.mock('@/components/Popup', () => ({ isShow, children }) => isShow ? <div data-testid="popup">{children}</div> : null)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))

const mockPost = jest.fn(() => Promise.resolve({ data: { rows: [] } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postReportData: (...a) => mockPost(...a) } }))

jest.mock('@/pages/extrapayout/common/service', () => ({ __esModule: true, default: { getFormattedDate: d => '2024-01-01', getTitle: () => 'TITLE', showErrorMsg: jest.fn() } }))
jest.mock('@/pages/extrapayout/common/constants', () => ({ ApiUrl: { REPORT_DATA_URL: '/data', REPORT_DETAIL_DATA_URL: '/detail' }, ReportLevel: { MAIN: 0, CUSTOMER: 2 }, BreadcrumbText: { main: 'Main', customer: 'Customer' }, DefaultPagingOption: { PageList: [10,20,50] } }))

const mockUtils = {
  renderHeader: jest.fn(() => <div data-testid="h" />),
  renderDataSection: jest.fn((data, level, onDrilldown, onBetlist) => ({ bodyData: <button data-testid="betlist" onClick={e => onBetlist(e, 1, 'nick', 'user')} /> , index: 0 })),
  renderFooter: jest.fn(() => <div data-testid="f" />),
}
jest.mock('@/pages/extrapayout/common/gridUtils', () => ({
  renderHeader: (...a) => mockUtils.renderHeader(...a),
  renderDataSection: (...a) => mockUtils.renderDataSection(...a),
  renderFooter: (...a) => mockUtils.renderFooter(...a),
}))

jest.mock('@/pages/extrapayout/components/Detail', () => ({ data }) => <div data-testid="detail" data-has={String(!!data)} />)

import { DataGrid as Comp } from '@/pages/extrapayout/components/DataGrid'

const baseProps = () => ({
  reportData: { data: [{},{}], totalRows: 100 },
  requestParam: { DrillDownLevel: 2, FromDate: '2024-01-01', ToDate: '2024-01-31', PageIndex: 1, PageSize: 50, BaseCurrencyName: 'USD', ProductCodeList: [], Username: 'u', DrillDownFromDate: '2024-01-01', DrillDownToDate: '2024-01-31' },
  detailParams: null,
  selectedCurrency: 1,
  isConvertAllToBaseCurrency: false,
  reportTitle: 'T',
  reloadReport: false,
  setRequestParam: jest.fn(),
  toggleLoader: jest.fn(),
  getReportData: jest.fn(),
  setReportTitle: jest.fn(),
  setDetailParams: jest.fn()
})

test('returns null when data is null', () => {
  const p = baseProps()
  p.reportData = { data: null, totalRows: 0 }
  const { container } = render(<Comp {...p} />)
  expect(container.firstChild).toBeNull()
})

test('renders NoDataTitle when empty data', () => {
  const p = baseProps()
  p.reportData = { data: [], totalRows: 0 }
  render(<Comp {...p} />)
  expect(screen.getByTestId('nodata')).toBeInTheDocument()
})

test('breadcrumb drilldown to MAIN triggers actions', () => {
  const p = baseProps()
  render(<Comp {...p} />)
  fireEvent.click(screen.getByTestId('bc-0'))
  expect(p.toggleLoader).toHaveBeenCalledWith(true)
  expect(p.setRequestParam).toHaveBeenCalled()
  expect(p.getReportData).toHaveBeenCalledWith('/data', expect.any(Object))
  expect(p.setReportTitle).toHaveBeenCalledWith('TITLE')
})

test('onPaging triggers request update', () => {
  const p = baseProps()
  render(<Comp {...p} />)
  fireEvent.click(screen.getByTestId('page'))
  expect(p.setRequestParam).toHaveBeenCalledWith(expect.objectContaining({ PageIndex: 2, PageSize: 20 }))
  expect(p.getReportData).toHaveBeenCalledWith('/data', expect.objectContaining({ PageIndex: 2, PageSize: 20 }))
})

test('drilldown betlist fetches data and shows popup', async () => {
  const p = baseProps()
  render(<Comp {...p} />)
  fireEvent.click(screen.getByTestId('betlist'))
  await screen.findByTestId('detail')
  expect(p.setDetailParams).toHaveBeenCalled()
  expect(mockPost).toHaveBeenCalledWith('/detail', expect.any(Object))
  expect(screen.getByTestId('detail')).toBeInTheDocument()
})


