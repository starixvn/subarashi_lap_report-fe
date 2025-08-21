import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-daterangepicker', () => ({ DateRange: p => <div data-testid="date-range" {...p} /> }))
jest.mock('@/components/CollapsiblePanel', () => p => <div>{p.children}{p.stickyFooter}</div>)
jest.mock('@/components/ExportExcel', () => p => <button data-testid="export" onClick={p.onClick} disabled={p.disabled}>E</button>)
jest.mock('@/components/UserGuide', () => p => <button data-testid="guide" onClick={p.onClick}>G</button>)
jest.mock('@/components/SubmitButton', () => p => <button data-testid="submit" onClick={p.onClick}>{p.children}</button>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, getDateRangeResource: k => k } }))
jest.mock('@/hooks/useToggleRequest', () => () => ({ sendRequest: (fn, cb) => { cb && cb({ data: {} }) } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postReportData: jest.fn(), getProxyFile: jest.fn(() => Promise.resolve({ status: 200, data: new Blob(['x']) })) } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { convertDateToString: () => '2024-01-01', downloadFile: jest.fn() } }))
jest.mock('@/pages/weeklylivematch/actions', () => ({ ActionCreators: { setDateRange: v => ({ type: 'A', v }), setGridData: v => ({ type: 'B', v }), setRequestParam: v => ({ type: 'C', v }), getUserGuideContent: () => ({ type: 'D' }) } }))
jest.mock('@/pages/weeklylivematch/constants', () => ({ __esModule: true, default: { get DateRange() { return { fromDate: new Date(), toDate: new Date() } } }, ApiUrl: { REPORT_DATA_URL: '/api', EXPORT_REPORT_DATA_URL: '/exp' }, DateConstraint: { limitedMonthRange: 3, minDate: new Date(), maxDate: new Date(), today: new Date() }, FirstDayOfWeek: 1 }))
jest.mock('@/pages/weeklylivematch/constants/index', () => ({ __esModule: true, default: { ApiUrl: { REPORT_DATA_URL: '/api', EXPORT_REPORT_DATA_URL: '/exp' }, DateConstraint: { limitedMonthRange: 3, minDate: new Date(), maxDate: new Date(), today: new Date() }, FirstDayOfWeek: 1, DateRange: { fromDate: new Date(), toDate: new Date() } } }))

import FormFilter from '@/pages/weeklylivematch/components/FormFilter'

const base = {
  userGuideContent: null,
  dateRange: { fromDate: new Date(), toDate: new Date() },
  requestParam: {}
}
const makeStore = (state = base) => createStore(s => s, state)

describe('WeeklyLiveMatch FormFilter extra', () => {
  test('submit and export work', () => {
    const store = makeStore()
    render(<Provider store={store}><FormFilter /></Provider>)
    fireEvent.click(screen.getByTestId('submit'))
    expect(screen.getByTestId('export')).toBeEnabled()
  })
})


