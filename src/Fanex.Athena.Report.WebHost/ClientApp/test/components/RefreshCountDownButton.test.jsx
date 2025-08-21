import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import RefreshCountDownButton from '@/components/RefreshCountDownButton'

describe('RefreshCountDownButton', () => {
    beforeEach(() => {
        jest.useFakeTimers()
        jest.clearAllTimers()
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    test('counts down and triggers refresh when reaching zero', () => {
        const onRefresh = jest.fn()
        render(<RefreshCountDownButton value={2} options={[2,4]} onRefresh={onRefresh} />)
        const countEl = screen.getByText(/\d+\s*$/)
        expect(countEl).toHaveTextContent('2')
        act(() => { jest.advanceTimersByTime(3000) })
        expect(onRefresh).toHaveBeenCalledTimes(1)
        expect(countEl).toHaveTextContent('2')
    })

    test('opens menu, selects interval and closes on outside click', () => {
        render(<RefreshCountDownButton value={5} options={[5,10]} />)
        const toggle = document.querySelector('.button-select')
        fireEvent.click(toggle)
        const option = screen.getByText('10 sec')
        fireEvent.click(option)
        expect(screen.getByText(/\d+\s*$/)).toHaveTextContent('10')
        fireEvent.click(toggle)
        expect(screen.getByText('5 sec')).toBeInTheDocument()
        fireEvent.mouseDown(document.body)
        expect(document.querySelector('.countdown-menu')).toBeNull()
    })

    test('manual refresh resets counter', () => {
        const onRefresh = jest.fn()
        render(<RefreshCountDownButton value={7} options={[7,15]} onRefresh={onRefresh} />)
        const refreshBtn = document.querySelector('.button-refresh')
        fireEvent.click(refreshBtn)
        expect(onRefresh).toHaveBeenCalled()
        expect(screen.getByText(/\d+\s*$/)).toHaveTextContent('7')
    })
})



