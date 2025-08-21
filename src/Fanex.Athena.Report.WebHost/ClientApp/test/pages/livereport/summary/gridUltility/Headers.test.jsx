import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@legion-lib/react-grid', () => ({ HeaderRow: ({ children }) => <div data-testid="hrow">{children}</div>, HeaderCell: ({ children, rowSpan, colWidth, colSpan }) => <div data-testid="hcell" data-rowspan={rowSpan} data-colspan={colSpan} data-colwidth={colWidth}>{children}</div> }))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))

import { BuildHeaders } from '@/pages/livereport/summary/gridUltility/Headers'

test('BuildHeaders renders one row when commission not allowed', () => {
  const { getAllByTestId } = render(<div>{BuildHeaders('X', { isAllowedCustomerCommission: false, hasAmountDueToColumn: true })}</div>)
  expect(getAllByTestId('hrow')).toHaveLength(1)
  expect(screen.getByText('X')).toBeInTheDocument()
})

test('BuildHeaders renders two rows when commission allowed', () => {
  const { getAllByTestId } = render(<div>{BuildHeaders('Y', { isAllowedCustomerCommission: true, hasAmountDueToColumn: false })}</div>)
  expect(getAllByTestId('hrow')).toHaveLength(2)
})


