import React from 'react'
import { render, screen } from '@testing-library/react'
import { useDispatch, useSelector } from 'react-redux'
import DataGrid from '@/pages/weeklylivematch/components/DataGrid'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}))

jest.mock('@legion-lib/react-grid', () => ({
  Table: ({ onSort, header, body, footer }) => (
    <div data-testid="table">
      <button data-testid="sort" onClick={() => onSort && onSort('Week0', 'asc')}>sort</button>
      <div>{header}</div>
      <div>{body}</div>
      <div>{footer}</div>
    </div>
  ),
  Row: ({ children }) => <div>{children}</div>,
  Cell: ({ children }) => <div>{children}</div>,
  HeaderRow: ({ children }) => <div>{children}</div>
}))

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: (k) => k } }))
jest.mock('@/lib/numberFormat', () => ({ __esModule: true, default: { formatInteger: (v) => v } }))
jest.mock('@/pages/weeklylivematch/constants', () => ({ __esModule: true, default: { GridSettings: { COL_SPORT_NAME: 1, PREFIX_WEEK: 'Week', COL_START_WEEK: 2 } }, MAX_WIDTH_PAGE: 1200, MIN_WIDTH_PAGE: 600 }))

describe('WeeklyLiveMatch DataGrid behavior', () => {
  const mockDispatch = jest.fn()
  beforeEach(() => {
    jest.clearAllMocks()
    useDispatch.mockReturnValue(mockDispatch)
  })

  test('triggers sort action', () => {
    const state = {
      requestParam: { SortColumn: '', SortDirection: '' },
      gridData: {
        weekHeaders: ['W1'],
        data: [
          { cell: [0, 'Football', 2] },
          { cell: [0, 'Basketball', 1] }
        ],
        weeksTotalData: [3]
      }
    }
    useSelector.mockImplementation((sel) => sel(state))

    render(<DataGrid />)
    screen.getByTestId('sort').click()
    expect(mockDispatch).toHaveBeenCalled()
  })
})


