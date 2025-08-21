import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@legion-lib/react-grid', () => ({ Row: ({ children }) => <div data-testid="row">{children}</div>, Cell: ({ children, className }) => <div data-testid="cell" data-class={className}>{children}</div> }))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/pages/livereport/summary/gridUltility', () => ({ BuildHeaders: (t, o) => <div data-testid="headers" data-title={t} />, CommonCells: ({ data }) => <div data-testid="common" data-name={data.productName} /> }))

import { BuildByCurrencyHeaders, BuildByCurrencyBody } from '@/pages/livereport/summary/components/DataGrid/ByCurrencyDataGrid/GridBuilder'

test('BuildByCurrencyHeaders proxies to BuildHeaders', () => {
  render(<div>{BuildByCurrencyHeaders({})}</div>)
  expect(screen.getByTestId('headers')).toHaveAttribute('data-title', 'Currency')
})

test('BuildByCurrencyBody renders rows', () => {
  const data = [{ productName: 'USD' }, { productName: 'EUR' }]
  render(<div>{BuildByCurrencyBody(data)}</div>)
  expect(screen.getAllByTestId('row')).toHaveLength(2)
  expect(screen.getAllByTestId('cell')[0]).toHaveAttribute('data-class', 'left-align')
  expect(screen.getAllByTestId('common')).toHaveLength(2)
})


