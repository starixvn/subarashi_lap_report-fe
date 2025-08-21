import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import AppContainer from '@/pages/winlossanalysis/components/AppContainer'

jest.mock('@/hooks/useToggleRequest')
jest.mock('@/hooks/useMobileVersion')
jest.mock('@/components/Loader')
jest.mock('@/lib/dataService')
jest.mock('@/layouts/AppLayout')
jest.mock('@/constants/config')
jest.mock('@/pages/winlossanalysis/components/desktop/FormFilter')
jest.mock('@/pages/winlossanalysis/components/desktop/DataGrid')
jest.mock('@/pages/winlossanalysis/components/mobile/MobileFormFilter')
jest.mock('@/pages/winlossanalysis/components/mobile/MobileDataGrid')
jest.mock('@/pages/winlossanalysis/actions/index')
jest.mock('@/pages/winlossanalysis/common/constants')

const mockUseToggleRequest = require('@/hooks/useToggleRequest')
const mockUseMobileVersion = require('@/hooks/useMobileVersion')
const mockDataService = require('@/lib/dataService')
const mockConfig = require('@/constants/config')
const mockActionCreators = require('@/pages/winlossanalysis/actions/index')
const mockConstants = require('@/pages/winlossanalysis/common/constants')

jest.mock('@/components/Loader', () => ({ isLoading }) => (
	<div data-testid="loader" data-loading={isLoading} />
))

jest.mock('@/layouts/AppLayout', () => ({ children }) => (
	<div data-testid="app-layout">{children}</div>
))

jest.mock('@/pages/winlossanalysis/components/desktop/FormFilter', () => () => (
	<div data-testid="desktop-form-filter" />
))

jest.mock('@/pages/winlossanalysis/components/desktop/DataGrid', () => () => (
	<div data-testid="desktop-data-grid" />
))

jest.mock('@/pages/winlossanalysis/components/mobile/MobileFormFilter', () => () => (
	<div data-testid="mobile-form-filter" />
))

jest.mock('@/pages/winlossanalysis/components/mobile/MobileDataGrid', () => () => (
	<div data-testid="mobile-data-grid" />
))

