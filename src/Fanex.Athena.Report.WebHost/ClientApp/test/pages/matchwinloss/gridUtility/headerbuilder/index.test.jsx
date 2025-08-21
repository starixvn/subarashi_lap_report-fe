import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'

jest.mock('@legion-lib/react-grid', () => ({ HeaderRow: ({ children }) => <div data-testid="row">{children}</div>, HeaderCell: ({ children }) => <span data-testid="cell">{children}</span> }))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: (k) => k } }))

import { BuildHeaders } from '@/pages/matchwinloss/gridUtility/headerbuilder'

test('BuildHeaders returns one row when hasCustomerComm=false', () => {
  const one = BuildHeaders(false)
  render(<>{one}</>)
  expect(screen.getAllByTestId('row').length).toBe(1)
  cleanup()
})

test('BuildHeaders returns two rows when hasCustomerComm=true', () => {
  const two = BuildHeaders(true)
  render(<>{two}</>)
  expect(screen.getAllByTestId('row').length).toBe(2)
  cleanup()
})


