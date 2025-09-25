import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import HeaderCell from '@/pages/customerbalance/customGrid/CustomHeaderCell'

describe('CustomerBalance HeaderCell', () => {
  test('renders and toggles sort order; lockArrow overrides', () => {
    const onSort = jest.fn()
    const { rerender } = render(<table><thead><tr><HeaderCell sortBy="col" sortOrder={null} onSort={onSort}>H</HeaderCell></tr></thead></table>)
    fireEvent.click(screen.getByText('H'))
    expect(onSort).toHaveBeenCalledWith('col', 'desc')
    rerender(<table><thead><tr><HeaderCell sortBy="col" sortOrder="asc" lockArrow="desc" onSort={onSort}>H</HeaderCell></tr></thead></table>)
    const th = screen.getByText('H').closest('th')
    expect(th).toHaveClass('selected')
    fireEvent.click(screen.getByText('H'))
    expect(onSort).toHaveBeenCalled()
  })
})