describe('WinLossAnalysis AppContainer', () => {
	let store
	let mockDispatch
	let mockSendRequest

	const createMockStore = (initialState = {}) => {
		const defaultReducers = {
			defaultState: (state = {}) => state,
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

		mockUseMobileVersion.default = jest.fn(() => false)

		mockActionCreators.ActionCreators = {
			setDefaultState: jest.fn(),
			setFormData: jest.fn(),
			setProductList: jest.fn(),
			setSelectedProducts: jest.fn(),
			setSelectedCurrency: jest.fn(),
			setSelectedBaseCurrency: jest.fn(),
			setSelectedStatus: jest.fn(),
			setSelectedLiveStatus: jest.fn(),
			setSelectedPlatform: jest.fn(),
			setSelectedOddsGroup: jest.fn(),
			setSelectedCustomerClass: jest.fn()
		}

		mockDataService.default = {
			postReportData: jest.fn()
		}

		mockConfig.DEFAULT_BASE_CURRENCY_VALUE = 'USD'

		mockConstants.ApiUrl = {
			INIT_FORM_URL: '/api/winloss-analysis/init'
		}

		mockConstants.ViewInTimeMode = {
			Financial: 'Financial'
		}

		mockConstants.VipOnlyList = [
			{ id: 1, name: 'All' }
		]

		mockConstants.SettlementTimeSupportProductList = ['SPORT', 'CASINO']

		mockConstants.DefaultState = {}

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

	test('renders desktop layout when not mobile and formData is null', () => {
		mockUseMobileVersion.default.mockReturnValue(false)
		
		renderWithProviders(<AppContainer />)
		
		expect(screen.getByTestId('app-layout')).toBeInTheDocument()
		expect(screen.getByTestId('loader')).toBeInTheDocument()
		expect(screen.queryByTestId('desktop-form-filter')).not.toBeInTheDocument()
		expect(screen.queryByTestId('desktop-data-grid')).not.toBeInTheDocument()
		expect(screen.queryByTestId('mobile-form-filter')).not.toBeInTheDocument()
		expect(screen.queryByTestId('mobile-data-grid')).not.toBeInTheDocument()
	})

	test('renders desktop layout with form and grid when formData exists', () => {
		mockUseMobileVersion.default.mockReturnValue(false)
		
		store = createMockStore({
			formData: (state = { test: 'data' }) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		expect(screen.getByTestId('app-layout')).toBeInTheDocument()
		expect(screen.getByTestId('loader')).toBeInTheDocument()
		expect(screen.getByTestId('desktop-form-filter')).toBeInTheDocument()
		expect(screen.getByTestId('desktop-data-grid')).toBeInTheDocument()
	})

	test('renders mobile layout when mobile and formData exists', () => {
		mockUseMobileVersion.default.mockReturnValue(true)
		
		store = createMockStore({
			formData: (state = { test: 'data' }) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		expect(screen.getByTestId('app-layout')).toBeInTheDocument()
		expect(screen.getByTestId('loader')).toBeInTheDocument()
		expect(screen.getByTestId('mobile-form-filter')).toBeInTheDocument()
		expect(screen.getByTestId('mobile-data-grid')).toBeInTheDocument()
		expect(screen.queryByTestId('desktop-form-filter')).not.toBeInTheDocument()
		expect(screen.queryByTestId('desktop-data-grid')).not.toBeInTheDocument()
	})

	test('renders desktop layout when mobile but formData is null', () => {
		mockUseMobileVersion.default.mockReturnValue(true)
		
		store = createMockStore({
			formData: (state = null) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		expect(screen.getByTestId('app-layout')).toBeInTheDocument()
		expect(screen.getByTestId('loader')).toBeInTheDocument()
		expect(screen.queryByTestId('mobile-form-filter')).not.toBeInTheDocument()
		expect(screen.queryByTestId('mobile-data-grid')).not.toBeInTheDocument()
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
				productOptions: [
					{ code: 'SPORT', name: 'Sport' },
					{ code: 'CASINO', name: 'Casino' }
				],
				currencyList: [
					{ key: 'USD', value: 'US Dollar' },
					{ key: 'EUR', value: 'Euro' }
				],
				baseCurrencyList: [
					{ key: 'USD', value: 'US Dollar' },
					{ key: 'EUR', value: 'Euro' }
				],
				defaultBaseCurrency: 'US Dollar',
				statusList: [
					{ id: 1, name: 'Active' },
					{ id: 2, name: 'Inactive' }
				],
				liveStatusList: [
					{ key: 'LIVE', value: 'Live' },
					{ key: 'PREMATCH', value: 'Pre-match' }
				],
				platformList: [
					{ key: 'WEB', value: 'Web' },
					{ key: 'MOBILE', value: 'Mobile' }
				],
				oddsGroupList: ['1', '2', '3'],
				riskLevel: [
					{
						id: 1,
						name: 'Low Risk',
						key: 'LOW',
						customerClassList: ['CLASS1', 'CLASS2']
					}
				],
				subsidiaryList: ['SUB1', 'SUB2'],
				hourList: [
					{ key: '00', value: '00:00' },
					{ key: '01', value: '01:00' }
				]
			}
		}
		
		setInitFormData(mockResult)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setSelectedProducts('SPORT,CASINO')
		)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setSelectedCurrency('USD,EUR')
		)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setSelectedBaseCurrency({
				value: 'USD',
				label: 'US Dollar'
			})
		)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setSelectedStatus('1,2')
		)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setSelectedLiveStatus('LIVE,PREMATCH')
		)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setSelectedPlatform('WEB,MOBILE')
		)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setSelectedOddsGroup('1,2,3')
		)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setSelectedCustomerClass('CLASS1,CLASS2')
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

	test('makes API call with correct URL', async () => {
		const mockResponse = { data: { data: {} } }
		mockDataService.default.postReportData.mockResolvedValue(mockResponse)
		
		renderWithProviders(<AppContainer />)
		
		const apiCallFunction = mockSendRequest.mock.calls[0][0]
		
		await apiCallFunction()
		
		expect(mockDataService.default.postReportData).toHaveBeenCalledWith('/api/winloss-analysis/init')
	})

	test('handles mobile container class correctly', () => {
		mockUseMobileVersion.default.mockReturnValue(true)
		
		store = createMockStore({
			formData: (state = { test: 'data' }) => state
		})
		store.dispatch = mockDispatch
		
		const { container } = renderWithProviders(<AppContainer />)
		
		expect(container.querySelector('.mobile-container')).toBeInTheDocument()
	})

	test('component uses batch for dispatching actions', () => {
		renderWithProviders(<AppContainer />)
		
		const setInitFormDataCall = mockSendRequest.mock.calls[0]
		const setInitFormData = setInitFormDataCall[1]
		
		const mockResult = {
			data: {
				productOptions: [],
				currencyList: [],
				baseCurrencyList: [],
				statusList: [],
				liveStatusList: [],
				platformList: [],
				oddsGroupList: [],
				riskLevel: [],
				subsidiaryList: [],
				hourList: []
			}
		}
		
		setInitFormData(mockResult)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setDefaultState(expect.any(Object))
		)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setProductList(expect.any(Array))
		)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setFormData(expect.any(Object))
		)
	})
})
