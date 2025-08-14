import React from 'react'
import { render } from '@testing-library/react'
import Page from '@/pages/extrapayout'

jest.mock('@/styles/pages/extrapayout.scss', () => ({}))
jest.mock('@/pages/extrapayout/components/AppContainer.jsx', () => ({ __esModule: true, default: () => <div data-testid="app">extrapayout</div> }))
jest.mock('@/lib/store', () => ({ __esModule: true, default: { createStore: jest.fn(() => ({ dispatch: jest.fn(), getState: jest.fn(() => ({})), subscribe: jest.fn() })) } }))
jest.mock('@/pages/extrapayout/common/constants.js', () => ({ __esModule: true, DefaultPageSize: 50 }))
jest.mock('@/pages/extrapayout/common/dateSetting.js', () => ({ __esModule: true, DefaultDateRange: {} }))

describe('pages/extrapayout', () => {
	test('renders provider with AppContainer', () => {
		render(<Page />)
		expect(document.querySelector('[data-testid="app"]').textContent).toBe('extrapayout')
	})
})


