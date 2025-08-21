import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import AppContainer from '@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/AppContainer'

jest.mock('@/components/TabMenu')
jest.mock('@/hooks/useToggleRequest')
jest.mock('@/lib/dataService')
jest.mock('@/lib/site')
jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/lib/constants')
jest.mock('@/actions/tabHandlerAction')
jest.mock('@/components/Loader')

const mockUseToggleRequest = require('@/hooks/useToggleRequest')
const mockDataService = require('@/lib/dataService')
const mockSite = require('@/lib/site')
const mockConstants = require('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/lib/constants')
const mockTabHandlerAction = require('@/actions/tabHandlerAction')

jest.mock('@/components/TabMenu', () => ({ selectedTabMenu, onClickTabMenu, tabMenuList }) => (
	<div data-testid="tab-menu" data-selected={selectedTabMenu}>
		{tabMenuList.map(tab => (
			<button key={tab.key} onClick={() => onClickTabMenu(tab.key)} data-testid={`tab-${tab.key}`}>
				{tab.name}
			</button>
		))}
	</div>
))

jest.mock('@/components/Loader', () => ({ isLoading }) => (
	<div data-testid="loader" data-loading={isLoading} />
))

const MockComponent = ({ selectedTabKey }) => (
	<div data-testid="mock-component" data-selected-tab={selectedTabKey}>
		Mock Component Content
	</div>
)

