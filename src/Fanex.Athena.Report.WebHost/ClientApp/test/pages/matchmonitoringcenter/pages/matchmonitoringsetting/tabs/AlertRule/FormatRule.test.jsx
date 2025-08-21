import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/lib/textHelper', () => ({ parseFormattedText: (t) => t }))

import FormatRule from '@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/FormatRule'

test('FormatRule renders translated labels', () => {
  render(<FormatRule />)
  expect(screen.getByText(/Format/)).toBeInTheDocument()
  expect(screen.getByText('AlertRuleTxt1')).toBeInTheDocument()
})


