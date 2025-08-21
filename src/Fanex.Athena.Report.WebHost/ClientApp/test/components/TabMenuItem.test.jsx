import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import TabMenuItem from '@/components/TabMenuItem'

describe('TabMenuItem', () => {
    test('renders active item with new icon and handles click', () => {
        const onClick = jest.fn()
        const item = { key: 'k1', title: 'Item1', isNew: true }
        render(<TabMenuItem item={item} isActive={true} onClickTabMenu={onClick} />)
        const link = screen.getByText('Item1')
        expect(link).toHaveClass('active')
        expect(document.querySelector('.icon-new')).toBeInTheDocument()
        fireEvent.click(link)
        expect(onClick).toHaveBeenCalledWith('k1')
    })
})



