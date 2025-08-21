import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@legion-lib/react-grid', () => ({ Row: ({ children }) => <div data-testid="row">{children}</div>, Cell: ({ children, className, colSpan, title }) => <div data-testid="cell" data-class={className} data-span={colSpan} data-title={title}>{children}</div> }))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => (k === 'Viewin' ? 'Viewin {0}' : k) } }))
jest.mock('@/pages/customerbalance/common', () => ({ __esModule: true, default: { formatDecimalInObjectNumbers: (o) => o }, constants: { DefaultPagingOption: { PageIndex: 1, PageSize: 50 } } }))

import { GetDefaultPagingOptions, GenerateReportTitle, BuildBody, BuildFooter } from '@/pages/customerbalance/gridUtility/GridContent'

test('GetDefaultPagingOptions merges index and total', () => {
  expect(GetDefaultPagingOptions(2, 100)).toEqual(expect.objectContaining({ PageIndex: 2, TotalItem: 100 }))
})

test('GenerateReportTitle composes string', () => {
  const s = GenerateReportTitle('2024-01-01', '2024-01-31', 'USD')
  expect(s).toBe('CustomerBalance, 2024-01-01 → 2024-01-31, Viewin USD')
})

test('BuildBody renders rows and optional systemId', () => {
  const data = [{ index: '1', externalId: 'E1', systemId: 'S1' }, { index: '2', externalId: 'E2' }]
  render(<div>{BuildBody(data, false, false)}</div>)
  const rows = screen.getAllByTestId('row')
  expect(rows).toHaveLength(2)
  expect(screen.getAllByTestId('cell')[2]).toHaveAttribute('data-title', 'S1')
})

test('BuildFooter renders total label and content cells', () => {
  const total = { openingBalance: 1, deposit: 2, withdrawal: 3, bonus: 4, adjustment: 5, promotion: 6, turnover: 7, drawGame: 8, netTurnover: 9, pendingFunds: 10, winLoss: 11, playerComm: 12, totalWL: 13, closingBalance: 14, affiliateTransfer: 15 }
  render(<div>{BuildFooter(total, 3, false, true)}</div>)
  expect(screen.getByText('Total')).toBeInTheDocument()
  expect(screen.getAllByTestId('cell').length).toBeGreaterThan(3)
})

// removed duplicate mocks/imports to avoid redeclarations


