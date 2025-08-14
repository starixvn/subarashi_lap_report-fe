import React from 'react'
import { render } from '@testing-library/react'
import Page from '@/pages/matchmonitoringcenter'

jest.mock('@/styles/pages/matchmonitoringcenter/index.scss', () => ({}))
jest.mock('@/pages/matchmonitoringcenter/components/AppContainer.jsx', () => ({ __esModule: true, default: () => <div data-testid="app">mmc</div> }))
jest.mock('@/lib/store', () => ({ __esModule: true, default: { createStore: jest.fn(() => ({ dispatch: jest.fn(), getState: jest.fn(() => ({})), subscribe: jest.fn() })) } }))
jest.mock('@/pages/matchmonitoringcenter/common', () => ({ __esModule: true, constants: { RefreshCountdown: { DefaultRefreshCountdown: 10 } } }))

describe('pages/matchmonitoringcenter', () => {
	test('renders provider with AppContainer', () => {
		render(<Page />)
		expect(document.querySelector('[data-testid="app"]').textContent).toBe('mmc')
	})
})


