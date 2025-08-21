import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

jest.mock('@legion-lib/react-grid', () => ({
  Table: ({ header, body }) => <div data-testid="table"><div>{header}</div><div>{body}</div></div>,
  HeaderRow: ({ children }) => <div>{children}</div>,
  HeaderCell: ({ children }) => <button data-testid="hcell">{children}</button>,
  Row: ({ children }) => <div>{children}</div>,
  Cell: ({ children }) => <div>{children}</div>
}))
jest.mock('@/components/NoDataTitle', () => () => <div data-testid="no-data" />)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: (k) => k } }))
jest.mock('@/components/PieChart', () => () => <div data-testid="pie" />)
jest.mock('@/components/sweet-alert', () => () => <div data-testid="sweet" />)
jest.mock('@/components/Popup', () => () => null)
jest.mock('@/pages/matchmonitoringcenter/hook', () => ({ __esModule: true, useGridAction: () => ({ Remove: jest.fn(), Setting: jest.fn(), History: jest.fn() }) }))

import DataGrid from '@/pages/matchmonitoringcenter/components/DataGrid'

const createMockStore = (state) => createStore(combineReducers({
  gridData: (s = state.gridData) => s,
  lastFetchTime: (s = 0) => s,
  sweetAlertOption: (s = null) => s,
  settingPageOption: (s = null) => s,
  formData: (s = state.formData) => s
}))

describe('MatchMonitoringCenter DataGrid behavior', () => {
  test('renders rows for running and settled groups', () => {
    const state = {
      gridData: {
        running: [
          { leagueId: 1, leagueName: 'L1', monitoringId: 'm1', kickOffTimeString: 't', isAlerted: false, alertRules: ['x'], matchName: 'mn', homeName: 'h', awayName: 'a', totalHome: 1, totalAway: 2, homeStake: 10, awayStake: 20, forecastHome: 3, forecastAway: 4, liveIndicator: false, liveHomeScore: 0, liveAwayScore: 0, isSettled: false }
        ],
        settled: [
          { leagueId: 2, leagueName: 'L2', monitoringId: 'm2', kickOffTimeString: 't2', isAlerted: true, alertRules: [], matchName: 'mn2', homeName: 'hh', awayName: 'aa', totalHome: 0, totalAway: 0, homeStake: 0, awayStake: 0, forecastHome: 0, forecastAway: 0, liveIndicator: false, liveHomeScore: 0, liveAwayScore: 0, isSettled: true }
        ]
      },
      formData: { hasSettingPermission: true }
    }
    const store = createMockStore(state)
    render(<Provider store={store}><DataGrid /></Provider>)
    expect(screen.getByTestId('table')).toBeInTheDocument()
    expect(screen.getAllByTestId('hcell').length).toBeGreaterThan(0)
  })
})



