import React from 'react'
import { render, screen } from '@testing-library/react'
import { MobileGroupByRowList } from '@/pages/winlossanalysis/components/mobile/MobileGroupByRowList'

jest.mock('@/pages/winlossanalysis/components/mobile/MobileGroupByRow', () => {
  return jest.fn(({ data }) => <div data-testid="group-row" data-key={`${data.keyItem.rowIndex}-${data.keyItem.groupBy}`}>Row</div>)
})

describe('MobileGroupByRowList', () => {
  test('renders items with composite keys', () => {
    const dataList = [
      { keyItem: { rowIndex: 1, groupBy: 'A' } },
      { keyItem: { rowIndex: 2, groupBy: 'B' } }
    ]

    render(<MobileGroupByRowList dataList={dataList} selectedDisplayTypeId={0} />)

    const rows = screen.getAllByTestId('group-row')
    expect(rows).toHaveLength(2)
  })
})


