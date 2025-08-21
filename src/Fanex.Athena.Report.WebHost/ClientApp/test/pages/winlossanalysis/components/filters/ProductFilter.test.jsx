import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, default: (p) => <div data-testid="multi" {...p} /> }))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, currentLanguage: 'en' } }))

import ProductFilter from '@/pages/winlossanalysis/components/filters/ProductFilter'

const createMockStore = productList => createStore(s => s, { productList })

describe('ProductFilter', () => {
    test('renders nothing when list empty', () => {
        const store = createMockStore([])
        const { container } = render(<Provider store={store}><ProductFilter /></Provider>)
        expect(container.querySelector('[data-testid="multi"]')).toBeNull()
    })

    test('renders MultipleSelect when list exists', () => {
        const store = createMockStore([{ id: 1, value: 'S', status: '' }])
        const { getByTestId } = render(<Provider store={store}><ProductFilter isValid={true} onChange={() => {}} /></Provider>)
        expect(getByTestId('multi')).toBeInTheDocument()
    })
})


