import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import AppContainer from '@/pages/subsidiaryperformance/components/AppContainer'

jest.mock('@/hooks/useToggleRequest')
jest.mock('@/components/Loader')
jest.mock('@/lib/dataService')
jest.mock('@/constants/report')
jest.mock('@/pages/subsidiaryperformance/components/FormFilter')
jest.mock('@/pages/subsidiaryperformance/components/DataGrid')
jest.mock('@/pages/subsidiaryperformance/actions')
jest.mock('@/pages/subsidiaryperformance/common')

const mockUseToggleRequest = require('@/hooks/useToggleRequest')
const mockDataService = require('@/lib/dataService')
const mockReportConstants = require('@/constants/report')
const mockActions = require('@/pages/subsidiaryperformance/actions')
const mockCommon = require('@/pages/subsidiaryperformance/common')

jest.mock('@/components/Loader', () => ({ isLoading }) => (
	<div data-testid="loader" data-loading={isLoading} />
))

jest.mock('@/pages/subsidiaryperformance/components/FormFilter', () => () => (
	<div data-testid="form-filter" />
))

jest.mock('@/pages/subsidiaryperformance/components/DataGrid', () => () => (
	<div data-testid="data-grid" />
))

describe('SubsidiaryPerformance AppContainer', () => {
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

		mockActions.default = {
			setFormData: jest.fn(),
			setSelectedProducts: jest.fn(),
			setSelectedBaseCurrency: jest.fn(),
			setSelectedSubsidiary: jest.fn(),
			setSelectedWhiteLabel: jest.fn()
		}

		mockDataService.default = {
			getReportData: jest.fn()
		}

		mockReportConstants.SubsidiaryViewType = {
			MASTER_MANAGEMENT: 'MASTER_MANAGEMENT',
			SUBSIDIARY: 'SUBSIDIARY'
		}

		mockCommon.constants = {
			ApiUrl: {
				INIT_FORM_URL: '/api/subsidiary-performance/init'
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

	test('setInitFormData handles MASTER_MANAGEMENT view type', () => {
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
				viewType: 'MASTER_MANAGEMENT',
				subsidiaryList: [
					{ 
						value: 'WL1', 
						children: [
							{ value: 'SUB1' },
							{ value: 'SUB2' }
						]
					},
					{ 
						value: 'WL2', 
						children: [
							{ value: 'SUB3' }
						]
					}
				],
				products: [
					{ code: 'SPORT', name: 'Sport' },
					{ code: 'CASINO', name: 'Casino' }
				]
			}
		}
		
		setInitFormData(mockResult)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActions.default.setSelectedBaseCurrency({
				value: 'USD',
				label: 'US Dollar'
			})
		)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActions.default.setSelectedSubsidiary('SUB1,SUB2,SUB3')
		)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActions.default.setSelectedWhiteLabel('WL1,WL2')
		)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActions.default.setSelectedProducts('SPORT,CASINO')
		)
	})

	test('setInitFormData handles SUBSIDIARY view type', () => {
		renderWithProviders(<AppContainer />)
		
		const setInitFormDataCall = mockSendRequest.mock.calls[0]
		const setInitFormData = setInitFormDataCall[1]
		
		const mockResult = {
			data: {
				baseCurrencies: [
					{ key: 'USD', value: 'US Dollar' }
				],
				baseCurrency: 'US Dollar',
				viewType: 'SUBSIDIARY',
				subsidiaryList: [
					{ value: 'SUB1' },
					{ value: 'SUB2' }
				],
				products: [
					{ code: 'SPORT', name: 'Sport' }
				]
			}
		}
		
		setInitFormData(mockResult)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActions.default.setSelectedSubsidiary('SUB1,SUB2')
		)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActions.default.setSelectedWhiteLabel('')
		)
	})

	test('setInitFormData handles null result', () => {
		renderWithProviders(<AppContainer />)
		
		const setInitFormDataCall = mockSendRequest.mock.calls[0]
		const setInitFormData = setInitFormDataCall[1]
		
		setInitFormData(null)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActions.default.setFormData(null)
		)
	})

	test('setInitFormData handles result without data', () => {
		renderWithProviders(<AppContainer />)
		
		const setInitFormDataCall = mockSendRequest.mock.calls[0]
		const setInitFormData = setInitFormDataCall[1]
		
		setInitFormData({ someOtherProp: 'value' })
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActions.default.setFormData(null)
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
				viewType: 'SUBSIDIARY',
				subsidiaryList: [],
				products: []
			}
		}
		
		setInitFormData(mockResult)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActions.default.setSelectedBaseCurrency({
				value: 'USD',
				label: 'US Dollar'
			})
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
		
		expect(mockDataService.default.getReportData).toHaveBeenCalledWith('/api/subsidiary-performance/init')
	})
})
