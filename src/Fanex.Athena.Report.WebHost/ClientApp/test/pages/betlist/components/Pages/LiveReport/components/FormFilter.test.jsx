import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import LiveReportFormFilter from '@/pages/betlist/components/Pages/LiveReport/components/FormFilter'

jest.mock('react-router-dom', () => ({
	useNavigate: jest.fn()
}))

jest.mock('@/helpers/langHelper', () => ({
	getResources: jest.fn(() => ['Jan', 'Feb', 'Mar']),
	getSingleResource: jest.fn((key) => {
		if (key === 'Viewin') return 'View in {0}'
		return key
	})
}))

jest.mock('@/components/ExportExcel', () => ({ onClick }) => (
	<button data-testid="export-excel" onClick={onClick}>
		Export Excel
	</button>
))

const mockNavigate = jest.fn()
require('react-router-dom').useNavigate.mockReturnValue(mockNavigate)

describe('LiveReportFormFilter', () => {
	let store

	const createMockStore = (initialState = {}) => {
		const defaultReducers = {
			formData: (state = null) => state,
			requestParam: (state = {}) => state,
			...initialState
		}
		return createStore(combineReducers(defaultReducers))
	}

	beforeEach(() => {
		jest.clearAllMocks()
	})

	test('renders with basic form data', () => {
		const formData = {
			title: 'Live Report',
			fromDate: '01/01/2023',
			toDate: '01/31/2023',
			baseCurrency: 'USD',
			url: '/api/test'
		}

		store = createMockStore({
			formData: (state = formData) => state,
			requestParam: (state = {}) => state
		})

		render(
			<Provider store={store}>
				<LiveReportFormFilter isValidExcel={true} processExcel={jest.fn()} />
			</Provider>
		)

		expect(screen.getByText(/Live Report/)).toBeInTheDocument()
		expect(screen.getByText(/01\/01\/2023/)).toBeInTheDocument()
		expect(screen.getByText(/01\/31\/2023/)).toBeInTheDocument()
		expect(screen.getByText(/View in USD/)).toBeInTheDocument()
	})

	test('handles export excel when valid', () => {
		const mockProcessExcel = jest.fn()
		const formData = {
			title: 'Test Report',
			fromDate: '01/01/2023',
			toDate: '01/31/2023',
			baseCurrency: 'EUR',
			url: '/api/test'
		}
		const requestParam = { param1: 'value1' }

		store = createMockStore({
			formData: (state = formData) => state,
			requestParam: (state = requestParam) => state
		})

		render(
			<Provider store={store}>
				<LiveReportFormFilter isValidExcel={true} processExcel={mockProcessExcel} />
			</Provider>
		)

		fireEvent.click(screen.getByTestId('export-excel'))

		expect(mockProcessExcel).toHaveBeenCalledWith(
			'/api/testExportExcel',
			requestParam,
			'LiveReportBetList'
		)
	})

	test('does not export excel when invalid', () => {
		const mockProcessExcel = jest.fn()
		const formData = {
			title: 'Test Report',
			baseCurrency: 'USD',
			url: '/api/test'
		}

		store = createMockStore({
			formData: (state = formData) => state,
			requestParam: (state = {}) => state
		})

		render(
			<Provider store={store}>
				<LiveReportFormFilter isValidExcel={false} processExcel={mockProcessExcel} />
			</Provider>
		)

		fireEvent.click(screen.getByTestId('export-excel'))

		expect(mockProcessExcel).not.toHaveBeenCalled()
	})

	test('handles back navigation', () => {
		const formData = {
			title: 'Test Report',
			baseCurrency: 'USD'
		}

		store = createMockStore({
			formData: (state = formData) => state,
			requestParam: (state = {}) => state
		})

		render(
			<Provider store={store}>
				<LiveReportFormFilter isValidExcel={true} processExcel={jest.fn()} />
			</Provider>
		)

		const backButton = document.querySelector('.icon-back')
		fireEvent.click(backButton)

		expect(mockNavigate).toHaveBeenCalledWith(-1)
	})

	test('handles missing fromDate in getReportTitle', () => {
		const formData = {
			title: 'Test Report',
			toDate: '01/31/2023',
			baseCurrency: 'USD'
		}

		store = createMockStore({
			formData: (state = formData) => state,
			requestParam: (state = {}) => state
		})

		render(
			<Provider store={store}>
				<LiveReportFormFilter isValidExcel={true} processExcel={jest.fn()} />
			</Provider>
		)

		expect(screen.getByText('Test Report -', { exact: false })).toBeInTheDocument()
	})

	test('handles missing toDate in getReportTitle', () => {
		const formData = {
			title: 'Test Report',
			fromDate: '01/01/2023',
			baseCurrency: 'USD'
		}

		store = createMockStore({
			formData: (state = formData) => state,
			requestParam: (state = {}) => state
		})

		render(
			<Provider store={store}>
				<LiveReportFormFilter isValidExcel={true} processExcel={jest.fn()} />
			</Provider>
		)

		expect(screen.getByText('Test Report - 01/01/2023 -', { exact: false })).toBeInTheDocument()
	})

	test('renders complete title with both dates', () => {
		const formData = {
			title: 'Complete Report',
			fromDate: '01/01/2023',
			toDate: '01/31/2023',
			baseCurrency: 'USD'
		}

		store = createMockStore({
			formData: (state = formData) => state,
			requestParam: (state = {}) => state
		})

		render(
			<Provider store={store}>
				<LiveReportFormFilter isValidExcel={true} processExcel={jest.fn()} />
			</Provider>
		)

		expect(screen.getByText('Complete Report - 01/01/2023', { exact: false })).toBeInTheDocument()
		expect(screen.getByText('01/31/2023 -', { exact: false })).toBeInTheDocument()
		expect(screen.getByText('→')).toBeInTheDocument()
	})

	test('uses shallowEqual for useSelector', () => {
		const formData = {
			title: 'Test Report',
			baseCurrency: 'USD'
		}

		store = createMockStore({
			formData: (state = formData) => state,
			requestParam: (state = {}) => state
		})

		const { rerender } = render(
			<Provider store={store}>
				<LiveReportFormFilter isValidExcel={true} processExcel={jest.fn()} />
			</Provider>
		)

		// Re-render with same data
		rerender(
			<Provider store={store}>
				<LiveReportFormFilter isValidExcel={true} processExcel={jest.fn()} />
			</Provider>
		)

		expect(screen.getByText(/Test Report/)).toBeInTheDocument()
	})

	test('handles undefined props gracefully', () => {
		const formData = {
			title: 'Test Report',
			baseCurrency: 'USD'
		}

		store = createMockStore({
			formData: (state = formData) => state,
			requestParam: (state = {}) => state
		})

		render(
			<Provider store={store}>
				<LiveReportFormFilter />
			</Provider>
		)

		expect(screen.getByText(/Test Report/)).toBeInTheDocument()
	})

	test('component is memoized', () => {
		const Component = LiveReportFormFilter
		expect(Component.$$typeof).toBeDefined()
	})
})
