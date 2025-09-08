import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'

jest.mock('@/components/BetListPopupLayout', () => (p) => <div data-testid="layout">{p.title}{p.children}</div>)
jest.mock('@/components/ExportExcel', () => (p) => <button data-testid="export" onClick={p.onClick}>export</button>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: (k) => k } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { getReportFile: jest.fn(() => Promise.resolve({ status: 200, data: new Blob(['x']) })) } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { downloadFile: jest.fn() } }))
jest.mock('@/actions/loaderAction', () => ({ toggleLoader: (v) => ({ type: 'TOGGLE', v }) }))

import { Detail } from '@/pages/extrapayout/components/Detail'
import DataService from '@/lib/dataService'
import Site from '@/lib/site'

test('renders NoDataTitle when no data', () => {
  render(<Detail title="t" data={{ data: [] }} toggleLoader={jest.fn()} />)
  expect(screen.getByText('NoInfo')).toBeInTheDocument()
})

test('export triggers DataService.getReportFile and download', async () => {
  const toggleLoader = jest.fn()
  const { getByTestId } = render(<Detail title="t" data={{ data: [1], totalSummary: { turnOver: 0, amount: 0, sharingAmount: 0, currencyName: 'USD' } }} param={{ a: 1 }} toggleLoader={toggleLoader} />)
  fireEvent.click(getByTestId('export'))
  expect(toggleLoader).toHaveBeenCalledWith(true)
  await Promise.resolve()
  expect(DataService.default?.getReportFile || DataService.getReportFile).toHaveBeenCalled()
  expect(Site.default?.downloadFile || Site.downloadFile).toHaveBeenCalled()
  expect(toggleLoader).toHaveBeenCalledWith(false)
})


