import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('@/pages/winlossanalysis/components/hooks/useValidParam', () => ({ useValidParam: jest.fn() }))
jest.mock('@/pages/winlossanalysis/components/hooks/useFilterAction', () => jest.fn(() => ({ submit: jest.fn(), onClickClearFilter: jest.fn() })))
jest.mock('@/pages/winlossanalysis/components/filters/GroupByOptionsFilter.jsx', () => ({ GroupByOptionFilter: () => <div>GroupBy</div> }))
jest.mock('@/pages/winlossanalysis/components/filters/BreakDownOptionFilter.jsx', () => () => <div>BreakDown</div>)
jest.mock('@/pages/winlossanalysis/components/filters/StickyIcon.jsx', () => () => <div>Sticky</div>)

import { useValidParam } from '@/pages/winlossanalysis/components/hooks/useValidParam'
import useFilterAction from '@/pages/winlossanalysis/components/hooks/useFilterAction'
import { MobileGroupByFilter } from '@/pages/winlossanalysis/components/mobile/MobileGroupByFilter'

describe('MobileGroupByFilter', () => {
  test('respects isCollapsed and triggers actions', () => {
    const actions = { submit: jest.fn(), onClickClearFilter: jest.fn() }
    useFilterAction.mockReturnValue(actions)
    useValidParam.mockReturnValue(true)

    const { rerender } = render(<MobileGroupByFilter isCollapsed={true} />)
    expect(screen.getByText('Sticky')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(actions.submit).toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: /clear/i }))
    expect(actions.onClickClearFilter).toHaveBeenCalled()

    rerender(<MobileGroupByFilter isCollapsed={false} />)
    expect(screen.getByText('GroupBy')).toBeInTheDocument()
    expect(screen.getByText('BreakDown')).toBeInTheDocument()
  })
})


