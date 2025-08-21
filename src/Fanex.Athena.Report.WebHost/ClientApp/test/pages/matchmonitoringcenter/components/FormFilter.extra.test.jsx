import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, default: p => <div data-testid="multi" onClick={() => p.onChange && p.onChange(null, 'L1')} /> }))
jest.mock('@/components/ReportSelect', () => p => <select data-testid={p.id || 'report-select'} onChange={() => p.onChange && p.onChange({ label: 'USD', value: 1 })} />)
jest.mock('@/components/CollapsiblePanel', () => p => <div>{p.children}{p.stickyFooter}</div>)
jest.mock('@/components/ExportExcel', () => p => <button data-testid="export" onClick={p.onClick} disabled={p.disabled}>E</button>)
jest.mock('@/components/SubmitButton', () => p => <button data-testid="submit" onClick={p.onClick} disabled={p.disabled}>{p.children}</button>)
jest.mock('@/components/RefreshCountDownButton', () => p => <button data-testid="refresh" onClick={p.onRefresh}>R</button>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, getDateRangeResource: k => k, currentLanguage: 'en' } }))
jest.mock('@/pages/matchmonitoringcenter/hook', () => ({ useFilterAction: () => ({ submit: jest.fn(), fetchData: jest.fn(), resetFilter: jest.fn(), exportExcel: jest.fn(), fetchUserGuide: jest.fn() }), useFilterHandler: () => ({ onChangeSelectedLeague: jest.fn(), onChangeSelectedTriggeredAlert: jest.fn(), onChangeSelectedCurrency: jest.fn(), onChangeSelectedBaseCurrency: jest.fn(), onChangeSelectedMatchStatus: jest.fn(), onChangeSelectedMatch: jest.fn() }) }))
jest.mock('@/pages/matchmonitoringcenter/common', () => ({ constants: { TriggerAlert: [], MatchStatus: [], RefreshCountdown: { Options: [], DefaultValue: 5 } } }))

import FormFilter from '@/pages/matchmonitoringcenter/components/FormFilter'

const state = {
  formData: { currencies: [{ label: 'USD', value: 1 }] },
  userGuideContent: null,
  selectedLeague: 'L1',
  selectedMatch: 'M1',
  selectedMatchStatus: { label: 'l', value: 1 },
  selectedTriggeredAlert: { label: 'a', value: 1 },
  selectedCurrency: { label: 'USD', value: 1 },
  baseCurrencyList: [{ label: 'USD', value: 1 }],
  selectedBaseCurrency: { label: 'USD', value: 1 },
  matchList: [],
  appUuid: 'u',
  lastFetchTime: 0,
  isShowPopup: false,
  leagueList: []
}

const makeStore = (s = state) => createStore(r => r, s)

test('MatchMonitoringCenter FormFilter shows enabled submit and export when valid', () => {
  const store = makeStore()
  render(<Provider store={store}><FormFilter /></Provider>)
  expect(screen.getByTestId('submit')).toBeEnabled()
  expect(screen.getByTestId('export')).toBeEnabled()
  fireEvent.click(screen.getByTestId('submit'))
})


