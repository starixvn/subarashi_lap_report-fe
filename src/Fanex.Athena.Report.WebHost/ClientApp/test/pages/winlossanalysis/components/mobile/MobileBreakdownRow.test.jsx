import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@/components/mobile-component/CompositeRow', () => ({ children, expandRows }) => <div data-testid="row">{children}{expandRows}</div>)
jest.mock('@/pages/winlossanalysis/components/mobile/MobileExpandRowContent', () => p => <div data-testid="expand" />)
jest.mock('@/pages/winlossanalysis/components/hooks/useRenderRowOption', () => () => ({ isShowBetEffectiveField: true, isBreakDownPlayerMode: false }))
jest.mock('@/lib/numberFormat', () => ({ __esModule: true, default: { format: v => v, formatDecimal: v => v } }))

import MobileBreakdownRow from '@/pages/winlossanalysis/components/mobile/MobileBreakdownRow'

describe('MobileBreakdownRow', () => {
  test('renders main cells and expand rows', () => {
    const data = { betCount: 1, turnover: 2, netTurnover: 3, playerWinloss: 4, playerComm: 5, betEffective: 6, licWinloss: 7, margin: 0.1, groupBy: 'G', breakBy: 'B', externalId: 'E', systemId: 'S', breakDownFieldText: 'D' }
    render(<table><tbody><MobileBreakdownRow data={data} selectedDisplayTypeId={0} /></tbody></table>)
    expect(screen.getByTestId('row')).toBeInTheDocument()
    expect(screen.getAllByTestId('expand').length).toBeGreaterThan(1)
  })
})


