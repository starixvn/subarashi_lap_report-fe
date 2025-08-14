import React from 'react'
import { render } from '@testing-library/react'
import Page from '@/pages/subsidiaryperformance'

jest.mock('@/styles/pages/subsidiaryperformance.scss', () => ({}))
jest.mock('@/pages/subsidiaryperformance/components/AppContainer', () => ({ __esModule: true, default: () => <div data-testid="app">subsidiaryperformance</div> }))
jest.mock('@/lib/store', () => ({ __esModule: true, default: { createStore: jest.fn(() => ({ dispatch: jest.fn(), getState: jest.fn(() => ({})), subscribe: jest.fn() })) } }))
jest.mock('@/pages/subsidiaryperformance/common', () => ({ __esModule: true, constants: { DateRange: {} } }))
jest.mock('@/constants/report', () => ({ __esModule: true, ReportLevel: { MAIN: 1 } }))

describe('pages/subsidiaryperformance', () => {
	test('renders provider with AppContainer', () => {
		render(<Page />)
		expect(document.querySelector('[data-testid="app"]').textContent).toBe('subsidiaryperformance')
	})
})


