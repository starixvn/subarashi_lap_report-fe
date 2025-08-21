import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import AppContainer from '@/pages/customersupporttask/components/AppContainer'

jest.mock('@/hooks/useToggleRequest')
jest.mock('@/components/Loader')
jest.mock('@/lib/dataService')
jest.mock('@/pages/customersupporttask/components/FormFilter')
jest.mock('@/pages/customersupporttask/actions/index')
jest.mock('@/pages/customersupporttask/constants')
jest.mock('@/pages/customersupporttask/lib/constants')

const mockUseToggleRequest = require('@/hooks/useToggleRequest')
const mockDataService = require('@/lib/dataService')
const mockActionCreators = require('@/pages/customersupporttask/actions/index')
const mockConstants = require('@/pages/customersupporttask/constants')
const mockSupportTaskOptions = require('@/pages/customersupporttask/lib/constants')

jest.mock('@/components/Loader', () => ({ isLoading }) => (
	<div data-testid="loader" data-loading={isLoading} />
))

jest.mock('@/pages/customersupporttask/components/FormFilter', () => () => (
	<div data-testid="form-filter" />
))

describe('CustomerSupportTask AppContainer', () => {
	let store
	let mockDispatch
	let mockSendRequest

	const createMockStore = (initialState = {}) => {
		const defaultReducers = {
			formData: (state = null) => state,
			isLoading: (state = false) => state,
			...initialState
		}
		return createStore(combineReducers(defaultReducers))
	}

	beforeEach(() => {
		mockDispatch = jest.fn()
		mockSendRequest = jest.fn()
		
		mockUseToggleRequest.default = jest.fn(() => ({
			sendRequest: mockSendRequest
		}))

		mockActionCreators.ActionCreators = {
			setFormData: jest.fn(),
			setSelectedCurrency: jest.fn(),
			setSelectedSupportTask: jest.fn()
		}

		mockDataService.default = {
			postReportData: jest.fn()
		}

		mockConstants.default = {
			ApiUrl: {
				INIT_FORM_URL: '/api/support-task/init'
			}
		}

		mockSupportTaskOptions.SupportTaskOptions = [
			{ id: 1, name: 'Test Task' }
		]

		store = createMockStore()
		store.dispatch = mockDispatch
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	const renderWithProviders = (component) => {
		return render(
			<Provider store={store}>
				{component}
			</Provider>
		)
	}

	test('renders main layout correctly when formData is null', () => {
		renderWithProviders(<AppContainer />)
		
		expect(screen.getByTestId('loader')).toBeInTheDocument()
		expect(screen.queryByTestId('form-filter')).not.toBeInTheDocument()
	})

	test('renders form filter when formData exists', () => {
		store = createMockStore({
			formData: (state = { test: 'data' }) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		expect(screen.getByTestId('loader')).toBeInTheDocument()
		expect(screen.getByTestId('form-filter')).toBeInTheDocument()
	})

	test('calls sendRequest on mount', () => {
		renderWithProviders(<AppContainer />)
		
		expect(mockSendRequest).toHaveBeenCalledTimes(1)
		expect(mockSendRequest).toHaveBeenCalledWith(
			expect.any(Function),
			expect.any(Function)
		)
	})

	test('passes isLoading prop to Loader', () => {
		store = createMockStore({
			isLoading: (state = true) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		const loader = screen.getByTestId('loader')
		expect(loader).toHaveAttribute('data-loading', 'true')
	})

	test('setInitFormData handles successful response with currencies', () => {
		renderWithProviders(<AppContainer />)
		
		const setInitFormDataCall = mockSendRequest.mock.calls[0]
		const setInitFormData = setInitFormDataCall[1]
		
		const mockResult = {
			data: {
				currencies: [
					{ key: 'USD', value: 'US Dollar' },
					{ key: 'EUR', value: 'Euro' }
				]
			}
		}
		
		setInitFormData(mockResult)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setSelectedCurrency('USD,EUR')
		)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setSelectedSupportTask(mockSupportTaskOptions.SupportTaskOptions[0])
		)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setFormData(expect.objectContaining({
				currencies: [
					{ key: 'USD', value: 'US Dollar', status: true },
					{ key: 'EUR', value: 'Euro', status: true }
				]
			}))
		)
	})

	test('setInitFormData handles null result', () => {
		renderWithProviders(<AppContainer />)
		
		const setInitFormDataCall = mockSendRequest.mock.calls[0]
		const setInitFormData = setInitFormDataCall[1]
		
		setInitFormData(null)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setFormData(null)
		)
	})

	test('setInitFormData handles result without data', () => {
		renderWithProviders(<AppContainer />)
		
		const setInitFormDataCall = mockSendRequest.mock.calls[0]
		const setInitFormData = setInitFormDataCall[1]
		
		setInitFormData({ someOtherProp: 'value' })
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setFormData(null)
		)
	})

	test('setInitFormData handles empty currencies array', () => {
		renderWithProviders(<AppContainer />)
		
		const setInitFormDataCall = mockSendRequest.mock.calls[0]
		const setInitFormData = setInitFormDataCall[1]
		
		const mockResult = {
			data: {
				currencies: []
			}
		}
		
		setInitFormData(mockResult)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setSelectedSupportTask(mockSupportTaskOptions.SupportTaskOptions[0])
		)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setFormData(mockResult.data)
		)
	})

	test('component is memoized', () => {
		const Component = AppContainer
		expect(Component.$$typeof).toBeDefined()
	})

	test('renders as React Fragment', () => {
		const { container } = renderWithProviders(<AppContainer />)
		
		const children = container.children
		expect(children.length).toBeGreaterThan(0)
	})

	test('makes API call with correct URL', async () => {
		const mockResponse = { data: { data: {} } }
		mockDataService.default.postReportData.mockResolvedValue(mockResponse)
		
		renderWithProviders(<AppContainer />)
		
		const apiCallFunction = mockSendRequest.mock.calls[0][0]
		
		await apiCallFunction()
		
		expect(mockDataService.default.postReportData).toHaveBeenCalledWith('/api/support-task/init')
	})

	test('handles formData selector correctly', () => {
		const formData = { test: 'data' }
		store = createMockStore({
			formData: (state = formData) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		expect(screen.getByTestId('form-filter')).toBeInTheDocument()
	})

	test('handles isLoading selector correctly', () => {
		const isLoading = true
		store = createMockStore({
			isLoading: (state = isLoading) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		const loader = screen.getByTestId('loader')
		expect(loader).toHaveAttribute('data-loading', 'true')
	})
})