describe('MatchMonitoringSetting AppContainer', () => {
	let store
	let mockDispatch
	let mockSendRequest

	const createMockStore = (initialState = {}) => {
		const defaultReducers = {
			selectedTabKey: (state = null) => state,
			tabKeys: (state = []) => state,
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

		mockDataService.default = {
			getReportData: jest.fn()
		}

		mockSite.default = {
			assignToUrl: jest.fn()
		}

		mockConstants.ApiUrl = {
			SETTING_INDEX_URL: '/api/setting/index'
		}

		mockConstants.tabKeys = {
			ALERT_RULE: 'AlertRule',
			LOG: 'Log'
		}

		mockConstants.tabMenuList = [
			{ key: 'AlertRule', name: 'Alert Rule', component: MockComponent },
			{ key: 'Log', name: 'Log', component: MockComponent }
		]

		mockConstants.preLoadComponents = jest.fn()

		mockTabHandlerAction.setSelectedTab = jest.fn()
		mockTabHandlerAction.setTabKeys = jest.fn()

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

	test('renders AppContainer with initial loading state', () => {
		store = createMockStore({
			isLoading: (state = true) => state
		})
		store.dispatch = mockDispatch

		renderWithProviders(<AppContainer />)

		expect(screen.getByTestId('loader')).toBeInTheDocument()
		expect(screen.getByTestId('loader')).toHaveAttribute('data-loading', 'true')
	})

	test('calls sendRequest on mount to fetch tab data', () => {
		renderWithProviders(<AppContainer />)

		expect(mockSendRequest).toHaveBeenCalledWith(
			expect.any(Function),
			expect.any(Function)
		)
	})

	test('calls preLoadComponents on mount', () => {
		renderWithProviders(<AppContainer />)

		expect(mockConstants.preLoadComponents).toHaveBeenCalledWith(mockConstants.tabMenuList)
	})

	test('handles successful API response with valid tab keys', async () => {
		renderWithProviders(<AppContainer />)

		const apiCall = mockSendRequest.mock.calls[0][0]
		const responseHandler = mockSendRequest.mock.calls[0][1]

		const mockResponse = {
			data: {
				tabKeys: ['AlertRule', 'Log']
			}
		}

		responseHandler(mockResponse)

		expect(mockDispatch).toHaveBeenCalledWith(
			mockTabHandlerAction.setTabKeys(['AlertRule', 'Log'])
		)
		expect(mockDispatch).toHaveBeenCalledWith(
			mockTabHandlerAction.setSelectedTab('AlertRule')
		)
	})

	test('filters tab keys to only include valid ones', async () => {
		renderWithProviders(<AppContainer />)

		const responseHandler = mockSendRequest.mock.calls[0][1]

		const mockResponse = {
			data: {
				tabKeys: ['AlertRule', 'InvalidKey', 'Log', 'AnotherInvalidKey']
			}
		}

		responseHandler(mockResponse)

		expect(mockDispatch).toHaveBeenCalledWith(
			mockTabHandlerAction.setTabKeys(['AlertRule', 'Log'])
		)
	})

	test('redirects to invalid URL when no valid tab keys are found', async () => {
		renderWithProviders(<AppContainer />)

		const responseHandler = mockSendRequest.mock.calls[0][1]

		const mockResponse = {
			data: {
				tabKeys: ['InvalidKey1', 'InvalidKey2']
			}
		}

		responseHandler(mockResponse)

		expect(mockSite.default.assignToUrl).toHaveBeenCalledWith('Utility/Error?err=400')
	})

	test('redirects to invalid URL when response has no data', async () => {
		renderWithProviders(<AppContainer />)

		const responseHandler = mockSendRequest.mock.calls[0][1]

		responseHandler(null)

		expect(mockSite.default.assignToUrl).toHaveBeenCalledWith('Utility/Error?err=400')
	})

	test('redirects to invalid URL when response has no tabKeys', async () => {
		renderWithProviders(<AppContainer />)

		const responseHandler = mockSendRequest.mock.calls[0][1]

		const mockResponse = {
			data: {}
		}

		responseHandler(mockResponse)

		expect(mockSite.default.assignToUrl).toHaveBeenCalledWith('Utility/Error?err=400')
	})

	test('redirects to invalid URL when tabKeys is empty array', async () => {
		renderWithProviders(<AppContainer />)

		const responseHandler = mockSendRequest.mock.calls[0][1]

		const mockResponse = {
			data: {
				tabKeys: []
			}
		}

		responseHandler(mockResponse)

		expect(mockSite.default.assignToUrl).toHaveBeenCalledWith('Utility/Error?err=400')
	})

	test('renders TabMenu with filtered tab list', () => {
		store = createMockStore({
			tabKeys: (state = ['AlertRule', 'Log']) => state,
			selectedTabKey: (state = 'AlertRule') => state
		})
		store.dispatch = mockDispatch

		renderWithProviders(<AppContainer />)

		expect(screen.getByTestId('tab-menu')).toBeInTheDocument()
		expect(screen.getByTestId('tab-menu')).toHaveAttribute('data-selected', 'AlertRule')
		expect(screen.getByTestId('tab-AlertRule')).toBeInTheDocument()
		expect(screen.getByTestId('tab-Log')).toBeInTheDocument()
	})

	test('renders selected component when tab is selected', () => {
		store = createMockStore({
			tabKeys: (state = ['AlertRule', 'Log']) => state,
			selectedTabKey: (state = 'AlertRule') => state
		})
		store.dispatch = mockDispatch

		renderWithProviders(<AppContainer />)

		expect(screen.getByTestId('mock-component')).toBeInTheDocument()
		expect(screen.getByTestId('mock-component')).toHaveAttribute('data-selected-tab', 'AlertRule')
	})

	test('handles tab menu click', () => {
		store = createMockStore({
			tabKeys: (state = ['AlertRule', 'Log']) => state,
			selectedTabKey: (state = 'AlertRule') => state
		})
		store.dispatch = mockDispatch

		renderWithProviders(<AppContainer />)

		const logTabButton = screen.getByTestId('tab-Log')
		logTabButton.click()

		expect(mockDispatch).toHaveBeenCalledWith(
			mockTabHandlerAction.setSelectedTab('Log')
		)
	})

	test('does not set selected tab when one is already selected', async () => {
		store = createMockStore({
			selectedTabKey: (state = 'Log') => state
		})
		store.dispatch = mockDispatch

		renderWithProviders(<AppContainer />)

		const responseHandler = mockSendRequest.mock.calls[0][1]

		const mockResponse = {
			data: {
				tabKeys: ['AlertRule', 'Log']
			}
		}

		responseHandler(mockResponse)

		// Should call setTabKeys but not setSelectedTab since one is already selected
		expect(mockDispatch).toHaveBeenCalledWith(
			mockTabHandlerAction.setTabKeys(['AlertRule', 'Log'])
		)
		
		// Check that setSelectedTab was not called for AlertRule specifically
		expect(mockTabHandlerAction.setSelectedTab).not.toHaveBeenCalledWith('AlertRule')
	})

	test('renders Suspense fallback when component is loading', () => {
		store = createMockStore({
			tabKeys: (state = ['AlertRule']) => state,
			selectedTabKey: (state = 'AlertRule') => state
		})
		store.dispatch = mockDispatch

		const { container } = renderWithProviders(<AppContainer />)

		expect(container.querySelector('#monitor-detail')).toBeInTheDocument()
	})

	test('handles empty availableTabKeys', () => {
		store = createMockStore({
			tabKeys: (state = []) => state,
			selectedTabKey: (state = 'AlertRule') => state
		})
		store.dispatch = mockDispatch

		renderWithProviders(<AppContainer />)

		const tabMenu = screen.getByTestId('tab-menu')
		expect(tabMenu).toBeInTheDocument()
		expect(screen.queryByTestId('mock-component')).not.toBeInTheDocument()
	})

	test('handles invalid selected tab key', () => {
		store = createMockStore({
			tabKeys: (state = ['AlertRule', 'Log']) => state,
			selectedTabKey: (state = 'InvalidTab') => state
		})
		store.dispatch = mockDispatch

		renderWithProviders(<AppContainer />)

		expect(screen.queryByTestId('mock-component')).not.toBeInTheDocument()
	})
})