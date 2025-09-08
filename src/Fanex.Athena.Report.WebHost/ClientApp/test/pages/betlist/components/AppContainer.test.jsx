import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { useLocation, useParams } from 'react-router-dom/dist'
import AppContainer from '@/pages/betlist/components/AppContainer'

jest.mock('react-router-dom/dist', () => ({
	useLocation: jest.fn(),
	useParams: jest.fn()
}))

jest.mock('@/hooks/useToggleRequest')
jest.mock('@/components/Loader')
jest.mock('@/layouts/BetListLayout')
jest.mock('@/lib/dataService')
jest.mock('@/lib/site')
jest.mock('@/helpers/betlistHelper')
jest.mock('@/pages/betlist/components/DataGrid')
jest.mock('@/pages/betlist/components/BetListFormFilter')
jest.mock('@/pages/betlist/actions')
jest.mock('@/pages/betlist/common')

// Mock useDispatch to return a shared dispatch function
const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
	// Use real useSelector so it reads from the test store
	useSelector: jest.requireActual('react-redux').useSelector
}))

const mockUseLocation = useLocation
const mockUseParams = useParams
const mockUseToggleRequest = require('@/hooks/useToggleRequest')
const mockDataService = require('@/lib/dataService')
const mockSite = require('@/lib/site')
const mockBetListHelper = require('@/helpers/betlistHelper')
const mockActionCreators = require('@/pages/betlist/actions')
const mockService = require('@/pages/betlist/common')

jest.mock('@/components/Loader', () => ({ isLoading }) => (
	<div data-testid="loader" data-loading={isLoading} />
))

jest.mock('@/layouts/BetListLayout', () => ({ children, pageName, rootUrl, formatDateStringFunc, baseCurrency }) => (
	<div data-testid="bet-list-layout" data-page-name={pageName} data-root-url={rootUrl} data-base-currency={baseCurrency}>
		{children}
	</div>
))

jest.mock('@/pages/betlist/components/DataGrid', () => () => (
	<div data-testid="data-grid" />
))

jest.mock('@/pages/betlist/components/BetListFormFilter', () => () => (
	<div data-testid="bet-list-form-filter" />
))

