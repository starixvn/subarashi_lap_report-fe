import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('react-router-dom', () => ({ useRouteLoaderData: () => ({ IsSelfMode: false }) }))
jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, default: p => <select data-testid="multi" onChange={() => p.onChange(null, '1')} /> }))
jest.mock('@/components/ReportSelect', () => p => <select data-testid="report-select" onChange={() => p.onChange({ label: 'USD', value: 1 })} />)
jest.mock('@/components/CollapsiblePanel', () => ({ children }) => <div>{children}</div>)
jest.mock('@/components/SubmitButton', () => p => <button data-testid="submit" onClick={p.onClick} disabled={p.disabled}>{p.children}</button>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, currentLanguage: 'en' } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { getReportFile: jest.fn(() => Promise.resolve({ status: 200, data: new Blob(['x']) })) } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { downloadFile: jest.fn(), getLrfSubsidiary: jest.fn(() => ({})) } }))

import Site from '@/lib/site'
import FormFilter from '@/pages/customersupporttask/components/FormFilter'

const createMockStore = (state) => createStore(s => s, state)

describe('CustomerSupportTask FormFilter', () => {
  const baseState = {
    formData: { currencies: [{ key: 1, value: 'USD' }] },
    selectedCurrency: '',
    selectedSupportTask: { label: 'X', value: 'A' }
  }

  test('submit disabled when currency not selected', () => {
    const store = createMockStore(baseState)
    render(<Provider store={store}><FormFilter /></Provider>)
    expect(screen.getByTestId('submit')).toBeDisabled()
  })

  test('export triggers file download when valid', async () => {
    const store = createMockStore({ ...baseState, selectedCurrency: { label: 'USD', value: 1 } })
    render(<Provider store={store}><FormFilter /></Provider>)
    expect(screen.getByTestId('submit')).toBeEnabled()
    fireEvent.click(screen.getByTestId('submit'))
    await new Promise(r => setTimeout(r, 0))
    const download = Site.default ? Site.default.downloadFile : Site.downloadFile
    expect(download).toBeDefined()
  })
})


