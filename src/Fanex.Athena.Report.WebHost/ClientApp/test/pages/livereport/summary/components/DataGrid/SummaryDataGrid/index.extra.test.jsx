import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

jest.mock('@/pages/livereport/summary/gridUltility/LiveReportTable', () => () => <div data-testid="table">table</div>)
jest.mock('@/pages/livereport/summary/components/DataGrid/SummaryDataGrid/GridBuilder', () => ({ BuildSummaryBody: () => [], BuildSummaryFooter: () => ({}), BuildSummaryHeaders: () => [] }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postReportData: jest.fn(() => Promise.resolve({ data: {} })) } }))

import SummaryDataGrid from '@/pages/livereport/summary/components/DataGrid/SummaryDataGrid/index'

test('returns null when no summary data', () => {
  const state = { gridData: null, formData: { hasAmountDueToColumn: false, isAllowedCustomerCommission: false } }
  const MinimalStore = {
    getState: () => state,
    subscribe: () => () => {},
    dispatch: () => {},
  };
  const { container } = render(<Provider store={MinimalStore}><SummaryDataGrid /></Provider>);
  expect(container.firstChild).toBeNull();
});

test('renders table when summary data present', () => {
  const state = {
    gridData: { summary: [{ turnOver: 1, betCount: 1, licenseeWinLoss: 1, licenseeComm: 1, amountDue: 1, customerWinLoss: 1, customerComm: 1, customerTotal: 1, productCode: 1 }] },
    formData: { hasAmountDueToColumn: false, isAllowedCustomerCommission: true },
    requestParam: {},
    selectedProductCode: null
  }
  const FullStore = {
    getState: () => state,
    subscribe: () => () => {},
    dispatch: () => {},
  };
  const { getByTestId } = render(<Provider store={FullStore}><SummaryDataGrid tableTitle="Summary" /></Provider>);
  expect(getByTestId('table')).toBeInTheDocument();
});


