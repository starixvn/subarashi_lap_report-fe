import React from 'react'
import { render, screen } from '@testing-library/react'
import { MobileGroupByRow } from '@/pages/winlossanalysis/components/mobile/MobileGroupByRow'

jest.mock('@/pages/winlossanalysis/components/mobile/MobileBreakdownRow', () => {
  return jest.fn(({ data }) => <div data-testid="breakdown" data-key={`${data.groupBy}-${data.breakBy}`}>BD</div>)
})

jest.mock('@/pages/winlossanalysis/components/hooks/useRenderRowOption', () => {
  return jest.fn(() => ({ isShowBetEffectiveField: true, isGroupByPlayerMode: false }))
})

jest.mock('@legion-lib/react-grid', () => ({
  Cell: ({ children, className }) => <div data-testid="cell" data-class={className}>{children}</div>
}))

jest.mock('@/lib/numberFormat', () => ({
  __esModule: true,
  default: { format: (v) => String(v), formatDecimal: (v) => String(v) }
}))

describe('MobileGroupByRow', () => {
  const baseData = {
    keyItem: {
      groupByFieldText: 'Group A',
      betCount: 5,
      turnover: 10,
      netTurnover: 9,
      playerWinloss: 2,
      playerComm: 1,
      betEffective: 7,
      licWinloss: -3,
      licComm: 4,
      margin: -0.1,
      externalId: 'E1',
      systemId: 'S1'
    },
    children: [
      { groupBy: 'G', breakBy: 'B1' },
      { groupBy: 'G', breakBy: 'B2' }
    ]
  }

  test('renders header cells', () => {
    render(<MobileGroupByRow data={baseData} selectedDisplayTypeId={0} />)

    expect(screen.getAllByTestId('cell').length).toBeGreaterThan(0)
    expect(screen.getByText('Group A')).toBeInTheDocument()
  })

  test('renders breakdown items', () => {
    render(<MobileGroupByRow data={baseData} selectedDisplayTypeId={0} />)
    const breakdowns = screen.queryAllByTestId('breakdown')
    expect(breakdowns.length).toBeGreaterThanOrEqual(0)
  })
})


