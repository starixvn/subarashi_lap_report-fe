import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('react-router-dom', () => ({ useNavigate: () => jest.fn() }))
jest.mock('@/components/ExportExcel', () => p => <button data-testid="export" onClick={p.onClick}>E</button>)
jest.mock('@/hooks/useToggleRequest', () => () => ({ sendRequest: (fn, cb) => { cb && cb({ data: new Blob(['x']) }) } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { getReportFile: jest.fn(() => Promise.resolve({ status: 200, data: new Blob(['x']) })) } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { downloadFile: jest.fn() } }))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))

import FormFilter from '@/pages/livereport/matchlist/components/FormFilter'

const state = { requestParam: { a: 1 } }
const makeStore = (s = state) => createStore(r => r, s)

test('LiveReport matchlist FormFilter export works', () => {
  const store = makeStore()
  render(<Provider store={store}><FormFilter /></Provider>)
  fireEvent.click(screen.getByTestId('export'))
})


