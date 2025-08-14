import React from 'react'
import { render } from '@testing-library/react'
import Page from '@/pages/leaguewinloss'

jest.mock('@/styles/pages/leaguewinloss.scss', () => ({}))
jest.mock('@/pages/leaguewinloss/components/AppContainer', () => ({ __esModule: true, default: () => <div data-testid="app">leaguewinloss</div> }))
jest.mock('@/lib/store', () => ({ __esModule: true, default: { createStore: jest.fn(() => ({ dispatch: jest.fn(), getState: jest.fn(() => ({})), subscribe: jest.fn() })) } }))
jest.mock('@/pages/leaguewinloss/common/constants', () => ({ __esModule: true, DefaultPageSize: 50 }))
jest.mock('@/pages/leaguewinloss/common/dateSetting', () => ({ __esModule: true, DefaultDateRange: {} }))

describe('pages/leaguewinloss', () => {
	test('renders provider with AppContainer', () => {
		render(<Page />)
		expect(document.querySelector('[data-testid="app"]').textContent).toBe('leaguewinloss')
	})
})


