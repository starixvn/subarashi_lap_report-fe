import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

jest.mock('@legion-lib/react-grid', () => ({ Table: ({ children }) => <div data-testid="table">{children}</div>, Row: ({ children }) => <div>{children}</div>, Cell: ({ children }) => <div>{children}</div>, HeaderRow: ({ children }) => <div>{children}</div> }))
jest.mock('@/components/NoDataTitle', () => () => <div>NoData</div>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/lib/numberFormat', () => ({ __esModule: true, default: { formatInteger: v => v } }))

import DataGrid from '@/pages/weeklylivematch/components/DataGrid'

const createMockStore = gridData => createStore(combineReducers({ gridData: (s = gridData) => s, requestParam: (s = {}) => s }))

describe('WeeklyLiveMatch DataGrid', () => {
    test('null and empty states, then table renders', () => {
        const nullStore = createMockStore(null)
        const { container, rerender } = render(<Provider store={nullStore}><DataGrid /></Provider>)
        expect(container.firstChild).toBeNull()

        const emptyStore = createMockStore({ data: [], weekHeaders: [], weeksTotalData: [] })
        rerender(<Provider store={emptyStore}><DataGrid /></Provider>)
        expect(screen.getByText('NoData')).toBeInTheDocument()

        const dataStore = createMockStore({ data: [{ cell: [0, 'Football', 1, 2] }], weekHeaders: ['W1'], weeksTotalData: [3] })
        rerender(<Provider store={dataStore}><DataGrid /></Provider>)
        expect(screen.getByTestId('table')).toBeInTheDocument()
    })
})


