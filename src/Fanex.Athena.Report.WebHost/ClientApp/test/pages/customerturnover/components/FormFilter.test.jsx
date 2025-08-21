import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, TreeViewSelect: p => <div data-testid={p.id || 'tree'} onClick={() => p.onChange && p.onChange(null, '1')} /> }))
jest.mock('@legion-lib/react-daterangepicker', () => ({ DateRange: p => <div data-testid="date-range" {...p} /> }))
jest.mock('@/components/ReportSelect', () => p => <select data-testid="report-select" onChange={() => p.onChange({ label: 'USD', value: 1 })} />)
jest.mock('@/components/CollapsiblePanel', () => p => <div>{p.children}{p.stickyFooter}</div>)
jest.mock('@/components/SubmitButton', () => p => <button data-testid="submit" onClick={p.onClick} disabled={p.disabled}>{p.children}</button>)
jest.mock('@/components/ExportExcel', () => p => <button data-testid="export" onClick={p.onClick} disabled={p.disabled}>E</button>)
jest.mock('@/components/auto-complete', () => p => <input data-testid="auto" onChange={e => p.onInput?.(e.target.value)} onBlur={e => p.onSelect?.(e.target.value)} />)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, getDateRangeResource: k => k, currentLanguage: 'en' } }))
jest.mock('@/hooks/useToggleRequest', () => () => ({ sendRequest: (fn, cb) => { cb && cb({ data: {} }) } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postReportData: jest.fn(), getReportFile: jest.fn(() => Promise.resolve({ status: 200, headers: { 'content-type': 'application/vnd.ms-excel' }, data: new Blob(['x']) })) } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { convertDateToString: d => '2024-01-01', downloadFile: jest.fn(), isEmptyObject: () => false } }))
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

describe('CustomerTurnover FormFilter', () => {
  test('submit disabled until form valid and enables export after submit', () => {
    const store = createMockStore({ ...baseState, selectedProduct: '', selectedTickets: [] })
    const { unmount } = render(<Provider store={store}><FormFilter /></Provider>)
    expect(screen.getByTestId('submit')).toBeDisabled()

    unmount()
    const store2 = createMockStore(baseState)
    render(<Provider store={store2}><FormFilter /></Provider>)
    fireEvent.click(screen.getByTestId('submit'))
    expect(screen.getByTestId('export')).not.toBeDisabled()
  })
})


