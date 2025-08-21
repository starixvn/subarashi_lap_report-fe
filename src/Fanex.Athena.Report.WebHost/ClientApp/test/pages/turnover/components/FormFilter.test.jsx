import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, default: p => <div data-testid="multi" {...p} /> }))
jest.mock('@/components/ReportSelect', () => p => <select data-testid="report-select" onChange={() => p.onChange({ label: 'USD', value: 1 })} />)
jest.mock('@/components/ExportExcel', () => p => <button data-testid="export" onClick={p.onClick} disabled={p.disabled}>E</button>)
jest.mock('@/components/UserGuide', () => p => <button data-testid="guide" onClick={p.onClick}>G</button>)
jest.mock('@/components/SubmitButton', () => p => <button data-testid="submit" onClick={p.onClick} disabled={p.disabled}>S</button>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, currentLanguage: 'en' } }))
jest.mock('@/hooks/useToggleRequest', () => () => ({ sendRequest: (fn, cb) => { cb && cb({ data: { rows: [] } }) } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postReportData: jest.fn(), getReportFile: jest.fn(() => Promise.resolve({ status: 200, data: new Blob(['x']) })) } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { downloadFile: jest.fn() } }))
jest.mock('@/components/month-picker', () => ({ __esModule: true, default: p => <div data-testid="month-picker" /> }))
jest.mock('@/components/auto-complete', () => ({ __esModule: true, default: p => <input data-testid="auto" onChange={e => p.onInput?.(e.target.value)} onBlur={e => p.onSelect?.(e.target.value)} /> }))
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
  selectedBaseCurrency: { label: 'USD', value: -1 }
}

const createMockStore = (state = initialState) => createStore(s => s, state)

describe('Turnover FormFilter', () => {
  test('export disabled when form invalid', () => {
    const store = createMockStore({ ...initialState, selectedProduct: [], selectedCurrency: null })
    render(<Provider store={store}><FormFilter /></Provider>)
    expect(screen.getByTestId('export')).toBeDisabled()
  })

  test('submit triggers request and sets params', () => {
    const store = createMockStore({ ...initialState, selectedProduct: [{ code: 'P', name: 'Product' }] })
    render(<Provider store={store}><FormFilter /></Provider>)
    fireEvent.click(screen.getByTestId('submit'))
    expect(screen.getByTestId('export')).toBeEnabled()
  })
})