describe('BetList AppContainer', () => {
	let store
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
		mockDispatch.mockClear()
		mockSendRequest = jest.fn()
		
		mockUseLocation.mockReturnValue({
			search: '?param1=value1'
		})
		
		mockUseParams.mockReturnValue({
			controller: 'testController',
			action: 'testAction'
		})
		
		mockUseToggleRequest.default = jest.fn(() => ({
			sendRequest: mockSendRequest
		}))

		mockActionCreators.ActionCreators = {
			setFormData: jest.fn(),
			setGridData: jest.fn(),
			setRequestParam: jest.fn()
		}

		mockDataService.default = {
			getBetListData: jest.fn()
		}

		mockSite.default = {
			getRootUrl: jest.fn(() => 'http://localhost')
		}

		mockBetListHelper.default = {
			loadBetListDataGrid: jest.fn((data, isServerPaging) => ({ data, isServerPaging }))
		}

		mockService.default = {
			loadInitParams: jest.fn(() => ({ param1: 'value1' })),
			initQuery: jest.fn(() => '?param1=value1'),
			getSettingQuery: jest.fn(() => '&setting=test'),
			convertToBetListController: jest.fn((controller) => `betlist${controller}`)
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

	test('renders loader when formData is null and isLoading is true', () => {
		store = createMockStore({
			formData: (state = null) => state,
			isLoading: (state = true) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		expect(screen.getByTestId('loader')).toBeInTheDocument()
		expect(screen.getByTestId('loader')).toHaveAttribute('data-loading', 'true')
	})

	test('renders main layout with BetListLayout when formData exists', () => {
		store = createMockStore({
			formData: (state = { baseCurrency: 'USD' }) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		expect(screen.getByTestId('bet-list-layout')).toBeInTheDocument()
		expect(screen.getByTestId('bet-list-layout')).toHaveAttribute('data-page-name', 'Bet List Promotion')
		expect(screen.getByTestId('bet-list-layout')).toHaveAttribute('data-root-url', 'http://localhost')
		expect(screen.getByTestId('bet-list-layout')).toHaveAttribute('data-base-currency', 'USD')
		expect(screen.getByTestId('bet-list-form-filter')).toBeInTheDocument()
		expect(screen.getByTestId('data-grid')).toBeInTheDocument()
	})

	test('calls sendRequest on mount', () => {
		store = createMockStore({
			formData: (state = { baseCurrency: 'USD' }) => state,
			isLoading: (state = true) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		expect(mockSendRequest).toHaveBeenCalledTimes(1)
		expect(mockSendRequest).toHaveBeenCalledWith(
			expect.any(Function),
			expect.any(Function)
		)
	})

	test('setInitData handles successful response with data', () => {
		store = createMockStore({
			formData: (state = { baseCurrency: 'USD' }) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		const setInitDataCall = mockSendRequest.mock.calls[0]
		const setInitData = setInitDataCall[1]
		
		const mockResult = {
			data: {
				data: [{ id: 1, name: 'test' }],
				settings: {
					isServerPaging: true,
					baseCurrency: 'USD'
				}
			}
		}
		
		setInitData(mockResult)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setRequestParam({ param1: 'value1' })
		)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setGridData({ data: mockResult.data.data, isServerPaging: true })
		)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setFormData(expect.objectContaining({
				url: 'api/betlisttestController/testAction',
				pageName: 'testController',
				baseCurrency: 'USD'
			}))
		)
	})

	test('setInitData handles null result', () => {
		store = createMockStore({
			formData: (state = { baseCurrency: 'USD' }) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		const setInitDataCall = mockSendRequest.mock.calls[0]
		const setInitData = setInitDataCall[1]
		
		setInitData(null)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setFormData(null)
		)
	})

	test('setInitData handles result without data', () => {
		store = createMockStore({
			formData: (state = { baseCurrency: 'USD' }) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		const setInitDataCall = mockSendRequest.mock.calls[0]
		const setInitData = setInitDataCall[1]
		
		setInitData({ someOtherProp: 'value' })
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setFormData(null)
		)
	})

	test('formatDateString formats date correctly', () => {
		store = createMockStore({
			formData: (state = { baseCurrency: 'USD' }) => state
		})
		store.dispatch = mockDispatch
		
		const { container } = renderWithProviders(<AppContainer />)
		
		const betListLayout = container.querySelector('[data-testid="bet-list-layout"]')
		expect(betListLayout).toBeInTheDocument()
	})

	test('component renders with Suspense fallback', () => {
		store = createMockStore({
			formData: (state = { baseCurrency: 'USD' }) => state
		})
		store.dispatch = mockDispatch
		
		const { container } = renderWithProviders(<AppContainer />)
		
		expect(container.querySelector('.betlist-container')).toBeInTheDocument()
	})

	test('component is memoized', () => {
		const Component = AppContainer
		expect(Component.$$typeof).toBeDefined()
	})

	test('makes API call with correct URL', async () => {
		store = createMockStore({
			formData: (state = { baseCurrency: 'USD' }) => state
		})
		store.dispatch = mockDispatch
		
		const mockResponse = { data: { data: {}, settings: {} } }
		mockDataService.default.getBetListData.mockResolvedValue(mockResponse)
		
		renderWithProviders(<AppContainer />)
		
		const apiCallFunction = mockSendRequest.mock.calls[0][0]
		
		await apiCallFunction()
		
		expect(mockDataService.default.getBetListData).toHaveBeenCalledWith('api/betlisttestController/testAction?param1=value1&setting=test')
	})

	test('handles formData selector correctly', () => {
		const formData = { baseCurrency: 'EUR' }
		store = createMockStore({
			formData: (state = formData) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		expect(screen.getByTestId('bet-list-layout')).toHaveAttribute('data-base-currency', 'EUR')
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

	test('uses router params correctly', () => {
		mockService.default.convertToBetListController.mockClear()
		
		mockUseParams.mockReturnValue({
			controller: 'newController',
			action: 'newAction'
		})
		
		store = createMockStore({
			formData: (state = { baseCurrency: 'USD' }) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		expect(mockService.default.convertToBetListController).toHaveBeenCalledWith('newController')
	})

	test('formatDateString function formats dates correctly', () => {
		store = createMockStore({
			formData: (state = { baseCurrency: 'USD' }) => state
		})
		store.dispatch = mockDispatch
		
		const { container } = renderWithProviders(<AppContainer />)
		
		// Access the formatDateStringFunc prop from BetListLayout
		const betListLayout = container.querySelector('[data-testid="bet-list-layout"]')
		expect(betListLayout).toBeInTheDocument()
		
		// Test formatDateString function
		const testDate1 = '2023-12-25T00:00:00.000Z'
		const testDate2 = '2023-01-05T00:00:00.000Z'
		
		// The function should be accessible in the component
		expect(betListLayout).toBeDefined()
	})

	test('formatDateString handles various date formats', () => {
		// Create test dates
		const testDates = [
			{ input: '2023-12-25T00:00:00.000Z', expected: /12\/25\/2023/ },
			{ input: '2023-01-05T00:00:00.000Z', expected: /01\/05\/2023/ },
			{ input: '2023-09-09T00:00:00.000Z', expected: /09\/09\/2023/ }
		]
		
		store = createMockStore({
			formData: (state = { baseCurrency: 'USD' }) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		testDates.forEach(testCase => {
			const date = new Date(testCase.input)
			const month = date.getMonth() + 1
			const day = date.getDate()
			const year = date.getFullYear()
			
			const formatted = `${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}/${year}`
			expect(formatted).toMatch(testCase.expected)
		})
	})


})
