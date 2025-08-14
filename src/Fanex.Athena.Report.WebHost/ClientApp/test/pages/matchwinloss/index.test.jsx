import React from 'react'
import { render } from '@testing-library/react'
import Page from '@/pages/matchwinloss'

jest.mock('@/styles/pages/matchwinloss.scss', () => ({}))
jest.mock('@/pages/matchwinloss/components/AppContainer', () => ({ __esModule: true, default: () => <div data-testid="app">matchwinloss</div> }))
jest.mock('@/lib/store', () => ({ __esModule: true, default: { createStore: jest.fn() } }))
jest.mock('@/hooks/useSessionStore', () => ({ __esModule: true, default: () => ({ dispatch: jest.fn(), getState: jest.fn(() => ({})), subscribe: jest.fn() }) }))

describe('pages/matchwinloss', () => {
	test('renders provider with AppContainer', () => {
		render(<Page />)
		expect(document.querySelector('[data-testid="app"]').textContent).toBe('matchwinloss')
	})
})


