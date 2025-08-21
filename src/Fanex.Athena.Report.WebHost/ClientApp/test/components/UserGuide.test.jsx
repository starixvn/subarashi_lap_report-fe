import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import UserGuide from '@/components/UserGuide'

describe('UserGuide', () => {
    test('shows popup with content when clicked and hides on close', () => {
        const onClick = jest.fn()
        const onClose = jest.fn()
        render(
            <UserGuide 
                title="Guide" 
                contentTitle="Help" 
                content="<b>Hello</b>" 
                isHtml={true}
                onClick={onClick}
                onClose={onClose}
            />
        )
        const icon = screen.getByTitle('Guide')
        fireEvent.click(icon)
        expect(onClick).toHaveBeenCalled()
        const popup = document.querySelector('.popup-container')
        expect(popup).toHaveClass('show')
        expect(document.querySelector('.popup-content')).toHaveTextContent('Hello')
        const close = document.querySelector('.popup-close')
        fireEvent.click(close)
        expect(onClose).toHaveBeenCalled()
        expect(popup).toHaveClass('hide')
    })
})



