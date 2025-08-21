import React from 'react'
import { render } from '@testing-library/react'

jest.mock('@legion-lib/react-grid', () => ({ Row: ({ children }) => <div data-testid="row">{children}</div>, HeaderRow: ({ children }) => <div data-testid="hrow">{children}</div> }))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/pages/livereport/matchlist/gridBuilder/customGrid/MatchCell', () => ({ data }) => <div data-testid="match" data-id={data.matchId} />)
jest.mock('@/pages/livereport/matchlist/gridBuilder/customGrid/HeaderCell', () => ({ children }) => <div data-testid="hcell">{children}</div>)
jest.mock('@/pages/livereport/matchlist/gridBuilder/customGrid/CommonCells', () => ({ data }) => <div data-testid="common" data-id={data.matchId} />)

import { BuildBody, BuildHeaders } from '@/pages/livereport/matchlist/gridBuilder/GridBuilder'

test('BuildBody renders rows with cells', () => {
  const data = [{ matchId: 1 }, { matchId: 2 }]
  const { getAllByTestId } = render(<div>{BuildBody(data)}</div>)
  expect(getAllByTestId('row')).toHaveLength(2)
  expect(getAllByTestId('match')).toHaveLength(2)
  expect(getAllByTestId('common')).toHaveLength(2)
})

test('BuildHeaders renders first row and conditionally second', () => {
  const { getAllByTestId, rerender, queryAllByTestId } = render(<div>{BuildHeaders({ isAllowedCustomerCommission: false, hasAmountDueToColumn: true })}</div>)
  expect(getAllByTestId('hrow')).toHaveLength(1)
  rerender(<div>{BuildHeaders({ isAllowedCustomerCommission: true, hasAmountDueToColumn: false })}</div>)
  expect(queryAllByTestId('hrow')).toHaveLength(2)
})


