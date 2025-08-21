import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, default: p => <div data-testid="multi" /> }))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, currentLanguage: 'en' } }))

import Comp from '@/pages/winlossanalysis/components/filters/LiveStatusFilter'

const createMockStore = state => createStore(s => s, state)

test('renders with liveStatusList', () => {
  const store = createMockStore({ formData: { liveStatusList: [{ id: 1, value: 'Live', status: true }] } })
  render(<Provider store={store}><Comp onChange={() => {}} isValid={true} /></Provider>)
  expect(screen.getByTestId('multi')).toBeInTheDocument()
})


