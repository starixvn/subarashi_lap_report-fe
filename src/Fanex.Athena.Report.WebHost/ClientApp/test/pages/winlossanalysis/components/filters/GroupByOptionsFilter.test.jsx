import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/pages/winlossanalysis/common/Service.js', () => ({ __esModule: true, default: { buildGroupByOption: () => ([{ value: 1, label: 'A' }, { value: 2, label: 'B' }]) } }))
jest.mock('@/pages/winlossanalysis/components/hooks/useGroupFilterHandler.jsx', () => () => ({ onChangeGroupByOption: jest.fn() }))

import GroupByOptionFilter from '@/pages/winlossanalysis/components/filters/GroupByOptionsFilter'

const createMockStore = state => createStore(s => s, state)

describe('GroupByOptionFilter', () => {
  test('renders options and toggles', () => {
    const store = createMockStore({ formData: { licenseeName: 'X' }, selectedGroupByOption: 1, selectedViewInTime: 0 })
    render(<Provider store={store}><GroupByOptionFilter /></Provider>)
    expect(screen.getByText(/GroupBy/i)).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('B'))
  })
})


