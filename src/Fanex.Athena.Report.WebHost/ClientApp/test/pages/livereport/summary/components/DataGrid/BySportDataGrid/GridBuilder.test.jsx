import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@legion-lib/react-grid', () => ({ Row: ({ children }) => <div data-testid="row">{children}</div> }))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/pages/livereport/summary/gridUltility', () => ({ BuildHeaders: (t, o) => <div data-testid="headers" data-title={t} />, CommonCells: ({ data }) => <div data-testid="common" data-name={data.productName} /> }))
jest.mock('@/pages/livereport/summary/components/DataGrid/BySportDataGrid/SportCell', () => ({ data, isShowedDetailLink }) => <div data-testid="sport" data-name={data.productName} data-link={String(isShowedDetailLink)} />)

import { BuildBySportHeaders, BuildBySportBody } from '@/pages/livereport/summary/components/DataGrid/BySportDataGrid/GridBuilder'

test('BuildBySportHeaders proxies to BuildHeaders', () => {
  render(<div>{BuildBySportHeaders({})}</div>)
  expect(screen.getByTestId('headers')).toHaveAttribute('data-title', 'Sport')
})

test('BuildBySportBody renders rows and passes flag', () => {
  const data = [{ productName: 'Football' }]
  render(<div>{BuildBySportBody(data, true)}</div>)
  expect(screen.getAllByTestId('row')).toHaveLength(1)
  expect(screen.getByTestId('sport')).toHaveAttribute('data-link', 'true')
  expect(screen.getAllByTestId('common')).toHaveLength(1)
})


