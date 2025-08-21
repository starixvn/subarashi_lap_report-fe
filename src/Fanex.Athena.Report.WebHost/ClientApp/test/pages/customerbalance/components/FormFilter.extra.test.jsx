import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-daterangepicker', () => ({ DateRange: p => <div data-testid="date-range" {...p} /> }))
jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, default: p => <div data-testid="multi" onClick={() => p.onChange && p.onChange(null, 'P1')} /> }))
jest.mock('@/components/CollapsiblePanel', () => p => <div>{p.children}{p.stickyFooter}</div>)
jest.mock('@/components/ExportExcel', () => p => <button data-testid="export" onClick={p.onClick} disabled={p.disabled}>E</button>)
jest.mock('@/components/ReportSelect', () => p => <select data-testid="report-select" onChange={() => p.onChange({ label: 'USD', value: 1 })} />)
jest.mock('@/components/SubmitButton', () => p => <button data-testid="submit" onClick={p.onClick} disabled={p.disabled}>{p.children}</button>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, getDateRangeResource: k => k, currentLanguage: 'en' } }))
jest.mock('@/hooks/useToggleRequest', () => () => ({ sendRequest: (fn, cb) => { cb && cb({ data: {} }) } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postReportData: jest.fn(), getReportFile: jest.fn(() => Promise.resolve({ status: 200, data: new Blob(['x']) })) } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { convertDateToString: d => '2024-01-01', downloadFile: jest.fn() } }))
jest.mock('@/pages/customerbalance/actions', () => ({ ActionCreators: { setSelectedProducts: v => ({ type: 'A', v }), setGridData: v => ({ type: 'B', v }), setRequestParam: v => ({ type: 'C', v }), setDateRange: v => ({ type: 'D', v }), getUserGuideContent: () => ({ type: 'E' }) } }))
jest.mock('@/pages/customerbalance/common', () => ({ __esModule: true, default: { getOrderItem: () => 'o' }, constants: { DateConstraint: { minDate: new Date(), maxDate: new Date(), today: new Date(), limitedMonthRange: 3, firstDayOfWeek: 1 }, ApiUrl: { DATA_URL: '/api', EXPORT_EXCEL_URL: '/exp' }, SelectTopOptions: [{ value: 10 }], ExcludeTestDataOptions: [{ value: 'true' }], DefaultPagingOption: { PageIndex: 1, PageSize: 10 }, SortKeys: { Deposit: 'Deposit' }, PopUpSetting: { Title: 'T', Message: 'M' } } }))

import FormFilter from '@/pages/customerbalance/components/FormFilter'

const base = {
  dateRange: { fromDate: new Date(), toDate: new Date() },
  formData: { productOptions: [{ code: 'P1', name: 'P', status: '' }], currencies: [{ label: 'USD', value: 1 }] },
  requestParam: {},
  userGuideContent: null,
  selectedProduct: [{ code: 'P1' }]
}

const makeStore = (s = base) => createStore(r => r, s)

test('CustomerBalance FormFilter enables submit and export when valid', () => {
  const store = makeStore()
  render(<Provider store={store}><FormFilter /></Provider>)
  expect(screen.getByTestId('submit')).toBeEnabled()
  expect(screen.getByTestId('export')).toBeEnabled()
  fireEvent.click(screen.getByTestId('submit'))
})


