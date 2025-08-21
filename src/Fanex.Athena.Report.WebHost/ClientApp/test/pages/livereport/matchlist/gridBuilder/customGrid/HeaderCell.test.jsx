import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import HeaderCell from '@/pages/livereport/matchlist/gridBuilder/customGrid/HeaderCell'

describe('LiveReport HeaderCell', () => {
  test('renders non-sortable header', () => {
    render(<table><thead><tr><HeaderCell>H</HeaderCell></tr></thead></table>)
    expect(screen.getByText('H')).toBeInTheDocument()
  })

  test('toggles sort order and calls onSort', () => {
    const onSort = jest.fn()
    const { rerender } = render(<table><thead><tr><HeaderCell sortBy="col" sortOrder={null} onSort={onSort}>H</HeaderCell></tr></thead></table>)
    fireEvent.click(screen.getByText('H'))
    expect(onSort).toHaveBeenCalledWith('col', 'asc')
    rerender(<table><thead><tr><HeaderCell sortBy="col" sortOrder="asc" onSort={onSort}>H</HeaderCell></tr></thead></table>)
    fireEvent.click(screen.getByText('H'))
    expect(onSort).toHaveBeenCalledWith('col', 'desc')
  })
})


