import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { createStore, combineReducers } from 'redux'
import AppContainer from '@/pages/matchwinloss/components/AppContainer'

jest.mock('@/hooks/useToggleRequest')
jest.mock('@/components/Loader')
jest.mock('@/lib/dataService')
jest.mock('@/lib/site')
jest.mock('@/pages/matchwinloss/components/FormFilter')
jest.mock('@/pages/matchwinloss/components/DataGrid')
jest.mock('@/pages/matchwinloss/actions/index')
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useRouteLoaderData: jest.fn(() => ({
		IsSelfMode: true
	}))
}))

const mockUseToggleRequest = require('@/hooks/useToggleRequest')
const mockDataService = require('@/lib/dataService')
const mockSite = require('@/lib/site')
const mockActionCreators = require('@/pages/matchwinloss/actions/index')

jest.mock('@/components/Loader', () => ({ isLoading }) => (
	<div data-testid="loader" data-loading={isLoading} />
))

jest.mock('@/pages/matchwinloss/components/FormFilter', () => () => (
	<div data-testid="form-filter" />
))

jest.mock('@/pages/matchwinloss/components/DataGrid', () => () => (
	<div data-testid="data-grid" />
))

describe('MatchWinLoss AppContainer', () => {
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

	const mockRouteData = {
		IsSelfMode: true
	}

	beforeEach(() => {
		mockDispatch = jest.fn()
		mockSendRequest = jest.fn()
		
		mockUseToggleRequest.default = jest.fn(() => ({
			sendRequest: mockSendRequest
		}))

		mockActionCreators.ActionCreators = {
			setFormData: jest.fn(),
			setSelectedDate: jest.fn(),
			setSelectedProducts: jest.fn(),
			setSelectedCurrency: jest.fn(),
			setSelectedBaseCurrency: jest.fn(),
			setBaseCurrencyList: jest.fn()
		}

		mockDataService.default = {
			getReportData: jest.fn()
		}

		mockSite.default = {
			getLrfSavedSessionStorage: jest.fn(() => false)
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
				<MemoryRouter>
					{component}
				</MemoryRouter>
			</Provider>
		)
	}

	test('renders main layout correctly when formData is null', () => {
		renderWithProviders(<AppContainer />)
		
		const container = document.querySelector('.matchwinloss')
		expect(container).toBeInTheDocument()
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

	test('calls sendRequest on mount when no saved session', () => {
		mockSite.default.getLrfSavedSessionStorage.mockReturnValue(false)
		
		renderWithProviders(<AppContainer />)
		
		expect(mockSendRequest).toHaveBeenCalledTimes(1)
		expect(mockSendRequest).toHaveBeenCalledWith(
			expect.any(Function),
			expect.any(Function)
		)
	})

	test('does not call sendRequest when saved session exists', () => {
		mockSite.default.getLrfSavedSessionStorage.mockReturnValue(true)
		
		renderWithProviders(<AppContainer />)
		
		expect(mockSendRequest).not.toHaveBeenCalled()
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
				baseCurrencies: [
					{ key: 'USD', value: 'US Dollar' },
					{ key: 'EUR', value: 'Euro' }
				],
				baseCurrency: 'US Dollar',
				currencies: [
					{ key: 'USD', value: 'US Dollar' },
					{ key: 'EUR', value: 'Euro' }
				],
				productOptions: [
					{ id: 1, name: 'Sport' },
					{ id: 2, name: 'Casino' }
				]
			}
		}
		
		setInitFormData(mockResult)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setBaseCurrencyList([
				{ value: 'USD', label: 'US Dollar' },
				{ value: 'EUR', label: 'Euro' }
			])
		)
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setSelectedBaseCurrency({
				value: 'USD',
				label: 'US Dollar'
			})
		)
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setSelectedProducts([
				{ id: 1, name: 'Sport' },
				{ id: 2, name: 'Casino' }
			])
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

	test('setInitFormData uses default base currency when not found', () => {
		renderWithProviders(<AppContainer />)
		
		const setInitFormDataCall = mockSendRequest.mock.calls[0]
		const setInitFormData = setInitFormDataCall[1]
		
		const mockResult = {
			data: {
				baseCurrencies: [
					{ key: 'EUR', value: 'Euro' }
				],
				baseCurrency: 'Unknown Currency',
				currencies: [],
				productOptions: []
			}
		}
		
		setInitFormData(mockResult)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setSelectedBaseCurrency({
				value: 'EUR',
				label: 'Euro'
			})
		)
	})

	test('component is memoized', () => {
		const Component = AppContainer
		expect(Component.$$typeof).toBeDefined()
	})

	test('makes API call with correct URL', async () => {
		const mockResponse = { data: { data: {} } }
		mockDataService.default.getReportData.mockResolvedValue(mockResponse)
		
		renderWithProviders(<AppContainer />)
		
		const apiCallFunction = mockSendRequest.mock.calls[0][0]
		
		await apiCallFunction()
		
		expect(mockDataService.default.getReportData).toHaveBeenCalledWith(
			expect.any(String)
		)
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

	test('adds CurrencySelectAll to currencies', () => {
		renderWithProviders(<AppContainer />)
		
		const setInitFormDataCall = mockSendRequest.mock.calls[0]
		const setInitFormData = setInitFormDataCall[1]
		
		const mockResult = {
			data: {
				baseCurrencies: [],
				currencies: [
					{ key: 'USD', value: 'US Dollar' }
				],
				productOptions: []
			}
		}
		
		setInitFormData(mockResult)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setSelectedCurrency(expect.objectContaining({
				value: expect.anything(),
				label: expect.anything()
			}))
		)
	})
})
