import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

jest.mock('@legion-lib/react-grid', () => ({ Table: ({ children }) => <div data-testid="table">{children}</div> }))
jest.mock('@/hooks/useToggleRequest', () => ({ __esModule: true, default: () => ({ sendRequest: jest.fn() }) }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { getReportData: jest.fn() } }))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/components/SubmitButton', () => ({ onClick, disabled, children }) => (
    <button onClick={onClick} disabled={disabled}>{children}</button>
))
jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/gridBuilder/GridBuilder', () => ({
    BuildHeaders: () => [<div key="h">H</div>],
    BuildBody: () => [<div key="b">B</div>]
}))
jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/actions', () => ({
    __esModule: true,
    default: {
        setGridData: payload => ({ type: 'SET_GRID_DATA', payload }),
        setAddNewRule: payload => ({ type: 'SET_ADD_NEW_RULE', payload })
    }
}))

import DataGrid from '@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/DataGrid'

const createMockStore = (initial = {}) => {
    const reducers = {
        gridData: (s = [], a) => (a?.type === 'SET_GRID_DATA' ? a.payload : s),
        addNewRule: (s = false, a) => (a?.type === 'SET_ADD_NEW_RULE' ? a.payload : s),
        monitoringID: (s = 1) => s,
        ...initial
    }
    return createStore(combineReducers(reducers))
}

describe('AlertRule DataGrid', () => {
    test('renders table and add new rule button', () => {
        const store = createMockStore()
        store.dispatch = jest.fn(store.dispatch)
        render(
            <Provider store={store}>
                <DataGrid />
            </Provider>
        )
        expect(screen.getByTestId('table')).toBeInTheDocument()
        const btn = screen.getByRole('button')
        expect(btn).toBeInTheDocument()
        fireEvent.click(btn)
        expect(store.dispatch).toHaveBeenCalledWith({ type: 'SET_ADD_NEW_RULE', payload: true })
    })
})


