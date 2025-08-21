import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, default: (p) => <div data-testid="multi" {...p} /> }))
jest.mock('@/components/ReportSelect', () => (p) => <select data-testid="report-select" onChange={() => p.onChange(1)}></select>)
jest.mock('@/components/UserGuide', () => (p) => <button data-testid="guide" onClick={p.onClick}>G</button>)
jest.mock('@/components/ExportExcel', () => (p) => <button data-testid="export" onClick={p.onClick} disabled={p.disabled}>E</button>)
jest.mock('@/components/SubmitButton', () => (p) => <button data-testid="submit" onClick={p.onClick} disabled={p.disabled}>{p.children}</button>)
jest.mock('@/components/RefreshCountDownButton', () => (p) => <button data-testid="refresh" onClick={p.onRefresh}>R</button>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, currentLanguage: 'en' } }))
jest.mock('@/pages/matchmonitoringcenter/hook', () => ({ useFilterAction: () => ({ submit: jest.fn(), fetchData: jest.fn(), resetFilter: jest.fn(), exportExcel: jest.fn(), fetchUserGuide: jest.fn() }), useFilterHandler: () => ({ onChangeSelectedLeague: jest.fn(), onChangeSelectedTriggeredAlert: jest.fn(), onChangeSelectedCurrency: jest.fn(), onChangeSelectedBaseCurrency: jest.fn(), onChangeSelectedMatchStatus: jest.fn(), onChangeSelectedMatch: jest.fn() }) }))
jest.mock('@/pages/matchmonitoringcenter/common', () => ({ constants: { TriggerAlert: [], MatchStatus: [], RefreshCountdown: { Options: [], DefaultValue: 0 } } }))

import FormFilter from '@/pages/matchmonitoringcenter/components/FormFilter'

const createMockStore = (state) => createStore(s => s, state)

describe('MMC FormFilter', () => {
    test('renders and disables Submit when form invalid', () => {
        const state = {
            formData: { currencies: [] }, userGuideContent: null, selectedLeague: null, selectedMatch: null, selectedMatchStatus: null, selectedTriggeredAlert: null, selectedCurrency: null, baseCurrencyList: [], selectedBaseCurrency: null, matchList: [], appUuid: 'id', lastFetchTime: 0, isShowPopup: false, leagueList: []
        }
        const store = createMockStore(state)
        render(<Provider store={store}><FormFilter /></Provider>)
        expect(screen.getByTestId('submit')).toBeDisabled()
    })
})



