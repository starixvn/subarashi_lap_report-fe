import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/components/CheckBox', () => p => <input data-testid="cb" type="checkbox" {...p} />)

import Comp from '@/pages/winlossanalysis/components/filters/GroupInOriginalCurrencyCheckBoxFilter'

test('renders checkbox with label', () => {
  render(<Comp checked={false} onChange={() => {}} />)
  expect(screen.getByTestId('cb')).toBeInTheDocument()
})


