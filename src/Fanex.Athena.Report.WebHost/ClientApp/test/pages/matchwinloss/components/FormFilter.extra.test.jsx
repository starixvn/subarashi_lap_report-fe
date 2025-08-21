import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-daterangepicker', () => ({ DatePicker: p => <div data-testid="date" {...p} /> }))
jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, default: p => <div data-testid="multi" onClick={() => p.onChange && p.onChange(null, 'P1')} /> }))
jest.mock('@/components/CollapsiblePanel', () => p => <div>{p.children}{p.stickyFooter}</div>)
jest.mock('@/components/ExportExcel', () => p => <button data-testid="export" onClick={p.onClick} disabled={p.disabled}>E</button>)
jest.mock('@/components/ReportSelect', () => p => <select data-testid="report-select" onChange={() => p.onChange({ label: 'USD', value: 1 })} />)
jest.mock('@/components/SubmitButton', () => p => <button data-testid="submit" onClick={p.onClick} disabled={p.disabled}>{p.children}</button>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, currentLanguage: 'en' } }))
jest.mock('@/hooks/useToggleRequest', () => () => ({ sendRequest: (fn, cb) => { cb && cb({ data: {} }) } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postReportData: jest.fn(), getReportFile: jest.fn(() => Promise.resolve({ status: 200, data: new Blob(['x']) })) } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { getLrfSubsidiary: () => ({}), downloadFile: jest.fn() } }))
jest.mock('@/pages/matchwinloss/actions', () => ({ ActionCreators: { setSelectedProducts: v => ({ type: 'A', v }), setSelectedDate: v => ({ type: 'B', v }), setSelectedCurrency: v => ({ type: 'C', v }), setSelectedBaseCurrency: v => ({ type: 'D', v }), setRequestParam: v => ({ type: 'E', v }), getUserGuideContent: () => ({ type: 'F' }), setBaseCurrencyList: v => ({ type: 'G', v }), setGridData: v => ({ type: 'H', v }) } }))
jest.mock('@/pages/matchwinloss/common', () => ({ __esModule: true, default: { convertToReportData: d => d }, constants: { DateConstraint: { minDate: new Date(), maxDate: new Date() }, ApiUrl: { DATA_URL: '/api', EXPORT_EXCEL_URL: '/exp' }, FirstDayOfWeek: 1 } }))

import FormFilter from '@/pages/matchwinloss/components/FormFilter'

const base = {
  selectedDate: '01/01/2024',
  selectedCurrency: { label: 'USD', value: 1 },
  baseCurrencyList: [{ label: 'USD', value: -1 }],
  selectedBaseCurrency: { label: 'USD', value: -1 },
  selectedProduct: [{ code: 'P1' }],
  formData: { productOptions: [{ code: 'P1', name: 'P', status: '' }], isSelfMode: false, baseCurrencies: [{ label: 'USD', value: -1 }], currencies: [{ label: 'USD', value: 1 }] },
  userGuideContent: null
}

const makeStore = (s = base) => createStore(r => r, s)

test('MatchWinLoss FormFilter enables submit and export when valid', () => {
  const store = makeStore()
  render(<Provider store={store}><FormFilter /></Provider>)
  expect(screen.getByTestId('submit')).toBeEnabled()
  expect(screen.getByTestId('export')).toBeEnabled()
  fireEvent.click(screen.getByTestId('submit'))
})


