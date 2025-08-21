import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@/hooks/useToggleRequest', () => () => ({ sendRequest: fn => fn() }))
jest.mock('@/pages/subsidiaryperformance/actions', () => ({ __esModule: true, default: { fetchGridData: (url, p) => ({ type: 'FETCH', url, p }) } }))
jest.mock('@/pages/subsidiaryperformance/common', () => ({ constants: { ApiUrl: { DETAIL_URL: '/detail' } } }))

import ReportLink from '@/pages/subsidiaryperformance/customGrid/ReportLink'

const createMockStore = state => createStore((s, a) => s, state)

describe('ReportLink', () => {
  test('dispatches fetch on click', () => {
    const store = createMockStore({ requestParam: {} })
    render(<Provider store={store}><ReportLink subsidiary={1}>X</ReportLink></Provider>)
    fireEvent.click(screen.getByText('X'))
  })
})


