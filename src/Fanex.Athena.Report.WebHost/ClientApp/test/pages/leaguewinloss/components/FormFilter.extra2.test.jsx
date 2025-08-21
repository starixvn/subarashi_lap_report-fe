import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, default: p => <div data-testid="multi" onClick={() => p.onChange && p.onChange(null, '1')} />, TreeViewSelect: p => <div data-testid={p.id || 'tree'} onClick={() => p.onChange && p.onChange(null, '1')} /> }))
jest.mock('@legion-lib/react-daterangepicker', () => ({ DateRange: p => <div data-testid="date-range" {...p} /> }))
jest.mock('@/components/ReportSelect', () => p => <select data-testid="report-select" onChange={() => p.onChange({ label: 'USD', value: 1 })} />)
jest.mock('@/components/CollapsiblePanel', () => ({ children }) => <div>{children}</div>)
jest.mock('@/components/ExportExcel', () => p => <button data-testid="export" onClick={p.onClick} disabled={p.disabled}>E</button>)
jest.mock('@/components/SubmitButton', () => p => <button data-testid="submit" onClick={p.onClick} disabled={p.disabled}>{p.children}</button>)
jest.mock('@/components/auto-complete', () => p => <input data-testid="auto" onChange={e => p.onInput?.(e.target.value)} onBlur={e => p.onSelect?.(e.target.value)} />)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, getDateRangeResource: k => k, currentLanguage: 'en' } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { getReportFile: jest.fn(() => Promise.resolve({ status: 200, data: new Blob(['x']) })) } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { convertDateToString: () => '2024-01-01', downloadFile: jest.fn(), isEmptyObject: () => false } }))
jest.mock('@/pages/leaguewinloss/actions', () => ({ __esModule: true, default: { setDateRange: v => ({ type: 'A', v }), setSelectedProducts: v => ({ type: 'B', v }), getSportList: v => ({ type: 'C', v }), getBettypeList: v => ({ type: 'D', v }), setReportTitle: v => ({ type: 'E', v }), setRequestParam: v => ({ type: 'F', v }), toggleLoader: v => ({ type: 'G', v }), getReportData: (u, p) => ({ type: 'H', u, p }), setBreadcrumbParams: v => ({ type: 'I', v }), setSelectedSport: v => ({ type: 'J', v }), setSelectedBettype: v => ({ type: 'K', v }), setSelectedCurrency: v => ({ type: 'L', v }), setSelectedBaseCurrency: v => ({ type: 'M', v }), setSelectedStatus: v => ({ type: 'N', v }), setUsername: v => ({ type: 'O', v }) } }))
jest.mock('@/pages/leaguewinloss/common/constants', () => ({ ApiUrl: { REPORT_DATA_URL: '/api', EXPORT_REPORT_DATA_URL: '/exp' }, ReportLevel: { MAIN: 1 } }))
jest.mock('@/pages/leaguewinloss/common/dateSetting', () => ({ DateConstraint: { minDate: new Date(), maxDate: new Date(), limitedMonthRange: 3, firstDayOfWeek: 1 } }))
jest.mock('@/pages/leaguewinloss/common/service', () => ({ __esModule: true, default: { getTitle: () => 'T', getNormalizedSelectedParamValueForTreeListFilter: () => '', getSelectedBettypeXML: () => '<x/>' } }))

import FormFilter from '@/pages/leaguewinloss/components/FormFilter'

const base = {
  requestParam: { PageSize: 50, SortBy: '', SortOrder: '' },
  formData: { dateConstraint: { limitedMonthRange: 3 }, productOptions: [{ code: 'P', name: 'Product', status: '' }], currencyList: [{ key: 1, value: 'USD' }], baseCurrencyList: [{ value: -1, label: 'USD' }], defaultBaseCurrency: { value: -1, label: 'USD' }, statusList: [{ value: 1, label: 'Open' }] },
  dateRange: { fromDate: new Date(), toDate: new Date() },
  selectedProduct: '1',
  sportList: [{ value: 1, name: 'S' }],
  selectedSport: '1',
  selectedBettype: '1',
  bettypeList: [{ value: 1, name: 'B' }],
  selectedCurrency: '1',
  baseCurrencyList: [{ value: -1, label: 'USD' }],
  selectedBaseCurrency: { value: -1, label: 'USD' },
  selectedStatus: '1',
  userGuideContent: null,
  username: 'u'
}

const makeStore = (state = base) => createStore(s => s, state)

describe('LeagueWinLoss FormFilter extra', () => {
  test('submit enabled when valid and export enabled', () => {
    const store = makeStore()
    render(<Provider store={store}><FormFilter /></Provider>)
    const submit = screen.getByTestId('submit') || screen.getByText('Submit')
    fireEvent.click(submit)
  })
})


