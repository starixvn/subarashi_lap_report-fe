import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@legion-lib/react-grid', () => ({ Row: ({ children, className }) => <div data-testid="row" data-class={className}>{children}</div>, Cell: ({ children, className, colSpan }) => <div data-testid="cell" data-class={className} data-span={colSpan}>{children}</div> }))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/pages/livereport/summary/gridUltility', () => ({ BuildHeaders: (t, o) => <div data-testid="headers" data-title={t} data-allowed={o.isAllowedCustomerCommission} />, CommonCells: ({ data }) => <div data-testid="common" data-name={data.productName} /> }))

import { BuildByBetTypeHeaders, BuildByBetTypeBody } from '@/pages/livereport/summary/components/DataGrid/ByBetTypeDataGrid/GridBuilder'

test('BuildByBetTypeHeaders proxies to BuildHeaders', () => {
  render(<div>{BuildByBetTypeHeaders({ isAllowedCustomerCommission: true })}</div>)
  expect(screen.getByTestId('headers')).toHaveAttribute('data-title', 'BetType')
  expect(screen.getByTestId('headers')).toHaveAttribute('data-allowed', 'true')
})

test('BuildByBetTypeBody renders group and item rows with correct spans', () => {
  const data = [{ productName: 'A', liveReports: [{ productName: 'a1' }, { productName: 'a2' }] }]
  const options = { isAllowedCustomerCommission: true, hasAmountDueToColumn: true }
  render(<div>{BuildByBetTypeBody(data, options)}</div>)
  const rows = screen.getAllByTestId('row')
  expect(rows[0]).toHaveAttribute('data-class', 'font-weight-600 highlight')
  const groupCell = screen.getAllByTestId('cell')[0]
  expect(groupCell).toHaveAttribute('data-class', 'left-align')
  expect(groupCell).toHaveAttribute('data-span', '8')
  expect(screen.getAllByTestId('common')).toHaveLength(2)
})


