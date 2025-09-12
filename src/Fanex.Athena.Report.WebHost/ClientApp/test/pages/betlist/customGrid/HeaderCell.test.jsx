import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import HeaderCell from '@/pages/betlist/customGrid/BetListHeaderCell'

describe('HeaderCell', () => {
    test('renders non-sortable header when sortBy is not provided', () => {
        render(<table><thead><tr><HeaderCell>Title</HeaderCell></tr></thead></table>)
        const cell = screen.getByText('Title')
        expect(cell).toBeInTheDocument()
        expect(cell.closest('th')).toBeTruthy()
    })

    test('calls onSort with desc when clicked and no sortOrder', () => {
        const onSort = jest.fn()
        render(<table><thead><tr><HeaderCell sortBy="name" onSort={onSort}>Name</HeaderCell></tr></thead></table>)
        const cell = screen.getByText('Name')
        fireEvent.click(cell)
        expect(onSort).toHaveBeenCalledWith('name', 'desc')
    })

    test('toggles sort order asc/desc on click', () => {
        const onSort = jest.fn()
        const { rerender } = render(
            <table><thead><tr><HeaderCell sortBy="name" sortOrder="asc" onSort={onSort}>Name</HeaderCell></tr></thead></table>
        )
        fireEvent.click(screen.getByText('Name'))
        expect(onSort).toHaveBeenCalledWith('name', 'desc')
        rerender(<table><thead><tr><HeaderCell sortBy="name" sortOrder="desc" onSort={onSort}>Name</HeaderCell></tr></thead></table>)
        fireEvent.click(screen.getByText('Name'))
        expect(onSort).toHaveBeenLastCalledWith('name', 'asc')
    })

    test('applies selected class when sorted', () => {
        const { rerender } = render(
            <table><thead><tr><HeaderCell sortBy="name" sortOrder="asc">Name</HeaderCell></tr></thead></table>
        )
        let th = screen.getByText('Name').closest('th')
        expect(th).toHaveClass('selected')
        rerender(<table><thead><tr><HeaderCell sortBy="name" sortOrder="desc">Name</HeaderCell></tr></thead></table>)
        th = screen.getByText('Name').closest('th')
        expect(th).toHaveClass('selected')
    })
})


