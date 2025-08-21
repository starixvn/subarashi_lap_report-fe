import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/components/ReportSelect', () => p => <select data-testid="select" />)
jest.mock('@/pages/winlossanalysis/common/constants', () => ({ VipOnlyList: [{ value: 0, label: 'All' }] }))

import Comp from '@/pages/winlossanalysis/components/filters/VipOnlyFilter'

test('renders VIP only select', () => {
  render(<Comp value={{ value: 0, label: 'All' }} onChange={() => {}} />)
  expect(screen.getByText('VIPPlayerOnly')).toBeInTheDocument()
  expect(screen.getByTestId('select')).toBeInTheDocument()
})


