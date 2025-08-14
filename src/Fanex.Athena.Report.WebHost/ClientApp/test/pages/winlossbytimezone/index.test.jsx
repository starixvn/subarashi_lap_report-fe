import React from 'react'
import { render } from '@testing-library/react'
import Page from '@/pages/winlossbytimezone'

jest.mock('@/pages/winlossbytimezone/components/AppContainer', () => ({ __esModule: true, default: () => <div data-testid="app">winlossbytimezone</div> }))
jest.mock('@/lib/store', () => ({ __esModule: true, default: { createStore: jest.fn(() => ({ dispatch: jest.fn(), getState: jest.fn(() => ({})), subscribe: jest.fn() })) } }))
jest.mock('@/pages/winlossbytimezone/constants/dateSetting', () => ({ __esModule: true, DateRange: {} }))
jest.mock('@/pages/winlossbytimezone/constants/settingConst', () => ({ __esModule: true, ReportBy: [{}], TimeZones: [{ value: 8 }] }))

describe('pages/winlossbytimezone', () => {
	test('renders provider with AppContainer', () => {
		render(<Page />)
		expect(document.querySelector('[data-testid="app"]').textContent).toBe('winlossbytimezone')
	})
})


