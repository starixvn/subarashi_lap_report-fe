import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@/components/NoDataTitle', () => () => <div data-testid="no-data" />)
jest.mock('@/components/ReportTitle', () => p => <div data-testid="title">{p.content}</div>)
jest.mock('@/pages/livereport/summary/common', () => ({ __esModule: true, default: { generateReportTitle: () => 'T' } }))
jest.mock('@/pages/livereport/summary/components/DataGrid/SummaryDataGrid', () => () => <div data-testid="sum" />)
jest.mock('@/pages/livereport/summary/components/DataGrid/BySportDataGrid', () => () => <div data-testid="sport" />)
jest.mock('@/pages/livereport/summary/components/DataGrid/ByCurrencyDataGrid', () => () => <div data-testid="cur" />)
jest.mock('@/pages/livereport/summary/components/DataGrid/ByBetTypeDataGrid', () => () => <div data-testid="bet" />)

import DataGrid from '@/pages/livereport/summary/components/DataGrid'

const makeStore = (gridData, requestParam = { CurrencyId: 1, BaseCurrency: null, CurrencyName: 'USD', LiveIndicator: 0, FromDate: '2024-01-01', ToDate: '2024-01-02' }) =>
  createStore(s => s, { gridData, requestParam })

describe('LiveReport Summary DataGrid', () => {
  test('returns null when summary missing', () => {
    const store = makeStore({})
    const { container } = render(<Provider store={store}><DataGrid /></Provider>)
    expect(container.firstChild).toBeNull()
  })

  test('shows NoData when summary empty', () => {
    const store = makeStore({ summary: [] })
    render(<Provider store={store}><DataGrid /></Provider>)
    expect(screen.getByTestId('title')).toBeInTheDocument()
    expect(screen.getByTestId('no-data')).toBeInTheDocument()
  })

  test('renders all sub-grids when summary has data', () => {
    const store = makeStore({ summary: [{}] })
    render(<Provider store={store}><DataGrid /></Provider>)
    expect(screen.getByTestId('sum')).toBeInTheDocument()
    expect(screen.getByTestId('sport')).toBeInTheDocument()
    expect(screen.getByTestId('cur')).toBeInTheDocument()
    expect(screen.getByTestId('bet')).toBeInTheDocument()
  })
})

// duplicate removed
