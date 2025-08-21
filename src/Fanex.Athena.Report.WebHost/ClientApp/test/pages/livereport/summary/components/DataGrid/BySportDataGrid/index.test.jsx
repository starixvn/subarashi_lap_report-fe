import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@/pages/livereport/summary/gridUltility', () => ({ LiveReportTable: ({ tableTitle }) => <div data-testid="table" data-title={tableTitle} /> }))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: (k) => k } }))
jest.mock('@/pages/livereport/summary/components/DataGrid/BySportDataGrid/GridBuilder', () => ({ BuildBySportHeaders: () => [], BuildBySportBody: () => [] }))

jest.mock('react-redux', () => ({
  useSelector: jest.fn((sel) => sel({ gridData: { dataBySport: [{ x: 1 }, { x: 2 }], isShowedDetailLink: true }, formData: { hasAmountDueToColumn: false, isAllowedCustomerCommission: true }, selectedProductCode: 1 }))
}))

import Comp from '@/pages/livereport/summary/components/DataGrid/BySportDataGrid'

test('BySportDataGrid renders LiveReportTable when data present', () => {
  render(<Comp />)
  expect(screen.getByTestId('table')).toBeInTheDocument()
})


