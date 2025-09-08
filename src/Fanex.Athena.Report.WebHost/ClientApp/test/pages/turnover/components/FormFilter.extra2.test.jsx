import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-daterangepicker', () => ({ DateRange: p => <button data-testid="date-range" onClick={() => p.onChange({ fromDate: new Date(), toDate: new Date() })} /> }))
jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, default: p => <div data-testid="multi" onClick={() => p.onChange?.(null, 'P')} /> }))
jest.mock('@/components/ReportSelect', () => p => <button data-testid="currency" onClick={() => p.onChange({ label: 'ALL', value: 0 })} />)
jest.mock('@/components/CollapsiblePanel', () => p => <div>{p.children}{p.stickyFooter}</div>)
jest.mock('@/components/ExportExcel', () => p => <button data-testid="export" onClick={p.onClick} disabled={p.disabled}>E</button>)
jest.mock('@/components/UserGuide', () => p => <button data-testid="guide" onClick={p.onClick}>G</button>)
jest.mock('@/components/month-picker', () => ({ __esModule: true, default: p => <div data-testid="month-picker" /> }))
jest.mock('@/components/auto-complete', () => ({ __esModule: true, default: p => <input data-testid="auto" onChange={e => p.onInput?.(e.target.value)} onBlur={e => p.onSelect?.(e.target.value)} /> }))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, getDateRangeResource: k => k, currentLanguage: 'en' } }))
jest.mock('@/hooks/useToggleRequest', () => () => ({
  sendRequest: (fn, cb) => {
    fn().then(response => {
      cb && cb(response)
    })
  }
}))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postReportData: jest.fn(), getReportFile: jest.fn(() => Promise.resolve({ status: 204, data: null })) } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { downloadFile: jest.fn() } }))
jest.mock('@/pages/turnover/actions', () => ({ ActionCreators: { setSelectedProducts: v => ({ type: 'A', v }), setGridData: v => ({ type: 'B', v }), setSelectedCurrency: v => ({ type: 'C', v }), setSelectedBaseCurrency: v => ({ type: 'D', v }), setBaseCurrencyList: v => ({ type: 'E', v }), setRequestParam: v => ({ type: 'F', v }), setDateRange: v => ({ type: 'G', v }), getUserGuideContent: () => ({ type: 'H' }), setUsername: v => ({ type: 'I', v }) } }))
jest.mock('@/pages/turnover/common', () => ({ constants: { DateConstraint: { minDate: new Date(), maxDate: new Date(), fromDateOption: {}, toDateOption: {}, monthOption: {} }, ApiUrl: { DATA_URL: '/api', EXPORT_EXCEL_URL: '/exp' }, ExcludeTestDataOptions: [{ value: 'true' }, { value: 'false' }] } }))

import FormFilter from '@/pages/turnover/components/FormFilter'

const initialState = {
  dateRange: { fromDate: new Date(), toDate: new Date() },
  formData: { productOptions: [{ code: 'P', name: 'Product', status: '' }], currencies: [{ label: 'USD', value: 1 }], baseCurrencies: [{ label: 'USD', value: -1 }] },
  userGuideContent: null,
  selectedProduct: [],
  selectedCurrency: { label: 'USD', value: 1 },
  baseCurrencyList: [{ label: 'USD', value: -1 }],
  selectedBaseCurrency: { label: 'USD', value: -1 },
  username: ''
}

const createMockStore = (state = initialState) => createStore(s => s, state)

test('currency change to ALL adjusts base currency list and disables/enable export', async () => {
  const store = createMockStore({ ...initialState, selectedProduct: [{ code: 'P', name: 'Product' }] })
  const spy = jest.spyOn(store, 'dispatch')
  render(<Provider store={store}><FormFilter /></Provider>)
  window.alert.mockClear()
  fireEvent.click(screen.getAllByTestId('currency')[0])
  expect(spy).toHaveBeenCalledWith(expect.objectContaining({ type: 'D' }))
  expect(spy).toHaveBeenCalledWith(expect.objectContaining({ type: 'C' }))
  expect(spy).toHaveBeenCalledWith(expect.objectContaining({ type: 'E' }))
  fireEvent.click(screen.getByTestId('export'))
  await Promise.resolve()
  expect(window.alert).toHaveBeenCalled()
})


