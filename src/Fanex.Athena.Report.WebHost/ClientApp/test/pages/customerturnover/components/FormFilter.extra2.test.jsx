import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-daterangepicker', () => ({ DateRange: p => <button data-testid="date-range" onClick={() => p.onChange({}, false)} /> }))
jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, TreeViewSelect: p => <div data-testid={p.id || 'tree'} onClick={() => p.onChange && p.onChange(null, '1')} /> }))
jest.mock('@/components/CollapsiblePanel', () => p => <div>{p.children}{p.stickyFooter}</div>)
jest.mock('@/components/ExportExcel', () => p => <button data-testid="export" onClick={p.onClick} disabled={p.disabled}>E</button>)
jest.mock('@/components/ReportSelect', () => p => <button data-testid="currency" onClick={() => p.onChange({ label: 'USD', value: 1 })} />)
jest.mock('@/components/SubmitButton', () => p => <button data-testid="submit" onClick={p.onClick} disabled={p.disabled}>{p.children}</button>)
jest.mock('@/components/auto-complete', () => ({ __esModule: true, default: p => <input data-testid="auto" onChange={e => p.onInput?.(e.target.value)} onBlur={e => p.onSelect?.(e.target.value)} /> }))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, getDateRangeResource: k => k, currentLanguage: 'en' } }))
jest.mock('@/hooks/useToggleRequest', () => () => ({ sendRequest: (fn, cb) => { cb && cb({ data: {} }) } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postReportData: jest.fn(), getReportFile: jest.fn(() => Promise.resolve({ status: 204, headers: {}, data: null })) } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { downloadFile: jest.fn() } }))
jest.mock('@/pages/customerturnover/actions', () => ({ __esModule: true, default: { setDateRange: v => ({ type: 'A', v }), setUsername: v => ({ type: 'B', v }), setReportBy: v => ({ type: 'C', v }), setSelectedCurrency: v => ({ type: 'D', v }), setSelectedProducts: v => ({ type: 'E', v }), setMiniumOdds: v => ({ type: 'F', v }), setSelectedTicket: v => ({ type: 'G', v }), setGridData: v => ({ type: 'H', v }), setRequestParam: v => ({ type: 'I', v }), setSelectedBettype: v => ({ type: 'J', v }), getUserGuideContent: () => ({ type: 'K' }) } }))
jest.mock('@/pages/customerturnover/common', () => ({ __esModule: true, default: { getSelectedBettypeXML: () => '<x/>' }, constants: { DateConstraint: { limitedMonthRange: 3 }, ApiUrl: { DATA_URL: '/api', EXPORT_EXCEL_URL: '/exp' }, TreeViewOption: {}, ReportByValue: { Daily: 1, Monthly: 2 }, DefaultPagingOption: { PageIndex: 1, PageSize: 50 }, MAX_ODDS_DIGITS: 3, CHILD_ID_PREFIX: 'c' } }))

import FormFilter from '@/pages/customerturnover/components/FormFilter'

const baseState = {
  formData: { productOptions: [{ id: 1, parentId: -1 }], productTreeViewOptions: [], productHasNoSport: false, currencyList: [{ label: 'USD', value: 1 }], bettypeList: [{ id: 1, value: 1, name: 'BT' }] },
  userGuideContent: null,
  dateRange: { fromDate: new Date(), toDate: new Date() },
  username: '',
  reportBy: 1,
  bettypeList: [{ id: 1 }],
  selectedCurrency: { label: 'USD', value: 1 },
  selectedProduct: '1',
  minimumOdds: '',
  selectedTickets: [{ label: 'Won', value: 1 }],
  selectedBettype: '1',
  requestParam: { PageSize: 50 }
}

const createMockStore = (state = baseState) => createStore(s => s, state)

test('invalid date alerts and submit enables when valid', () => {
  const store = createMockStore({ ...baseState, selectedProduct: '', selectedTickets: [] })
  render(<Provider store={store}><FormFilter /></Provider>)
  window.alert.mockClear()
  fireEvent.click(screen.getByTestId('date-range'))
  expect(window.alert).toHaveBeenCalled()
  const store2 = createMockStore(baseState)
  const { unmount } = render(<Provider store={store2}><FormFilter /></Provider>)
  expect(screen.getAllByTestId('submit')[1]).toBeEnabled()
  unmount()
})


