import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-daterangepicker', () => ({ DatePicker: (p) => <input data-testid="date-picker" onChange={() => p.onChange({ format: () => '01/01/2024' })} /> }))
jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, default: (p) => <select data-testid="multi" onChange={e => p.onChange(null, e.target.value)}><option value="SB">SB</option></select> }))
jest.mock('@/components/ReportSelect', () => (p) => <select data-testid="report-select" onChange={() => p.onChange({ label: 'USD', value: 1 })}></select>)
jest.mock('@/components/ExportExcel', () => (p) => <button data-testid="export" onClick={p.onClick} disabled={p.disabled}>E</button>)
jest.mock('@/components/UserGuide', () => (p) => <button data-testid="guide" onClick={p.onClick}>G</button>)
jest.mock('@/components/SubmitButton', () => (p) => <button data-testid="submit" onClick={p.onClick} disabled={p.disabled}>{p.children}</button>)
jest.mock('@/components/CollapsiblePanel', () => (p) => <div data-testid="panel">{p.children}</div>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/hooks/useToggleRequest', () => () => ({ sendRequest: (fn, cb) => { cb && cb({ data: {} }) } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postReportData: jest.fn(), getReportFile: jest.fn() } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { getLrfSubsidiary: () => ({}), downloadFile: jest.fn() } }))
jest.mock('@/pages/matchwinloss/actions', () => ({ ActionCreators: { setSelectedProducts: () => ({ type: 'A' }), setSelectedDate: () => ({ type: 'B' }), setSelectedCurrency: () => ({ type: 'C' }), setSelectedBaseCurrency: () => ({ type: 'D' }), setRequestParam: () => ({ type: 'E' }), getUserGuideContent: () => ({ type: 'F' }), setBaseCurrencyList: () => ({ type: 'G' }), setGridData: () => ({ type: 'H' }) } }))
jest.mock('@/pages/matchwinloss/common', () => ({ __esModule: true, default: { convertToReportData: d => d }, constants: { DateConstraint: {}, ApiUrl: { DATA_URL: '/d', EXPORT_EXCEL_URL: '/e' }, FirstDayOfWeek: 1 } }))

import FormFilter from '@/pages/matchwinloss/components/FormFilter'

const initialState = {
  selectedDate: '01/01/2024',
  selectedCurrency: { label: 'USD', value: 1 },
  selectedBaseCurrency: { label: 'USD', value: 1 },
  baseCurrencyList: [{ label: 'USD', value: 1 }],
  selectedProduct: [{ code: 'SB', name: 'Sportsbook' }],
  formData: { productOptions: [{ code: 'SB', name: 'Sportsbook' }], currencies: [{ label: 'USD', value: 1 }], baseCurrencies: [{ label: 'USD', value: 1 }, { label: 'Default', value: -1 }], isSelfMode: false }
}

const createMockStore = (state = initialState) => createStore(s => s, state)

describe('MatchWinLoss FormFilter', () => {
  test('renders and submits', () => {
    const store = createMockStore()
    render(<Provider store={store}><FormFilter /></Provider>)
    expect(screen.getByTestId('submit')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('submit'))
  })
})
