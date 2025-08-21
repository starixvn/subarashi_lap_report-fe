import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import AppContainer from '@/pages/customerturnover/components/AppContainer'

jest.mock('@/hooks/useToggleRequest')
jest.mock('@/components/Loader')
jest.mock('@/lib/dataService')
jest.mock('@/pages/customerturnover/components/FormFilter')
jest.mock('@/pages/customerturnover/components/DataGrid')
jest.mock('@/pages/customerturnover/actions/index')
jest.mock('@/pages/customerturnover/common')

const mockUseToggleRequest = require('@/hooks/useToggleRequest')
const mockDataService = require('@/lib/dataService')
const mockActionCreators = require('@/pages/customerturnover/actions/index')
const mockService = require('@/pages/customerturnover/common')

jest.mock('@/components/Loader', () => ({ isLoading }) => (
	<div data-testid="loader" data-loading={isLoading} />
))

jest.mock('@/pages/customerturnover/components/FormFilter', () => () => (
	<div data-testid="form-filter" />
))

jest.mock('@/pages/customerturnover/components/DataGrid', () => () => (
	<div data-testid="data-grid" />
))

describe('CustomerTurnover AppContainer', () => {
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

		mockActionCreators.default = {
			setFormData: jest.fn(),
			setSelectedCurrency: jest.fn()
		}

		mockDataService.default = {
			postReportData: jest.fn()
		}

		mockService.default = {
			convertToCheckedItems: jest.fn((items) => items || [])
		}

		mockService.constants = {
			ApiUrl: {
				INIT_FORM_URL: '/api/customer-turnover/init'
			}
		}

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
		expect(screen.getByTestId('data-grid')).toBeInTheDocument()
	})

	test('renders form filter when formData exists', () => {
		store = createMockStore({
			formData: (state = { test: 'data' }) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		expect(screen.getByTestId('loader')).toBeInTheDocument()
		expect(screen.getByTestId('form-filter')).toBeInTheDocument()
		expect(screen.getByTestId('data-grid')).toBeInTheDocument()
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

	test('setInitFormData handles successful response with data', () => {
		renderWithProviders(<AppContainer />)
		
		const setInitFormDataCall = mockSendRequest.mock.calls[0]
		const setInitFormData = setInitFormDataCall[1]
		
		const mockResult = {
			data: {
				currencyList: [
					{ key: 'USD', value: 'US Dollar' },
					{ key: 'EUR', value: 'Euro' }
				],
				productOptions: [
					{ id: 1, name: 'Sport' },
					{ id: 2, name: 'Casino' }
				]
			}
		}
		
		mockService.default.convertToCheckedItems.mockReturnValue([
			{ id: 1, name: 'Sport', checked: true },
			{ id: 2, name: 'Casino', checked: true }
		])
		
		setInitFormData(mockResult)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.default.setSelectedCurrency({
				value: 'USD',
				label: 'US Dollar'
			})
		)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.default.setFormData(expect.objectContaining({
				currencyList: [
					{ value: 'USD', label: 'US Dollar' },
					{ value: 'EUR', label: 'Euro' }
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
			mockActionCreators.default.setFormData(null)
		)
	})

	test('setInitFormData handles result without data', () => {
		renderWithProviders(<AppContainer />)
		
		const setInitFormDataCall = mockSendRequest.mock.calls[0]
		const setInitFormData = setInitFormDataCall[1]
		
		setInitFormData({ someOtherProp: 'value' })
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.default.setFormData(null)
		)
	})

	test('setInitFormData handles productOptions without children', () => {
		renderWithProviders(<AppContainer />)
		
		const setInitFormDataCall = mockSendRequest.mock.calls[0]
		const setInitFormData = setInitFormDataCall[1]
		
		const mockResult = {
			data: {
				currencyList: [],
				productOptions: []
			}
		}
		
		mockService.default.convertToCheckedItems.mockReturnValue([
			{ id: 1, name: 'Sport' },
			{ id: 2, name: 'Casino' }
		])
		
		setInitFormData(mockResult)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.default.setFormData(expect.objectContaining({
				productHasNoSport: [1, 2]
			}))
		)
	})

	test('setInitFormData sets empty array for productHasNoSport when undefined', () => {
		renderWithProviders(<AppContainer />)
		
		const setInitFormDataCall = mockSendRequest.mock.calls[0]
		const setInitFormData = setInitFormDataCall[1]
		
		const mockResult = {
			data: {
				currencyList: [],
				productOptions: []
			}
		}
		
		mockService.default.convertToCheckedItems.mockReturnValue([])
		
		setInitFormData(mockResult)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.default.setFormData(expect.objectContaining({
				productHasNoSport: []
			}))
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
		
		expect(mockDataService.default.postReportData).toHaveBeenCalledWith('/api/customer-turnover/init')
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
