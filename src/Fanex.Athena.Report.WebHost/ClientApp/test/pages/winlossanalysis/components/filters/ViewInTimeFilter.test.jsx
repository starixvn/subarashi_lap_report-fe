import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/pages/winlossanalysis/common/constants', () => ({ ViewInTimeMode: { Financial: 1, Settlement: 2 } }))

import Comp from '@/pages/winlossanalysis/components/filters/ViewInTimeFilter'

test('renders radios and triggers change', () => {
  const onChange = jest.fn()
  render(<Comp value={1} onChange={onChange} />)
  expect(screen.getByLabelText('FinancialDate')).toBeInTheDocument()
  fireEvent.click(screen.getByLabelText('SettlementTime'))
  expect(onChange).toHaveBeenCalled()
})


