import React from 'react'
import { render } from '@testing-library/react'
import Page from '@/pages/livereport/matchlist'

jest.mock('@/styles/pages/livereportmatchlist.scss', () => ({}))
jest.mock('@/pages/livereport/matchlist/components/AppContainer', () => ({ __esModule: true, default: () => <div data-testid="app">livereport-matchlist</div> }))
jest.mock('@/lib/store', () => ({ __esModule: true, default: { createStore: jest.fn(() => ({ dispatch: jest.fn(), getState: jest.fn(() => ({})), subscribe: jest.fn() })) } }))

describe('pages/livereport/matchlist', () => {
	test('renders provider with AppContainer', () => {
		render(<Page />)
		expect(document.querySelector('[data-testid="app"]').textContent).toBe('livereport-matchlist')
	})
})


