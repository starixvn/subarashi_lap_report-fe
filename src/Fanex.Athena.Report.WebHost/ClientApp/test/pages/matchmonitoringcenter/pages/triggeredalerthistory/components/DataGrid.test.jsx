import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

jest.mock('@legion-lib/react-grid', () => ({
    Table: ({ children }) => <div data-testid="table">{children}</div>,
    HeaderRow: ({ children }) => <div data-testid="header-row">{children}</div>,
    HeaderCell: ({ children }) => <div data-testid="header-cell">{children}</div>,
    Cell: ({ children }) => <div data-testid="cell">{children}</div>,
    Row: ({ children }) => <div data-testid="row">{children}</div>
}))
jest.mock('@/components/NoDataTitle', () => () => <div>NoData</div>)

import DataGrid from '@/pages/matchmonitoringcenter/pages/triggeredalerthistory/components/DataGrid'

const createMockStore = gridData => {
    const reducers = { gridData: (s = gridData) => s }
    return createStore(combineReducers(reducers))
}

describe('TriggeredAlertHistory DataGrid', () => {
    test('returns null when gridData is null', () => {
        const store = createMockStore(null)
        const { container } = render(
            <Provider store={store}>
                <DataGrid />
            </Provider>
        )
        expect(container.firstChild).toBeNull()
    })

    test('renders NoData when empty list', () => {
        const store = createMockStore([])
        render(
            <Provider store={store}>
                <DataGrid />
            </Provider>
        )
        expect(screen.getByText('NoData')).toBeInTheDocument()
    })

    test('renders table when data available', () => {
        const store = createMockStore([
            { timeString: '10:00', detectedInfos: ['info1', 'info2'], alertRules: ['rule1'] }
        ])
        render(
            <Provider store={store}>
                <DataGrid />
            </Provider>
        )
        expect(screen.getByTestId('table')).toBeInTheDocument()
    })
})