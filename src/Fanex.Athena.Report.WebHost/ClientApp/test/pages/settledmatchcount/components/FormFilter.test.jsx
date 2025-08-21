import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@/components/UserGuide', () => (p) => <button data-testid="guide" onClick={p.onClick}>G</button>)
jest.mock('@/components/CollapsiblePanel', () => (p) => <div data-testid="panel" />)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/hooks/useToggleRequest', () => () => ({ sendRequest: (fn, cb) => { cb && cb({ data: {} }) } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { getReportData: jest.fn() } }))
jest.mock('@/pages/settledmatchcount/actions', () => ({ ActionCreators: { setGridData: () => ({ type: 'A' }), getUserGuideContent: () => ({ type: 'B' }) } }))
jest.mock('@/pages/settledmatchcount/constants', () => ({ __esModule: true, default: { ApiUrl: { REPORT_DATA_URL: '/x' } } }))

import FormFilter from '@/pages/settledmatchcount/components/FormFilter'

const createMockStore = () => createStore(s => s, { userGuideContent: null })

describe('SettledMatchCount FormFilter', () => {
  test('renders without crashing', () => {
    const store = createMockStore()
    render(<Provider store={store}><FormFilter /></Provider>)
  })
})



