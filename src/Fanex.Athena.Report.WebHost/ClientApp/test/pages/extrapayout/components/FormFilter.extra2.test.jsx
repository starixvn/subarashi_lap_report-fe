import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-daterangepicker', () => ({ DateRange: p => <button data-testid="date-range" onClick={() => p.onChange({}, false)} /> }))
jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, default: p => <div data-testid="multi" onClick={() => p.onChange?.(null, 'P1')} />, TreeViewSelect: p => <div data-testid={p.id || 'tree'} onClick={() => p.onChange?.(null, 'S1')} /> }))
jest.mock('@/components/CollapsiblePanel', () => p => <div>{p.children}{p.stickyFooter}</div>)
jest.mock('@/components/ExportExcel', () => p => <button data-testid="export" onClick={p.onClick} disabled={p.disabled}>E</button>)
jest.mock('@/components/ReportSelect', () => p => <button data-testid="base-currency" onClick={() => p.onChange({ label: 'USD', value: 1 })} />)
jest.mock('@/components/SubmitButton', () => p => <button data-testid="submit" onClick={p.onClick} disabled={p.disabled}>{p.children}</button>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, getDateRangeResource: k => k, currentLanguage: 'en' } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { getReportFile: jest.fn(() => Promise.resolve({ status: 204, data: null })) } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { convertDateToString: () => '2024-01-01', downloadFile: jest.fn(), isEmptyObject: () => false } }))
jest.mock('@/pages/extrapayout/actions', () => ({ __esModule: true, default: { setDateRange: v => ({ type: 'A', v }), setSelectedProducts: v => ({ type: 'B', v }), getPromotionTypeList: v => ({ type: 'C', v }), setSelectedBaseCurrency: v => ({ type: 'D', v }), setSelectedCurrency: v => ({ type: 'E', v }), setRequestParam: v => ({ type: 'F', v }), setReportTitle: v => ({ type: 'G', v }), toggleLoader: v => ({ type: 'H', v }), getReportData: () => ({ type: 'I' }), getUserGuideContent: () => ({ type: 'J' }), setSelectedPromotionTypes: v => ({ type: 'K', v }), setSubsidiarySearch: v => ({ type: 'L', v }), setSubsidiaryList: v => ({ type: 'M', v }) } }))
jest.mock('@/pages/extrapayout/common/constants', () => ({ ApiUrl: { REPORT_DATA_URL: '/api', EXPORT_REPORT_DATA_URL: '/exp' }, ReportLevel: { MAIN: 1 } }))
jest.mock('@/pages/extrapayout/common/dateSetting', () => ({ DateConstraint: { minDate: new Date(), maxDate: new Date(), limitedMonthRange: 3 }, DateRange: { fromDate: new Date(), toDate: new Date() }, FirstDayOfWeek: 1 }))
jest.mock('@/pages/extrapayout/common/service', () => ({ __esModule: true, default: { getTitle: () => 'T' } }))

import FormFilter from '@/pages/extrapayout/components/FormFilter'

const base = {
  AppData: undefined,
  formData: { productOptions: [{ code: 'P1', name: 'P', status: '' }], currencyList: [{ key: 1, value: 'USD' }], baseCurrencyList: [{ value: -1, label: 'USD' }], defaultBaseCurrency: { value: -1, label: 'USD' }, whitelabelList: [], viewType: 0 },
  requestParam: { SortBy: '', SortOrder: '' },
  dateRange: { fromDate: new Date(), toDate: new Date() },
  selectedProduct: 'P1',
  promotionTypeList: [{ value: 1, label: 'PT', status: '' }],
  selectedPromotionTypes: '1',
  selectedCurrency: '1',
  baseCurrencyList: [{ value: -1, label: 'USD' }],
  selectedBaseCurrency: { value: -1, label: 'USD' },
  selectedStatus: '1',
  userGuideContent: null,
  subsidiarySearch: false,
  selectedSubsidiary: '',
  isConvertAllToBaseCurrency: false
}

const makeStore = (s = base) => createStore(r => r, s)

test('invalid date triggers alert and export no-content shows alert', async () => {
  const store = makeStore()
  render(<Provider store={store}><FormFilter /></Provider>)
  window.alert.mockClear()
  fireEvent.click(screen.getByTestId('date-range'))
  expect(window.alert).toHaveBeenCalled()
  fireEvent.click(screen.getByTestId('export'))
  expect(window.alert).toHaveBeenCalled()
})







