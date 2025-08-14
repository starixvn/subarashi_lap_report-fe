import React from 'react'
import { render } from '@testing-library/react'
import Page from '@/pages/livereport/summary'

jest.mock('@/styles/pages/livereportsummary.scss', () => ({}))
jest.mock('@/pages/livereport/summary/components/AppContainer', () => ({ __esModule: true, default: () => <div data-testid="app">livereport-summary</div> }))
jest.mock('@/lib/store', () => ({ __esModule: true, default: { createStore: jest.fn() } }))
jest.mock('@/pages/livereport/summary/common', () => ({ __esModule: true, constants: { DefaultDateRange: {} } }))
jest.mock('@/hooks/useSessionStore', () => ({ __esModule: true, default: () => ({ dispatch: jest.fn(), getState: jest.fn(() => ({})), subscribe: jest.fn() }) }))

describe('pages/livereport/summary', () => {
	test('renders provider with AppContainer', () => {
		render(<Page />)
		expect(document.querySelector('[data-testid="app"]').textContent).toBe('livereport-summary')
	})
})


