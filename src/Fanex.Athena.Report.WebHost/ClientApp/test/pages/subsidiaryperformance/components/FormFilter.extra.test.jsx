import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, default: p => <div data-testid="multi" onClick={() => p.onChange && p.onChange(null, 'SB')} />, TreeViewSelect: p => <div data-testid={p.id || 'tree'} onClick={() => p.onChange && p.onChange(null, '1', [{ checked: true, level: 1, parentKey: 'W1' }])} /> }))
jest.mock('@legion-lib/react-daterangepicker', () => ({ DateRange: p => <div data-testid="date-range" {...p} /> }))
jest.mock('@/components/ReportSelect', () => p => <select data-testid="report-select" onChange={() => p.onChange({ label: 'USD', value: 1 })} />)
jest.mock('@/components/CollapsiblePanel', () => p => <div>{p.children}{p.stickyFooter}</div>)
jest.mock('@/components/ExportExcel', () => p => <button data-testid="export" onClick={p.onClick} disabled={p.disabled}>E</button>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, getDateRangeResource: k => k, currentLanguage: 'en' } }))
jest.mock('@/hooks/useToggleRequest', () => () => ({ sendRequest: (fn, cb) => { cb && cb({ status: 200, data: new Blob(['x']) }) } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { convertDateToString: d => '2024-01-01', downloadFile: jest.fn() } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { getReportFile: jest.fn(() => Promise.resolve({ status: 200, data: new Blob(['x']) })) } }))
jest.mock('@/pages/subsidiaryperformance/actions', () => ({ __esModule: true, default: { setDateRange: v => ({ type: 'A', v }), fetchGridData: (u,p) => ({ type: 'B', u, p }), setSelectedProducts: v => ({ type: 'C', v }), setSelectedBaseCurrency: v => ({ type: 'D', v }), setSelectedWhiteLabel: v => ({ type: 'E', v }), setSelectedSubsidiary: v => ({ type: 'F', v }), changeSeparateSabaWinLoss: v => ({ type: 'G', v }), changeIncludeDrawData: v => ({ type: 'H', v }), changeExcludeTest: v => ({ type: 'I', v }), changeConvertAll: v => ({ type: 'J', v }) } }))
jest.mock('@/pages/subsidiaryperformance/common', () => ({ __esModule: true, constants: { DateConstraint: { minDate: new Date(), maxDate: new Date(), today: new Date(), limitedMonthRange: 3 }, ApiUrl: { DATA_URL: '/api', EXPORT_SUMMARY_EXCEL_URL: '/exp', EXPORT_DETAIL_EXCEL_URL: '/expd' } } }))

import FormFilter from '@/pages/subsidiaryperformance/components/FormFilter'

const state = {
  dateRange: { fromDate: new Date(), toDate: new Date() },
  selectedProduct: 'SB',
  selectedBaseCurrency: { label: 'USD', value: 1 },
  requestParam: {},
  convertAll: false,
  includeDrawData: false,
  excludeTest: false,
  separateSabaWinLoss: false,
  selectedWhiteLabel: '',
  selectedSubsidiary: '1',
  formData: { baseCurrencies: [{ label: 'USD', value: 1 }], products: [{ code: 'SB', name: 'Sportsbook', status: '' }], subsidiaryList: [{ value: '1', name: 'S', checked: true }], viewType: 1, isHideSaba: false }
}

const makeStore = (s = state) => createStore(r => r, s)

test('SubsidiaryPerformance FormFilter enables export when valid and handles submit', () => {
  const store = makeStore()
  render(<Provider store={store}><FormFilter /></Provider>)
  expect(screen.getByTestId('export')).toBeEnabled()
  fireEvent.click(screen.getByTestId('export'))
})


