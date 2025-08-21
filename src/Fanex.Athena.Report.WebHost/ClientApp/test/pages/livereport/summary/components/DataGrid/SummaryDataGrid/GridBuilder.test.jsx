import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('@legion-lib/react-grid', () => ({ Row: ({ children, className }) => <div data-testid="row" data-class={className}>{children}</div>, Cell: ({ children, className, colSpan }) => <div data-testid="cell" data-class={className} data-span={colSpan}>{children}</div> }))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/pages/livereport/summary/gridUltility', () => ({ BuildHeaders: (t, o) => <div data-testid="headers" data-title={t} />, CommonCells: ({ data }) => <div data-testid="common" data-name={data.productName || 'total'} /> }))

import { BuildSummaryHeaders, BuildSummaryBody, BuildSummaryFooter } from '@/pages/livereport/summary/components/DataGrid/SummaryDataGrid/GridBuilder'

test('BuildSummaryHeaders proxies to BuildHeaders', () => {
  render(<div>{BuildSummaryHeaders({})}</div>)
  expect(screen.getByTestId('headers')).toHaveAttribute('data-title', 'Product')
})

test('BuildSummaryBody renders rows and calls onClick with item', () => {
  const onClick = jest.fn()
  const data = [{ productName: 'A' }]
  render(<div>{BuildSummaryBody(data, onClick)}</div>)
  fireEvent.click(screen.getByText('A'))
  expect(onClick).toHaveBeenCalledWith({ productName: 'A' })
  expect(screen.getAllByTestId('common')).toHaveLength(1)
})

test('BuildSummaryFooter renders total row and calls onClick with ALL', () => {
  const onClick = jest.fn()
  const data = [{}, {}, {}]
  render(<div>{BuildSummaryFooter(data, onClick)}</div>)
  const row = screen.getByTestId('row')
  expect(row).toHaveAttribute('data-class', 'footer-summary')
  const cell = screen.getByTestId('cell')
  expect(cell).toHaveAttribute('data-class', 'left-align')
  expect(cell).toHaveAttribute('data-span', '3')
  fireEvent.click(screen.getByText('Total'))
  expect(onClick).toHaveBeenCalledWith({ productCode: 'ALL' })
})


