import React from 'react'
import { render } from '@testing-library/react'
import CustomerBalance from '@/pages/customerbalance'

jest.mock('@/styles/pages/customerbalance.scss', () => ({}))
jest.mock('@/pages/customerbalance/components/AppContainer', () => ({ __esModule: true, default: () => <div data-testid="app">customerbalance</div> }))
jest.mock('@/lib/store', () => ({ __esModule: true, default: { createStore: jest.fn(() => ({ dispatch: jest.fn(), getState: jest.fn(() => ({})), subscribe: jest.fn() })) } }))

describe('pages/customerbalance', () => {
	test('renders provider with AppContainer', () => {
		render(<CustomerBalance />)
		expect(document.querySelector('[data-testid="app"]').textContent).toBe('customerbalance')
	})
})


