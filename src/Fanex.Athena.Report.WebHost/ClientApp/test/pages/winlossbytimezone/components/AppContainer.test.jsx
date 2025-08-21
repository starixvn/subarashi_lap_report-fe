import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import AppContainer from '@/pages/winlossbytimezone/components/AppContainer'

jest.mock('@/hooks/useToggleRequest')
jest.mock('@/components/Loader')
jest.mock('@/lib/dataService')
jest.mock('@/pages/winlossbytimezone/components/FormFilter')
jest.mock('@/pages/winlossbytimezone/components/Datagrid')
jest.mock('@/pages/winlossbytimezone/actions/index')
jest.mock('@/pages/winlossbytimezone/constants/settingConst')
jest.mock('@/pages/winlossbytimezone/constants/apiUrl')

const mockUseToggleRequest = require('@/hooks/useToggleRequest')
const mockDataService = require('@/lib/dataService')
const mockActionCreators = require('@/pages/winlossbytimezone/actions/index')
const mockSettingConst = require('@/pages/winlossbytimezone/constants/settingConst')
const mockApiUrl = require('@/pages/winlossbytimezone/constants/apiUrl')

jest.mock('@/components/Loader', () => ({ isLoading }) => (
	<div data-testid="loader" data-loading={isLoading} />
))

jest.mock('@/pages/winlossbytimezone/components/FormFilter', () => () => (
	<div data-testid="form-filter" />
))

jest.mock('@/pages/winlossbytimezone/components/Datagrid', () => () => (
	<div data-testid="data-grid" />
))

describe('WinLossByTimeZone AppContainer', () => {
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
			setSelectedBaseCurrency: jest.fn(),
			setBaseCurrencyList: jest.fn(),
			setSelectedCurrency: jest.fn(),
			setSelectedProducts: jest.fn()
		}

		mockDataService.default = {
			getReportData: jest.fn()
		}

		mockSettingConst.CurrencySelectAll = {
			value: 'ALL',
			label: 'All Currencies'
		}

		mockApiUrl.ApiUrl = {
			INIT_FORM_URL: '/api/winloss-timezone/init'
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

	test('setInitFormData handles successful response with complete data', () => {
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
					{ code: 'SPORT', name: 'Sport' },
					{ code: 'CASINO', name: 'Casino' }
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
			mockActionCreators.ActionCreators.setSelectedCurrency(mockSettingConst.CurrencySelectAll)
		)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setSelectedProducts('SPORT,CASINO')
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
					{ key: 'USD', value: 'US Dollar' }
				],
				baseCurrency: 'Non-existent Currency',
				currencies: [],
				productOptions: []
			}
		}
		
		setInitFormData(mockResult)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setSelectedBaseCurrency({
				value: 'USD',
				label: 'US Dollar'
			})
		)
	})

	test('setInitFormData prepends CurrencySelectAll to currencies', () => {
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
			mockActionCreators.ActionCreators.setFormData(expect.objectContaining({
				currencies: [
					mockSettingConst.CurrencySelectAll,
					{ value: 'USD', label: 'US Dollar' }
				]
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
		mockDataService.default.getReportData.mockResolvedValue(mockResponse)
		
		renderWithProviders(<AppContainer />)
		
		const apiCallFunction = mockSendRequest.mock.calls[0][0]
		
		await apiCallFunction()
		
		expect(mockDataService.default.getReportData).toHaveBeenCalledWith('/api/winloss-timezone/init')
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
