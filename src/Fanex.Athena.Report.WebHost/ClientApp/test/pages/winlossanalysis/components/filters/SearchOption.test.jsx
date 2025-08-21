import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/components/dropdown', () => ({ DrowdownRadioList: ({ onChange, ...p }) => <button data-testid="radio-list" onClick={() => onChange && onChange(1)} {...p}>DL</button> }))

import SearchOption from '@/pages/winlossanalysis/components/filters/SearchOption'

describe('SearchOption', () => {
    test('renders radio list with data', () => {
        const onChange = jest.fn()
        render(<SearchOption value={1} onChange={onChange} />)
        const radio = screen.getByTestId('radio-list')
        expect(radio).toBeInTheDocument()
        fireEvent.click(radio)
        expect(onChange).toHaveBeenCalledTimes(1)
    })
})


