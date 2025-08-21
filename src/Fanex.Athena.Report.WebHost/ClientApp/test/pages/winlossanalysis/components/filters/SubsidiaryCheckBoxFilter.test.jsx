import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: (k) => k } }))
jest.mock('@/components/CheckBox', () => ({ id, checked, onChange, label }) => (
  <label>
    <input data-testid="cb" id={id} type="checkbox" checked={!!checked} onChange={onChange} />
    {label}
  </label>
))

import { SubsidiaryCheckBoxFilter } from '@/pages/winlossanalysis/components/filters/SubsidiaryCheckBoxFilter'

test('SubsidiaryCheckBoxFilter renders and handles change', () => {
  const onChange = jest.fn()
  render(<SubsidiaryCheckBoxFilter value={true} onChange={onChange} />)
  expect(screen.getByText('SubsidiarySearch')).toBeInTheDocument()
  fireEvent.click(screen.getByTestId('cb'))
  expect(onChange).toHaveBeenCalled()
})


