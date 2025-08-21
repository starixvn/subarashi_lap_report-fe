import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, default: p => <div data-testid="multi" onClick={() => p.onChange && p.onChange(null, 'P1')} /> }))
jest.mock('@/components/month-picker', () => p => <div data-testid="month" {...p} />)
jest.mock('@/components/CollapsiblePanel', () => p => <div>{p.children}{p.stickyFooter}</div>)
jest.mock('@/components/ExportExcel', () => p => <button data-testid="export" onClick={p.onClick} disabled={p.disabled}>E</button>)
jest.mock('@/components/SubmitButton', () => p => <button data-testid="submit" onClick={p.onClick} disabled={p.disabled}>{p.children}</button>)
jest.mock('@/components/auto-complete', () => p => <input data-testid="auto" onChange={e => p.onInput?.(e.target.value)} onBlur={e => p.onSelect?.(e.target.value)} />)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, currentLanguage: 'en' } }))
jest.mock('@/hooks/useToggleRequest', () => () => ({ sendRequest: (fn, cb) => { cb && cb({ data: {} }) } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postReportData: jest.fn(), getReportFile: jest.fn(() => Promise.resolve({ status: 200, data: new Blob(['x']) })) } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { convertDateToString: v => '2024-01-01', downloadFile: jest.fn() } }))
jest.mock('@/pages/turnover/actions', () => ({ ActionCreators: { setSelectedProducts: v => ({ type: 'A', v }), setGridData: v => ({ type: 'B', v }), setSelectedCurrency: v => ({ type: 'C', v }), setSelectedBaseCurrency: v => ({ type: 'D', v }), setBaseCurrencyList: v => ({ type: 'E', v }), setRequestParam: v => ({ type: 'F', v }), setDateRange: v => ({ type: 'G', v }), getUserGuideContent: () => ({ type: 'H' }), setUsername: v => ({ type: 'I', v }) } }))
jest.mock('@/pages/turnover/common', () => ({ __esModule: true, constants: { DateConstraint: { minDate: new Date(), maxDate: new Date(), fromDateOption: {}, toDateOption: {}, monthOption: {} }, ApiUrl: { DATA_URL: '/api', EXPORT_EXCEL_URL: '/exp', SEARCH_CUSTOMER: '/search' }, ExcludeTestDataOptions: [{ value: 'true' }] } }))

import FormFilter from '@/pages/turnover/components/FormFilter'

const state = {
  formData: { currencies: [{ label: 'USD', value: 1 }], baseCurrencies: [{ label: 'USD', value: -1 }], productOptions: [{ code: 'P1', name: 'Product', status: '' }], isFakeLicensee: false },
  username: '',
  dateRange: { fromDate: new Date(), toDate: new Date() },
  userGuideContent: null,
  selectedProduct: [{ code: 'P1' }],
  selectedCurrency: { label: 'USD', value: 1 },
  baseCurrencyList: [{ label: 'USD', value: -1 }],
  selectedBaseCurrency: { label: 'USD', value: -1 }
}

const makeStore = (s = state) => createStore(r => r, s)

test('Turnover FormFilter shows enabled export and submit when valid', () => {
  const store = makeStore()
  render(<Provider store={store}><FormFilter /></Provider>)
  expect(screen.getByTestId('submit')).toBeEnabled()
  expect(screen.getByTestId('export')).toBeEnabled()
  fireEvent.click(screen.getByTestId('submit'))
})


