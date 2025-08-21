import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('@legion-lib/react-grid', () => ({ Row: ({ children }) => <div data-testid="row">{children}</div>, Cell: ({ children }) => <span>{children}</span> }))
jest.mock('@/lib/numberFormat', () => ({ __esModule: true, default: { format: (v) => String(v), formatDecimal: (v) => String(v) } }))
jest.mock('@/pages/winlossanalysis/common/grid/BreakdownRow', () => ({ __esModule: true, default: ({ data }) => <div data-testid="breakdown">{data.breakBy}</div> }))

import Comp from '@/pages/winlossanalysis/common/grid/TreeViewGridRowNode'

const parent = { rowIndex: 1, displayRowIndex: 1, groupBy: 'A', groupByFieldText: 'G', externalId: 'E', betCount: 1, turnover: 2, netTurnover: 3, playerWinloss: 4, playerComm: 5, betEffective: 6, licWinloss: 7, licComm: 8, margin: 0.1 }
const data = { keyItem: parent, children: [{ groupBy: 'A', breakBy: 'B' }] }
const option = { isGroupByPlayerMode: true, isBreakDownPlayerMode: true }

test('TreeViewGridRowNode toggles breakdown rows', () => {
  render(<Comp data={data} option={option} />)
  expect(screen.queryByTestId('breakdown')).toBeNull()
  fireEvent.click(screen.getByText('E'))
  expect(screen.getByTestId('breakdown')).toBeInTheDocument()
})


