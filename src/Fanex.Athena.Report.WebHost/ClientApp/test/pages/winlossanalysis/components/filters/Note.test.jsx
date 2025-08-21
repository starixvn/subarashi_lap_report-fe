import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))

import Note from '@/pages/winlossanalysis/components/filters/Note'

test('renders note texts', () => {
  render(<Note />)
  expect(screen.getByText(/^Note:$/)).toBeInTheDocument()
  expect(screen.getByText(/WinlossAnalysis_SettlementTimeModeNote/i)).toBeInTheDocument()
  expect(screen.getByText(/WinlossAnalysis_SettlementTimeModeNote2/i)).toBeInTheDocument()
})


