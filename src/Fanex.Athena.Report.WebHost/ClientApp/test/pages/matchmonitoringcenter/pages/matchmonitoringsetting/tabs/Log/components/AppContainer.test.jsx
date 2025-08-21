import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import AppContainer from '@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/Log/components/AppContainer'

jest.mock('@/hooks/useToggleRequest')
jest.mock('@/components/Loader')
jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/Log/components/FormFilter')
jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/Log/components/DataGrid')
jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/Log/actions')

const mockUseToggleRequest = require('@/hooks/useToggleRequest')
const mockActionCreators = require('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/Log/actions')

jest.mock('@/components/Loader', () => ({ isLoading }) => (
	<div data-testid="loader" data-loading={isLoading} />
))

jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/Log/components/FormFilter', () => () => (
	<div data-testid="form-filter" />
))

jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/Log/components/DataGrid', () => () => (
	<div data-testid="data-grid" />
))

describe('MatchMonitoringCenter Log AppContainer', () => {
	let store
	let mockDispatch
	let mockSendRequest

	const createMockStore = (initialState = {}) => {
		const defaultReducers = {
			loading: (state = false) => state,
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
			getInitFormData: jest.fn(() => ({ type: 'GET_INIT_FORM_DATA' }))
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

	test('renders main layout correctly', () => {
		renderWithProviders(<AppContainer />)
		
		expect(screen.getByTestId('loader')).toBeInTheDocument()
		expect(screen.getByTestId('form-filter')).toBeInTheDocument()
		expect(screen.getByTestId('data-grid')).toBeInTheDocument()
	})

	test('renders with log-container class', () => {
		const { container } = renderWithProviders(<AppContainer />)
		
		expect(container.querySelector('.log-container')).toBeInTheDocument()
	})

	test('passes loading prop to Loader when false', () => {
		store = createMockStore({
			loading: (state = false) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		const loader = screen.getByTestId('loader')
		expect(loader).toHaveAttribute('data-loading', 'false')
	})

	test('passes loading prop to Loader when true', () => {
		store = createMockStore({
			loading: (state = true) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		const loader = screen.getByTestId('loader')
		expect(loader).toHaveAttribute('data-loading', 'true')
	})

	test('calls sendRequest on mount with getInitFormData action', () => {
		renderWithProviders(<AppContainer />)
		
		expect(mockSendRequest).toHaveBeenCalledTimes(1)
		expect(mockSendRequest).toHaveBeenCalledWith(expect.any(Function))
	})

	test('dispatches getInitFormData action on mount', () => {
		renderWithProviders(<AppContainer />)
		
		const sendRequestCall = mockSendRequest.mock.calls[0]
		const actionFunction = sendRequestCall[0]
		
		actionFunction()
		
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'GET_INIT_FORM_DATA' })
	})

	test('handles loading selector correctly', () => {
		const loading = true
		store = createMockStore({
			loading: (state = loading) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		const loader = screen.getByTestId('loader')
		expect(loader).toHaveAttribute('data-loading', 'true')
	})

	test('renders all child components', () => {
		renderWithProviders(<AppContainer />)
		
		expect(screen.getByTestId('loader')).toBeInTheDocument()
		expect(screen.getByTestId('form-filter')).toBeInTheDocument()
		expect(screen.getByTestId('data-grid')).toBeInTheDocument()
	})

	test('uses useEffect hook correctly', () => {
		renderWithProviders(<AppContainer />)
		
		expect(mockSendRequest).toHaveBeenCalledTimes(1)
	})

	test('has correct component structure', () => {
		const { container } = renderWithProviders(<AppContainer />)
		
		const logContainer = container.querySelector('.log-container')
		expect(logContainer).toBeInTheDocument()
		expect(logContainer.children).toHaveLength(3)
	})

	test('component uses dispatch and sendRequest hooks', () => {
		renderWithProviders(<AppContainer />)
		
		expect(mockUseToggleRequest.default).toHaveBeenCalled()
		expect(mockSendRequest).toHaveBeenCalled()
	})
})
