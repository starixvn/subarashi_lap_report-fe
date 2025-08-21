import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('@/pages/winlossanalysis/components/hooks/useValidParam.jsx', () => ({ useValidParam: jest.fn() }))
jest.mock('@/pages/winlossanalysis/components/hooks/useFilterAction.jsx', () => jest.fn(() => ({ submit: jest.fn(), onClickClearFilter: jest.fn() })))
jest.mock('@/pages/winlossanalysis/components/filters/GroupByOptionsFilter.jsx', () => ({ GroupByOptionFilter: () => <div>GroupBy</div> }))
jest.mock('@/pages/winlossanalysis/components/filters/BreakDownOptionFilter.jsx', () => () => <div>BreakDown</div>)

import { useValidParam } from '@/pages/winlossanalysis/components/hooks/useValidParam'
import useFilterAction from '@/pages/winlossanalysis/components/hooks/useFilterAction'
import { GroupByFilter } from '@/pages/winlossanalysis/components/desktop/GroupByFilter'

describe('GroupByFilter (desktop)', () => {
  test('submit disabled when invalid, calls submit when valid; clear works', () => {
    const actions = { submit: jest.fn(), onClickClearFilter: jest.fn() }
    useFilterAction.mockReturnValue(actions)
    useValidParam.mockReturnValue(false)

    const { rerender } = render(<GroupByFilter />)
    const submitBtn = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitBtn)
    expect(actions.submit).not.toHaveBeenCalled()

    useValidParam.mockReturnValue(true)
    rerender(<GroupByFilter />)
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(actions.submit).toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: /clear/i }))
    expect(actions.onClickClearFilter).toHaveBeenCalled()
  })
})


