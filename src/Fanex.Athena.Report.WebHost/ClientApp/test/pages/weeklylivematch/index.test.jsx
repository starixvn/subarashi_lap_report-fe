import React from 'react'
import { render } from '@testing-library/react'
import Page from '@/pages/weeklylivematch'

jest.mock('@/styles/pages/weeklylivematch.scss', () => ({}))
jest.mock('@/pages/weeklylivematch/components/AppContainer', () => ({ __esModule: true, default: () => <div data-testid="app">weeklylivematch</div> }))
jest.mock('@/lib/store', () => ({ __esModule: true, default: { createStore: jest.fn(() => ({ dispatch: jest.fn(), getState: jest.fn(() => ({})), subscribe: jest.fn() })) } }))
jest.mock('@/pages/weeklylivematch/constants', () => ({ __esModule: true, default: { DateRange: {} } }))

describe('pages/weeklylivematch', () => {
	test('renders provider with AppContainer', () => {
		render(<Page />)
		expect(document.querySelector('[data-testid="app"]').textContent).toBe('weeklylivematch')
	})
})


