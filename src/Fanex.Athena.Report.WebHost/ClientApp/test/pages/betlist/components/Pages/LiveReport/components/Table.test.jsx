import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('@/components/BetListTable', () => props => <div data-testid="tbl" {...props} />)
jest.mock('@/pages/betlist/components/Pages/LiveReport/common/tableSettings', () => ({
  DefaultPageSize: 10,
  PageList: [10,20],
  Columns: [],
  ColumnWidths: [],
  SortableColumns: [],
  TotalColumns: 0,
  ColumnAlignments: []
}))

import Table from '@/pages/betlist/components/Pages/LiveReport/components/Table'

const mockStore = configureStore([])

describe('LiveReport Table', () => {
  test('passes paging and table settings to BetListTable', () => {
    const store = mockStore({ requestParam: { Page: 2, Rows: 25 } })
    const { getByTestId } = render(
      <Provider store={store}>
        <Table totalRows={200} />
      </Provider>
    )
    const el = getByTestId('tbl')
    expect(el).toBeInTheDocument()
  })
})


