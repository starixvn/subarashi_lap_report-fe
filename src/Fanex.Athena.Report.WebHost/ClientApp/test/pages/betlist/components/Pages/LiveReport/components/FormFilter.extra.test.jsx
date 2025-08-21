import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('react-router-dom', () => ({ useNavigate: () => jest.fn() }))
jest.mock('@/components/ExportExcel', () => p => <button data-testid="export" onClick={p.onClick}>E</button>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))

import FormFilter from '@/pages/betlist/components/Pages/LiveReport/components/FormFilter'

const state = { formData: { title: 'T', fromDate: 'f', toDate: 't', baseCurrency: 'usd', url: '' }, requestParam: {} }
const makeStore = (s = state) => createStore(r => r, s)

test('Betlist LiveReport FormFilter export button calls handler', () => {
  const store = makeStore()
  const processExcel = jest.fn()
  render(<Provider store={store}><FormFilter isValidExcel={true} processExcel={processExcel} /></Provider>)
  fireEvent.click(screen.getByTestId('export'))
  expect(processExcel).toHaveBeenCalled()
})


