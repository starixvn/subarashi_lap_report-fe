import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@/pages/livereport/summary/gridUltility', () => ({ LiveReportTable: ({ tableTitle }) => <div data-testid="table" data-title={tableTitle} /> }))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: (k) => k } }))
jest.mock('@/pages/livereport/summary/components/DataGrid/SummaryDataGrid/GridBuilder', () => ({ BuildSummaryHeaders: () => [], BuildSummaryBody: () => [], BuildSummaryFooter: () => [] }))
jest.mock('@/hooks/useToggleRequest', () => () => ({ sendRequest: jest.fn() }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postReportData: jest.fn(() => Promise.resolve({ data: {} })) } }))
jest.mock('@/pages/livereport/summary/common', () => ({ constants: { ApiUrl: { DETAIL_DATA_URL: '/url' } } }))
jest.mock('@/pages/livereport/summary/actions', () => ({ ActionCreators: { setGridData: jest.fn(), setRequestParam: jest.fn(), setSelectedProductCode: jest.fn() } }))

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn((sel) => sel({
    gridData: { summary: [{ turnOver: 1, betCount: 2, licenseeWinLoss: 3, licenseeComm: 4, amountDue: 5, customerWinLoss: 6, customerComm: 7, customerTotal: 8 }] },
    formData: { hasAmountDueToColumn: false, isAllowedCustomerCommission: false },
    requestParam: {},
    selectedProductCode: 1,
  }))
}))

import Comp from '@/pages/livereport/summary/components/DataGrid/SummaryDataGrid'

test('SummaryDataGrid renders table when data present', () => {
  render(<Comp />)
  expect(screen.getByTestId('table')).toBeInTheDocument()
})


