import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, default: p => <div data-testid="multi" /> }))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, currentLanguage: 'en' } }))

import Comp from '@/pages/winlossanalysis/components/filters/RiskLevelFilter'

const createMockStore = state => createStore(s => s, state)

test('renders risk level select when list exists', () => {
  const store = createMockStore({ formData: { riskLevelList: [{ id: 1, value: 'R', status: true }] } })
  render(<Provider store={store}><Comp onChange={() => {}} isValid={true} /></Provider>)
  expect(screen.getByTestId('multi')).toBeInTheDocument()
})


