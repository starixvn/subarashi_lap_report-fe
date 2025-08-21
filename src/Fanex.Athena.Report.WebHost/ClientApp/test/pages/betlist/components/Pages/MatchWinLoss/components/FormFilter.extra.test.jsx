import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('react-router-dom', () => ({ useNavigate: () => jest.fn() }))
jest.mock('@/components/ExportExcel', () => p => <button data-testid="export" onClick={p.onClick}>E</button>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/pages/betlist/components/Pages/MatchWinLoss/constant/apiSettings', () => ({ ApiUrl: { EXPORT_EXCEL_URL: '/exp' } }))

import FormFilter from '@/pages/betlist/components/Pages/MatchWinLoss/components/FormFilter'

const state = { formData: { title: 'T', fromDate: 'f', baseCurrency: 'usd' }, requestParam: { CurrencyName: 'usd' } }
const makeStore = (s = state) => createStore(r => r, s)

test('Betlist MatchWinLoss FormFilter export calls handler', () => {
  const store = makeStore()
  const processExcel = jest.fn()
  render(<Provider store={store}><FormFilter isValidExcel={true} processExcel={processExcel} /></Provider>)
  fireEvent.click(screen.getByTestId('export'))
  expect(processExcel).toHaveBeenCalled()
})


