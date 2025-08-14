import React from 'react'
import { render } from '@testing-library/react'
import Page from '@/pages/customerturnover'

jest.mock('@/styles/pages/customerturnover.scss', () => ({}))
jest.mock('@/pages/customerturnover/components/AppContainer', () => ({ __esModule: true, default: () => <div data-testid="app">customerturnover</div> }))
jest.mock('@/lib/store', () => ({ __esModule: true, default: { createStore: jest.fn(() => ({ dispatch: jest.fn(), getState: jest.fn(() => ({})), subscribe: jest.fn() })) } }))
jest.mock('@/pages/customerturnover/common', () => ({ __esModule: true, constants: { ReportByValue: { Daily: 1 }, DateRange: {} } }))
jest.mock('@/pages/customerturnover/common/filterSettings', () => ({ __esModule: true, TicketFilterOptions: [] }))

describe('pages/customerturnover', () => {
	test('renders provider with AppContainer', () => {
		render(<Page />)
		expect(document.querySelector('[data-testid="app"]').textContent).toBe('customerturnover')
	})
})


