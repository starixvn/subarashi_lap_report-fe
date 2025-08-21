import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SuggestionList from '@/components/auto-complete/SuggestionList'

describe('SuggestionList', () => {
    test('renders items and calls onSelect with selected item', () => {
        const onSelect = jest.fn()
        const dataList = [{ value: 'One' }, { value: 'Two' }, 'Three']
        render(<SuggestionList dataList={dataList} selectedIndex={1} width={200} onSelect={onSelect} />)
        const items = screen.getAllByRole('listitem')
        expect(items).toHaveLength(3)
        expect(items[1]).toHaveClass('ac-item-active')
        fireEvent.click(items[0])
        expect(onSelect).toHaveBeenCalledWith({ value: 'One' })
    })
})



