import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Day from '@/components/month-picker/Day'

jest.mock('@/components/Overlay', () => ({ __esModule: true, default: ({ isOpening, children }) => (
    <div className={isOpening ? 'overlay overlay-open' : 'overlay'} style={{ display: isOpening ? 'block' : 'none' }}>
        {children}
    </div>
)}))

describe('Day', () => {
    test('opens overlay and selects a day within range', async () => {
        const onChange = jest.fn()
        render(<Day id="d" label="Day" value={5} min={1} max={10} onChange={onChange} />)
        fireEvent.click(screen.getByText('5'))
        fireEvent.click(document.querySelector('#d .date-picked'))
        const option = await screen.findByText((content, node) => node.tagName.toLowerCase() === 'a' && content === '7')
        fireEvent.click(option)
        expect(onChange).toHaveBeenCalledWith(7)
        expect(document.querySelector('.overlay')).toHaveStyle({ display: 'none' })
    })
})


