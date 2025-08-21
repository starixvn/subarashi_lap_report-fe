import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, default: (p) => <div data-testid="multi" {...p} /> }))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, currentLanguage: 'en' } }))

import OddsGroupFilter from '@/pages/winlossanalysis/components/filters/OddsGroupFilter'

const createMockStore = oddsGroupList => createStore(s => s, { formData: { oddsGroupList } })

describe('OddsGroupFilter', () => {
    test('renders nothing when list empty', () => {
        const store = createMockStore([])
        const { container } = render(<Provider store={store}><OddsGroupFilter /></Provider>)
        expect(container.querySelector('[data-testid="multi"]')).toBeNull()
    })

    test('renders MultipleSelect when list exists', () => {
        const store = createMockStore([{ id: 1, value: 'OG', status: '' }])
        const { getByTestId } = render(<Provider store={store}><OddsGroupFilter isValid={true} onChange={() => {}} /></Provider>)
        expect(getByTestId('multi')).toBeInTheDocument()
    })
})


