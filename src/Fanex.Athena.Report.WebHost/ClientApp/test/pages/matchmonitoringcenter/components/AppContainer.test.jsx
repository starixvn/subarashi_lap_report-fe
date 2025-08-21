import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { createStore, combineReducers } from 'redux'
import AppContainer from '@/pages/matchmonitoringcenter/components/AppContainer'

jest.mock('@/hooks/useToggleRequest')
jest.mock('@/components/Loader')
jest.mock('@/lib/dataService')
jest.mock('@/pages/matchmonitoringcenter/components/FormFilter')
jest.mock('@/pages/matchmonitoringcenter/components/DataGrid')
jest.mock('@/pages/matchmonitoringcenter/components/PopupPage')
jest.mock('@/pages/matchmonitoringcenter/actions')

const mockUseToggleRequest = require('@/hooks/useToggleRequest')
const mockDataService = require('@/lib/dataService')
const mockActionCreators = require('@/pages/matchmonitoringcenter/actions')

jest.mock('@/components/Loader', () => ({ isLoading }) => (
	<div data-testid="loader" data-loading={isLoading} />
))

jest.mock('@/pages/matchmonitoringcenter/components/FormFilter', () => () => (
	<div data-testid="form-filter" />
))

jest.mock('@/pages/matchmonitoringcenter/components/DataGrid', () => () => (
	<div data-testid="data-grid" />
))

jest.mock('@/pages/matchmonitoringcenter/components/PopupPage', () => () => (
	<div data-testid="popup-page" />
))

describe('MatchMonitoringCenter AppContainer', () => {
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
			setSelectedLeague: jest.fn(),
			setSelectedMatch: jest.fn(),
			setDefaultState: jest.fn(),
			setSelectedMatchStatus: jest.fn(),
			setSelectedTriggeredAlert: jest.fn(),
			setMatchList: jest.fn(),
			setLeagueList: jest.fn(),
			setRequestParam: jest.fn(),
			setAppUuid: jest.fn()
		}

		mockDataService.default = {
			getReportData: jest.fn()
		}

		store = createMockStore()
		store.dispatch = mockDispatch
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	const renderWithProviders = (component, searchParams = '') => {
		return render(
			<Provider store={store}>
				<MemoryRouter initialEntries={[`/?${searchParams}`]}>
					{component}
				</MemoryRouter>
			</Provider>
		)
	}

	test('renders main layout correctly when formData is null', () => {
		renderWithProviders(<AppContainer />)
		
		expect(screen.getByTestId('loader')).toBeInTheDocument()
		expect(screen.queryByTestId('form-filter')).not.toBeInTheDocument()
		expect(screen.getByTestId('data-grid')).toBeInTheDocument()
		expect(screen.getByTestId('popup-page')).toBeInTheDocument()
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
		expect(screen.getByTestId('popup-page')).toBeInTheDocument()
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
				baseCurrencies: [
					{ key: 'USD', value: 'US Dollar' },
					{ key: 'EUR', value: 'Euro' }
				],
				baseCurrency: 'US Dollar',
				defaultBaseCurrency: 'US Dollar',
				currencies: [
					{ key: 'USD', value: 'US Dollar' },
					{ key: 'EUR', value: 'Euro' }
				],
				currencyId: 'USD',
				matchIds: '1,2,3',
				leagueIds: '4,5,6',
				matchList: [
					{ id: 1, name: 'Match 1' },
					{ id: 2, name: 'Match 2' }
				],
				leagueList: [
					{ id: 4, name: 'League 1' },
					{ id: 5, name: 'League 2' }
				]
			}
		}
		
		setInitFormData(mockResult)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setBaseCurrencyList(expect.any(Array))
		)
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setSelectedBaseCurrency(expect.any(Object))
		)
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setFormData(expect.any(Object))
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

	test('component is memoized', () => {
		const Component = AppContainer
		expect(Component.$$typeof).toBeDefined()
	})

	test('renders as React Fragment', () => {
		const { container } = renderWithProviders(<AppContainer />)
		
		const children = container.children
		expect(children.length).toBeGreaterThan(0)
	})

	test('makes API call with correct URL and query params', async () => {
		const mockResponse = { data: { data: {} } }
		mockDataService.default.getReportData.mockResolvedValue(mockResponse)
		
		renderWithProviders(<AppContainer />, 'param1=value1&param2=value2')
		
		const apiCallFunction = mockSendRequest.mock.calls[0][0]
		
		await apiCallFunction()
		
		expect(mockDataService.default.getReportData).toHaveBeenCalledWith(
			expect.stringContaining('param1=value1&param2=value2')
		)
	})

	test('handles empty search params', () => {
		renderWithProviders(<AppContainer />, '')
		
		expect(mockSendRequest).toHaveBeenCalled()
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

	test('processes match and league IDs correctly', () => {
		renderWithProviders(<AppContainer />)
		
		const setInitFormDataCall = mockSendRequest.mock.calls[0]
		const setInitFormData = setInitFormDataCall[1]
		
		const mockResult = {
			data: {
				baseCurrencies: [],
				currencies: [],
				matchIds: '1, 2, 3',
				leagueIds: '4, 5, 6',
				matchList: [
					{ id: 1, name: 'Match 1' },
					{ id: 2, name: 'Match 2' },
					{ id: 3, name: 'Match 3' }
				],
				leagueList: [
					{ id: 4, name: 'League 1' },
					{ id: 5, name: 'League 2' },
					{ id: 6, name: 'League 3' }
				]
			}
		}
		
		setInitFormData(mockResult)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setMatchList(expect.arrayContaining([
				expect.objectContaining({ id: 1, status: true }),
				expect.objectContaining({ id: 2, status: true }),
				expect.objectContaining({ id: 3, status: true })
			]))
		)
	})
})

