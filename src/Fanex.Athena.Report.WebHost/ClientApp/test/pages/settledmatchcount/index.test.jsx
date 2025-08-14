import React from 'react'
import { render } from '@testing-library/react'
import Page from '@/pages/settledmatchcount'

jest.mock('@/styles/pages/settledmatchcount.scss', () => ({}))
jest.mock('@/pages/settledmatchcount/components/AppContainer', () => ({ __esModule: true, default: () => <div data-testid="app">settledmatchcount</div> }))
jest.mock('@/lib/store', () => ({ __esModule: true, default: { createStore: jest.fn(() => ({ dispatch: jest.fn(), getState: jest.fn(() => ({})), subscribe: jest.fn() })) } }))

describe('pages/settledmatchcount', () => {
	test('renders provider with AppContainer', () => {
		render(<Page />)
		expect(document.querySelector('[data-testid="app"]').textContent).toBe('settledmatchcount')
	})
})


