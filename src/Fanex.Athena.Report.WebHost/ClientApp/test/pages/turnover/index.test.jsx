import React from 'react'
import { render } from '@testing-library/react'
import Page from '@/pages/turnover'

jest.mock('@/styles/pages/turnover.scss', () => ({}))
jest.mock('@/pages/turnover/components/AppContainer', () => ({ __esModule: true, default: () => <div data-testid="app">turnover</div> }))
jest.mock('@/lib/store', () => ({ __esModule: true, default: { createStore: jest.fn(() => ({ dispatch: jest.fn(), getState: jest.fn(() => ({})), subscribe: jest.fn() })) } }))
jest.mock('@/pages/turnover/common', () => ({ __esModule: true, constants: { DateRange: {} } }))

describe('pages/turnover', () => {
	test('renders provider with AppContainer', () => {
		render(<Page />)
		expect(document.querySelector('[data-testid="app"]').textContent).toBe('turnover')
	})
})


