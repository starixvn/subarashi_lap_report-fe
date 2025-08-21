import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

jest.mock('@legion-lib/react-grid', () => ({
  Table: ({ header, body }) => <div data-testid="table"><div data-testid="hdr">{header}</div><div data-testid="body">{body}</div></div>,
  HeaderRow: ({ children }) => <div data-testid="hrow">{children}</div>,
  HeaderCell: ({ children }) => <div data-testid="hcell">{children}</div>,
  Row: ({ children }) => <div data-testid="row">{children}</div>,
  Cell: ({ children }) => <div data-testid="cell">{children}</div>
}))
jest.mock('@/components/NoDataTitle', () => () => <div data-testid="no-data" />)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: (k) => k } }))
jest.mock('@/components/PieChart', () => () => <div data-testid="pie" />)
jest.mock('@/components/sweet-alert', () => () => <div data-testid="sweet" />)
jest.mock('@/components/Popup', () => (p) => (p.isShow ? <div data-testid="popup" /> : null))
jest.mock('@/pages/matchmonitoringcenter/hook', () => ({ __esModule: true, useGridAction: () => ({ Remove: jest.fn(), Setting: jest.fn(), History: jest.fn() }) }))

import DataGrid from '@/pages/matchmonitoringcenter/components/DataGrid'

const createMockStore = (state) => createStore(combineReducers({
  gridData: (s = state.gridData) => s,
  lastFetchTime: (s = 0) => s,
  sweetAlertOption: (s = null) => s,
  settingPageOption: (s = null) => s,
  formData: (s = state.formData) => s
}))

describe('MatchMonitoringCenter DataGrid', () => {
  test('null and empty states', () => {
    const nullStore = createMockStore({ gridData: null, formData: { hasSettingPermission: false } })
    const { container, rerender } = render(<Provider store={nullStore}><DataGrid /></Provider>)
    expect(container.firstChild).toBeNull()

    const emptyStore = createMockStore({ gridData: { running: [], settled: [] }, formData: { hasSettingPermission: false } })
    rerender(<Provider store={emptyStore}><DataGrid /></Provider>)
    expect(screen.getByTestId('no-data')).toBeInTheDocument()
  })

  test('renders headers and body with data', () => {
    const state = {
      gridData: {
        running: [{ leagueId: 1, leagueName: 'L1', monitoringId: 'm1', kickOffTimeString: 't', isAlerted: false, alertRules: [], matchName: 'mn', homeName: 'h', awayName: 'a', totalHome: 1, totalAway: 2, homeStake: 10, awayStake: 20, forecastHome: 3, forecastAway: 4, liveIndicator: true, liveHomeScore: 1, liveAwayScore: 0, isSettled: false }],
        settled: []
      },
      formData: { hasSettingPermission: true }
    }
    const store = createMockStore(state)
    render(<Provider store={store}><DataGrid /></Provider>)
    expect(screen.getByTestId('table')).toBeInTheDocument()
    expect(screen.getAllByTestId('hcell').length).toBeGreaterThan(0)
    expect(screen.getAllByTestId('row').length).toBeGreaterThan(0)
  })
})