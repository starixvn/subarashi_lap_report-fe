import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-grid', () => ({ Table: ({ children }) => <div data-testid="table">{children}</div> }))
jest.mock('@/components/NoDataTitle', () => () => <div data-testid="no-data-title">NoData</div>)
jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/Log/lib/gridBuilder', () => ({
    BuildHeaders: () => [<div key="h">H</div>],
    BuildBody: data => data.map((_, i) => <div key={i}>R</div>)
}))

import DataGrid from '@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/Log/components/DataGrid'

const createMockStore = (gridData) => createStore((state) => state, { gridData })

describe('MMC Log DataGrid', () => {
    test('returns null when gridData is null', () => {
        const store = createMockStore(null)
        const { container } = render(<Provider store={store}><DataGrid /></Provider>)
        expect(container.firstChild).toBeNull()
    })

    test('renders NoDataTitle when empty', () => {
        const store = createMockStore([])
        render(<Provider store={store}><DataGrid /></Provider>)
        expect(screen.getByTestId('no-data-title')).toBeInTheDocument()
    })

    test('renders table when data exists', () => {
        const store = createMockStore([{}])
        render(<Provider store={store}><DataGrid /></Provider>)
        expect(screen.getByTestId('table')).toBeInTheDocument()
    })
})



