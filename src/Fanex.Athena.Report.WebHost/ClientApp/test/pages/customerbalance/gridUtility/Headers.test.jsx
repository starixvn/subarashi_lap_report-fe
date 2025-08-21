import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@/helpers/langHelper', () => ({
  getSingleResource: key => `Mocked_${key}`
}))
jest.mock('@/pages/customerbalance/common', () => ({
  constants: {
    SortKeys: {
      Deposit: 'Deposit',
      OpeningBalance: 'OpeningBalance',
      Withdrawal: 'Withdrawal',
      TurnOver: 'TurnOver',
      CustomerWinloss: 'CustomerWinloss',
      ClosingBalance: 'ClosingBalance'
    }
  }
}))
jest.mock('@/pages/customerbalance/customGrid/HeaderCell', () => ({ children }) => <th>{children}</th>)
jest.mock('@/pages/customerbalance/customGrid/HeaderRow', () => ({ children }) => <tr>{children}</tr>)

import { BuildHeaders } from '@/pages/customerbalance/gridUtility/Headers'

describe('CustomerBalance Headers', () => {
  test('renders two header rows when has customer commission and not single wallet', () => {
    const headers = BuildHeaders(false, true)
    render(<table><thead>{headers}</thead></table>)
    expect(screen.getByText('Mocked_ExternalId')).toBeInTheDocument()
    expect(screen.getByText('Mocked_WinLoss')).toBeInTheDocument()
    expect(headers.length).toBe(2)
  })

  test('renders one row when single wallet and no commission', () => {
    const headers = BuildHeaders(true, false)
    render(<table><thead>{headers}</thead></table>)
    expect(screen.getByText('#')).toBeInTheDocument()
    expect(screen.queryByText('Mocked_WinLoss')).toBeNull()
    expect(screen.queryByText('Mocked_Comm')).toBeNull()
    expect(screen.queryByText('Mocked_Total')).toBeNull()
  })
})


