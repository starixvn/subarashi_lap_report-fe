import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

jest.mock('@legion-lib/react-grid', () => ({ Table: ({ children }) => <div data-testid="table">{children}</div>, Row: ({ children }) => <div>{children}</div>, Cell: ({ children }) => <div>{children}</div>, HeaderRow: ({ children }) => <div>{children}</div>, HeaderCell: ({ children }) => <div>{children}</div> }))
jest.mock('moment', () => {
    const chain = {
        add: () => chain,
        format: () => '01/01/2024',
        clone: () => chain
    }
    return { utc: () => chain }
})
jest.mock('@/components/NoDataTitle', () => () => <div>NoData</div>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))

import DataGrid from '@/pages/settledmatchcount/components/DataGrid'

const createMockStore = gridData => createStore(combineReducers({ gridData: (s = gridData) => s }))

describe('SettledMatchCount DataGrid', () => {
    test('null, empty, then render table', () => {
        const nullStore = createMockStore(null)
        const { container, rerender } = render(<Provider store={nullStore}><DataGrid /></Provider>)
        expect(container.firstChild).toBeNull()

        const emptyStore = createMockStore([])
        rerender(<Provider store={emptyStore}><DataGrid /></Provider>)
        expect(screen.getByText('NoData')).toBeInTheDocument()

        const dataStore = createMockStore([{ sportName: 'Football', yesterdayEntered: 1, yesterdayNonEntered: 2, todayEntered: 3, todayNonEntered: 4 }])
        rerender(<Provider store={dataStore}><DataGrid /></Provider>)
        expect(screen.getByTestId('table')).toBeInTheDocument()
    })
})


