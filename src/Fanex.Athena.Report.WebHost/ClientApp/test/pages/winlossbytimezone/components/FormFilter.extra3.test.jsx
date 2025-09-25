import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-daterangepicker', () => ({ DateRange: p => <button data-testid="date-range" onClick={() => p.onChange({}, false)} /> }))
jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, default: p => <div data-testid="multi" /> }))
jest.mock('@/components/ReportSelect', () => p => <button data-testid="report-select" onClick={() => p.onChange({ label: 'All', value: 0 })} />)
jest.mock('@/components/CollapsiblePanel', () => p => <div>{p.children}{p.stickyFooter}</div>)
jest.mock('@/components/ExportExcel', () => p => <button data-testid="export" onClick={p.onClick} disabled={p.disabled}>E</button>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, getDateRangeResource: k => k, currentLanguage: 'en' } }))
jest.mock('@/hooks/useToggleRequest', () => () => ({ sendRequest: (fn, cb) => { cb && cb({ status: 200, data: {} }) } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postReportData: jest.fn(), getReportFile: jest.fn(() => Promise.resolve({ status: 204, data: null })) } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { convertDateToString: () => '2024-01-01', downloadFile: jest.fn() } }))
jest.mock('@/pages/winlossbytimezone/actions', () => ({ ActionCreators: { setDateRange: v => ({ type: 'A', v }), getUserGuideContent: () => ({ type: 'B' }), setSelectedCurrency: v => ({ type: 'C', v }), setGridData: v => ({ type: 'D', v }), changeGroupBy: v => ({ type: 'E', v }), changeIsConvertAll: v => ({ type: 'F', v }), setSelectedProducts: v => ({ type: 'G', v }), setSelectedBaseCurrency: v => ({ type: 'H', v }), changeIsIncludeDrawData: v => ({ type: 'I', v }), changeIsExcludeTest: v => ({ type: 'J', v }), setSelectedTimeZone: v => ({ type: 'K', v }), setSelectedReportBy: v => ({ type: 'L', v }), setBaseCurrencyList: v => ({ type: 'M', v }), setRequestParam: v => ({ type: 'N', v }) } }))
jest.mock('@/pages/winlossbytimezone/constants', () => ({ ReportBy: [{ label: 'x', value: 1 }], SettingConst: { GroupByProduct: 1 }, TimeZones: [{ label: 'tz', value: 7 }], ApiUrl: { DATA_URL: '/api', EXPORT_EXCEL_URL: '/exp' }, DateConstraint: { limitedMonthRange: 3, minDate: new Date(), maxDate: new Date(), today: new Date() } }))

import FormFilter from '@/pages/winlossbytimezone/components/FormFilter'

const base = {
  dateRange: { fromDate: new Date(), toDate: new Date() },
  selectedProduct: '1',
  userGuideContent: null,
  selectedBaseCurrency: { label: 'USD', value: 1 },
  selectedCurrency: { label: 'USD', value: 1 },
  isConvertAll: false,
  isIncludeDrawData: false,
  selectedTimeZone: { label: 'tz', value: 7 },
  selectedReportBy: { label: 'x', value: 1 },
  groupBy: 2,
  isExcludeTest: false,
  baseCurrencyList: [{ label: 'USD', value: -1 }],
  formData: { baseCurrencies: [{ label: 'USD', value: -1 }], currencies: [{ label: 'USD', value: 1 }, { label: 'All', value: 0 }], productOptions: [{ code: 'P', name: 'Product', status: '' }] }
}

const makeStore = (state = base) => createStore(s => s, state)

test('invalid date range shows alert', () => {
  const store = makeStore()
  render(<Provider store={store}><FormFilter /></Provider>)
  window.alert.mockClear()
  fireEvent.click(screen.getByTestId('date-range'))
  expect(window.alert).toHaveBeenCalled()
})

test('changing currency to All dispatches related actions', async () => {
  const store = makeStore()
  const spy = jest.spyOn(store, 'dispatch')
  render(<Provider store={store}><FormFilter /></Provider>)
  fireEvent.click(screen.getAllByTestId('report-select')[1])
  expect(spy).toHaveBeenCalledWith(expect.objectContaining({ type: 'H' }))
  expect(spy).toHaveBeenCalledWith(expect.objectContaining({ type: 'C' }))
  expect(spy).toHaveBeenCalledWith(expect.objectContaining({ type: 'M' }))
})

test('export shows alert when no content', async () => {
  const store = makeStore()
  render(<Provider store={store}><FormFilter /></Provider>)
  fireEvent.click(screen.getByTestId('export'))
  expect(window.alert).toHaveBeenCalled()
})









