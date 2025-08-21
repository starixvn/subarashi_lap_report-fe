import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-daterangepicker', () => ({ DateRange: p => <div data-testid="date-range" {...p} /> }))
jest.mock('@/components/CollapsiblePanel', () => p => <div>{p.children}{p.stickyFooter}</div>)
jest.mock('@/components/ExportExcel', () => p => <button data-testid="export" onClick={p.onClick} disabled={p.disabled}>E</button>)
jest.mock('@/components/ReportSelect', () => p => <select data-testid="report-select" onChange={() => p.onChange({ label: 'USD', value: 1 })} />)
jest.mock('@/components/SubmitButton', () => p => <button data-testid="submit" onClick={p.onClick} disabled={p.disabled}>{p.children}</button>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, getDateRangeResource: k => k } }))
jest.mock('@/hooks/useSubsidiarySearch', () => () => ({ defaultSelectedSubsidiary: '', isShowSubsidiaryDropdown: false, isShowSubsidiarySearchCheckBox: false, isSubsidiarySearch: false }))
jest.mock('@/hooks/useToggleRequest', () => () => ({ sendRequest: (fn, cb) => { cb && cb({ data: [] }) } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postReportData: jest.fn(), getReportFile: jest.fn(() => Promise.resolve({ status: 200, data: new Blob(['x']) })) } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { convertDateToString: d => '2024-01-01', downloadFile: jest.fn(), getLrfSubsidiary: () => ({}) } }))
jest.mock('@/pages/livereport/summary/actions', () => ({ ActionCreators: { setSelectedStatus: v => ({ type: 'A', v }), setDateRange: v => ({ type: 'B', v }), setSelectedCurrency: v => ({ type: 'C', v }), setSelectedBaseCurrency: v => ({ type: 'D', v }), setRequestParam: v => ({ type: 'E', v }), getUserGuideContent: () => ({ type: 'F' }), setBaseCurrencyList: v => ({ type: 'G', v }), setSubsidiaryList: v => ({ type: 'H', v }), setSubsidiarySearch: v => ({ type: 'I', v }), setGridData: v => ({ type: 'J', v }), setWhiteLabelTreeList: v => ({ type: 'K', v }), setSelectedProductCode: v => ({ type: 'L', v }) } }))
jest.mock('@/pages/livereport/summary/common', () => ({ __esModule: true, default: { getSubsidiarySelected: (t, s) => t }, constants: { DateConstraint: { minDate: new Date(), maxDate: new Date(), limitedMonthRange: 3, firstDayOfWeek: 1 }, ApiUrl: { DATA_URL: '/api', EXPORT_EXCEL_URL: '/exp' } } }))

import FormFilter from '@/pages/livereport/summary/components/FormFilter'

const base = {
  dateRange: { fromDate: new Date(), toDate: new Date() },
  selectedCurrency: { label: 'USD', value: 1 },
  baseCurrencyList: [{ label: 'USD', value: -1 }],
  selectedBaseCurrency: { label: 'USD', value: -1 },
  selectedStatus: { label: 'Live', value: 1 },
  selectedSubsidiary: '',
  whiteLabelTreeList: [],
  selectedProductCode: null,
  userGuideContent: null,
  formData: { liveStatuses: [{ label: 'Live', value: 1 }], currencies: [{ label: 'USD', value: 1 }], isFakeLicensee: true }
}

const makeStore = (s = base) => createStore(r => r, s)

test('LiveReport FormFilter enables submit and export when valid', () => {
  const store = makeStore()
  render(<Provider store={store}><FormFilter /></Provider>)
  expect(screen.getByTestId('submit')).toBeEnabled()
  expect(screen.getByTestId('export')).toBeEnabled()
  fireEvent.click(screen.getByTestId('submit'))
})


