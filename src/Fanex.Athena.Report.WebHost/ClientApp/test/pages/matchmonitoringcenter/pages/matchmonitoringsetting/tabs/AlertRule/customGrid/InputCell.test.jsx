import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/lib/constants', () => ({ InputType: { text: 'text', number: 'number' } }))

import InputCell from '@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/customGrid/InputCell'
import { InputType } from '@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/lib/constants'

describe('InputCell', () => {
  test('text type invalid when empty and valid when non-empty', () => {
    const onChange = jest.fn()
    const { rerender } = render(<InputCell value="" onChange={onChange} type={InputType.text} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveStyle('background-color: #ffcccc')
    rerender(<InputCell value="abc" onChange={onChange} type={InputType.text} />)
    expect(screen.getByRole('textbox')).toHaveStyle('background-color: white')
  })

  test('number type processes value and clamps', () => {
    const onChange = jest.fn()
    render(<InputCell value="" fieldKey="n" onChange={onChange} type={InputType.number} min={0} max={100} />)
    const input = screen.getByRole('spinbutton')
    const eKey = { preventDefault: jest.fn(), key: 'e' }
    fireEvent.keyDown(input, eKey)
    
    const minusKey = { preventDefault: jest.fn(), key: '-' }
    fireEvent.keyDown(input, minusKey)
    
    fireEvent.change(input, { target: { value: '1e2' } })
    expect(onChange).toHaveBeenLastCalledWith('n', '12')
    fireEvent.change(input, { target: { value: '123.4567' } })
    fireEvent.blur(input)
    expect(onChange).toHaveBeenCalled()
  })
})


