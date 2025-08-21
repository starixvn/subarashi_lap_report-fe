import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

jest.mock('@legion-lib/react-grid', () => ({ Table: ({ children }) => <div data-testid="table">{children}</div> }))
jest.mock('@legion-lib/react-breadcrumb', () => ({ Breadcrumb: () => <div data-testid="breadcrumb" /> }))
jest.mock('@/components/NoDataTitle', () => () => <div>NoData</div>)
jest.mock('@/components/ReportTitle', () => () => <div data-testid="report-title" />)
jest.mock('@/components/Popup', () => ({ children }) => <div data-testid="popup">{children}</div>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/lib/numberFormat', () => ({ __esModule: true, default: { formatInteger: v => v } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postReportData: jest.fn() } }))
jest.mock('@/pages/extrapayout/common/gridUtils', () => ({
    renderHeader: () => [<div key="h">H</div>],
    renderDataSection: () => ({ bodyData: [<div key="b">B</div>], index: 0 }),
    renderFooter: () => [<div key="f">F</div>]
}))
jest.mock('@/pages/extrapayout/common/service', () => ({ __esModule: true, default: { getFormattedDate: d => d, getTitle: () => 'title', showErrorMsg: jest.fn() } }))
jest.mock('@/pages/extrapayout/components/Detail', () => () => <div data-testid="detail" />)
jest.mock('@/pages/extrapayout/common/constants', () => ({ __esModule: true, ApiUrl: {}, ReportLevel: { MAIN: 0, CUSTOMER: 1 }, BreadcrumbText: { main: 'Main', customer: 'Customer' }, DefaultPagingOption: { PageIndex: 1, PageSize: 10, PageList: [10] } }))
jest.mock('@/pages/extrapayout/actions', () => ({ __esModule: true, default: { setRequestParam: p => ({ type: 'SET_REQUEST', payload: p }), toggleLoader: () => ({ type: 'TOGGLE' }), getReportData: () => ({ type: 'GET' }), setReportTitle: () => ({ type: 'SET_TITLE' }), setDetailParams: p => ({ type: 'SET_DETAIL', payload: p }) } }))

import DataGrid from '@/pages/extrapayout/components/DataGrid'

const createMockStore = (state) => {
    const reducers = {
        requestParam: (s = state.requestParam) => s,
        reportData: (s = state.reportData) => s,
        reportTitle: (s = 't') => s,
        reloadReport: (s = 0) => s,
        detailParams: (s = null, a) => (a?.type === 'SET_DETAIL' ? a.payload : s),
        selectedCurrency: (s = 1) => s,
        isConvertAllToBaseCurrency: (s = false) => s
    }
    return createStore(combineReducers(reducers))
}

describe('ExtraPayout DataGrid', () => {
    test('null and empty states, then render table', () => {
        const emptyStore = createMockStore({ requestParam: {}, reportData: { data: null, totalRows: 0 } })
        const { rerender } = render(<Provider store={emptyStore}><DataGrid /></Provider>)
        
        const noDataStore = createMockStore({ requestParam: {}, reportData: { data: [], totalRows: 0 } })
        rerender(<Provider store={noDataStore}><DataGrid /></Provider>)
        expect(screen.getByText('NoData')).toBeInTheDocument()

        const dataStore = createMockStore({ requestParam: { DrillDownLevel: 0, PageIndex: 1, PageSize: 10 }, reportData: { data: [{}], totalRows: 1 } })
        rerender(<Provider store={dataStore}><DataGrid /></Provider>)
        expect(screen.getByTestId('table')).toBeInTheDocument()
    })
})


