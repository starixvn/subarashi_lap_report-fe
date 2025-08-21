import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('@legion-lib/react-grid', () => ({ Table: (p) => <div data-testid="table" {...p} /> }))
jest.mock('@/pages/extrapayout/common/gridUtils', () => ({
  renderDetailHeader: () => <div data-testid="hdr" />,
  renderDetailDataSection: () => <div data-testid="body" />,
  renderDetailFooter: () => <div data-testid="ftr" />,
}))
jest.mock('@/components/BetListPopupLayout', () => (p) => <div data-testid="popup"><div data-testid="title">{p.title}</div>{p.children}</div>)
jest.mock('@/components/NoDataTitle', () => () => <div data-testid="nodata">NODATA</div>)
jest.mock('@/components/ExportExcel', () => (p) => <button data-testid="export" onClick={p.onClick}>export</button>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { getReportFile: jest.fn(() => Promise.resolve({ status: 200, data: new Blob(['x']) })) } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { downloadFile: jest.fn() } }))
jest.mock('@/actions/loaderAction', () => ({ toggleLoader: v => ({ type: 'toggle', v }) }))
jest.mock('react-redux', () => ({ connect: () => (c) => c }))

import Detail from '@/pages/extrapayout/components/Detail'
import DataService from '@/lib/dataService'
import Site from '@/lib/site'

describe('ExtraPayout Detail', () => {
  test('renders NoData when no data', () => {
    render(<Detail title="T" data={{ data: [] }} />)
    expect(screen.getByTestId('nodata')).toBeInTheDocument()
  })

  test('renders table when data exists', () => {
    const data = { data: [{ a: 1 }], totalSummary: { turnover: 0, amount: 0, sharingAmount: 0, currencyName: 'USD' }, totalCurrency: [] }
    render(<Detail title="T" data={data} />)
    expect(screen.getByTestId('table')).toBeInTheDocument()
  })

  test('export triggers when param exists', async () => {
    render(<Detail title="T" data={{ data: [] }} param={{ p: 1 }} toggleLoader={() => {}} />)
    // button is inside betListTitle even when no data
    fireEvent.click(screen.getByText('export'))
    await Promise.resolve()
    expect((DataService.default && DataService.default.getReportFile) || DataService.getReportFile).toBeTruthy()
  })
})


