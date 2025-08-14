import React from 'react'
import { render } from '@testing-library/react'
import Page from '@/pages/customersupporttask'

jest.mock('@/pages/customersupporttask/components/AppContainer.jsx', () => ({ __esModule: true, default: () => <div data-testid="app">customersupporttask</div> }))
jest.mock('@/lib/store', () => ({ __esModule: true, default: { createStore: jest.fn(() => ({ dispatch: jest.fn(), getState: jest.fn(() => ({})), subscribe: jest.fn() })) } }))
jest.mock('@/pages/customersupporttask/lib/constants.js', () => ({ __esModule: true, SupportTaskOptions: [{ value: 'A' }] }))

describe('pages/customersupporttask', () => {
	test('renders provider with AppContainer', () => {
		render(<Page />)
		expect(document.querySelector('[data-testid="app"]').textContent).toBe('customersupporttask')
	})
})


