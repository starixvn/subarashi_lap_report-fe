import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import DropdownCell from '@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/customGrid/DropdownCell'

describe('DropdownCell', () => {
  test('renders null when no dataSource', () => {
    const { container } = render(<DropdownCell fieldKey="k" onChange={() => {}} />)
    expect(container.querySelector('select')).toBeNull()
  })

  test('renders options and changes value', () => {
    const onChange = jest.fn()
    const ds = [{ key: 'k1', value: 'v1', displayValue: 'V1' }, { key: 'k2', value: 'v2' }]
    render(<DropdownCell fieldKey="k" dataSource={ds} value={'v1'} onChange={onChange} />)
    const sel = screen.getByRole('combobox')
    fireEvent.change(sel, { target: { value: 'v2' } })
    expect(onChange).toHaveBeenCalledWith('k', 'v2')
  })
})


