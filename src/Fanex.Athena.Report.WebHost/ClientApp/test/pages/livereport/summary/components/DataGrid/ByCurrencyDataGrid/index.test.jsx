import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/pages/livereport/summary/gridUltility', () => ({ LiveReportTable: (p) => <div data-testid="table" {...p} /> }))
jest.mock('@/pages/livereport/summary/components/DataGrid/ByCurrencyDataGrid/GridBuilder', () => ({ BuildByCurrencyBody: () => <div data-testid="body" />, BuildByCurrencyHeaders: () => <div data-testid="header" /> }))

import Comp from '@/pages/livereport/summary/components/DataGrid/ByCurrencyDataGrid'

const makeStore = (state) => createStore(s => s, state)

test('returns null when missing required state', () => {
  const store = makeStore({ selectedProductCode: null, gridData: null, formData: {} })
  const { container } = render(<Provider store={store}><Comp /></Provider>)
  expect(container.firstChild).toBeNull()
})

test('renders LiveReportTable when data present', () => {
  const store = makeStore({ selectedProductCode: 'P', gridData: { dataByCurrency: [1] }, formData: { hasAmountDueToColumn: false, isAllowedCustomerCommission: true } })
  render(<Provider store={store}><Comp /></Provider>)
  expect(screen.getByTestId('table')).toBeInTheDocument()
})


