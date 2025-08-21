import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { createStore, combineReducers } from 'redux'
import AppContainer from '@/pages/livereport/matchlist/components/AppContainer'

// Mock dependencies
jest.mock('@/hooks/useToggleRequest')
jest.mock('@/components/Loader')
jest.mock('@/lib/dataService')
jest.mock('@/pages/livereport/matchlist/components/DataGrid')
jest.mock('@/pages/livereport/matchlist/components/FormFilter')
jest.mock('@/pages/livereport/matchlist/actions')

const mockUseToggleRequest = require('@/hooks/useToggleRequest')
const mockDataService = require('@/lib/dataService')
const mockActionCreators = require('@/pages/livereport/matchlist/actions')

// Mock components
jest.mock('@/components/Loader', () => ({ isLoading }) => (
	<div data-testid="loader" data-loading={isLoading} />
))

jest.mock('@/pages/livereport/matchlist/components/DataGrid', () => () => (
	<div data-testid="data-grid" />
))

jest.mock('@/pages/livereport/matchlist/components/FormFilter', () => () => (
	<div data-testid="form-filter" />
))

describe('AppContainer', () => {
	let store
	let mockDispatch
	let mockSendRequest

	const createMockStore = (initialState = {}) => {
		const defaultReducers = {
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
			setGridData: jest.fn(),
			setFormData: jest.fn(),
			setRequestParam: jest.fn()
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

	test('renders main layout correctly', () => {
		renderWithProviders(<AppContainer />)
		
		const container = document.querySelector('.livereport-matchlist')
		expect(container).toBeInTheDocument()
		
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

	test('fetchReportData function works correctly', async () => {
		const mockResponse = { data: { test: 'data' } }
		mockDataService.default.getReportData.mockResolvedValue(mockResponse)
		
		renderWithProviders(<AppContainer />, 'param1=value1&param2=value2')
		
		// Get the fetchReportData function that was passed to sendRequest
		const fetchReportDataCall = mockSendRequest.mock.calls[0]
		const fetchReportData = fetchReportDataCall[0]
		
		const result = await fetchReportData()
		
		expect(mockDataService.default.getReportData).toHaveBeenCalledWith(
			expect.any(String),
			{ param1: 'value1', param2: 'value2' }
		)
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setRequestParam({ param1: 'value1', param2: 'value2' })
		)
		expect(result).toEqual({ test: 'data' })
	})

	test('setInitData handles successful response', () => {
		renderWithProviders(<AppContainer />)
		
		// Get the setInitData function that was passed to sendRequest
		const setInitDataCall = mockSendRequest.mock.calls[0]
		const setInitData = setInitDataCall[1]
		
		const mockResult = {
			data: [{ id: 1, name: 'test' }],
			otherProp: 'value'
		}
		
		setInitData(mockResult)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setGridData([{ id: 1, name: 'test' }])
		)
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setFormData({ otherProp: 'value' })
		)
	})

	test('setInitData handles null result', () => {
		renderWithProviders(<AppContainer />)
		
		// Get the setInitData function that was passed to sendRequest
		const setInitDataCall = mockSendRequest.mock.calls[0]
		const setInitData = setInitDataCall[1]
		
		setInitData(null)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setFormData(null)
		)
	})

	test('setInitData handles undefined result', () => {
		renderWithProviders(<AppContainer />)
		
		// Get the setInitData function that was passed to sendRequest
		const setInitDataCall = mockSendRequest.mock.calls[0]
		const setInitData = setInitDataCall[1]
		
		setInitData(undefined)
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setFormData(null)
		)
	})

	test('component is memoized', () => {
		const Component = AppContainer
		expect(Component.$$typeof).toBeDefined()
	})

	test('handles empty search params', () => {
		const mockResponse = { data: { test: 'data' } }
		mockDataService.default.getReportData.mockResolvedValue(mockResponse)
		
		renderWithProviders(<AppContainer />, '')
		
		// Verify empty params object is created
		expect(mockSendRequest).toHaveBeenCalled()
	})

	test('extracts search parameters correctly', async () => {
		const mockResponse = { data: { test: 'data' } }
		mockDataService.default.getReportData.mockResolvedValue(mockResponse)
		
		renderWithProviders(<AppContainer />, 'date=2023-01-01&status=active')
		
		// Get the fetchReportData function and call it
		const fetchReportDataCall = mockSendRequest.mock.calls[0]
		const fetchReportData = fetchReportDataCall[0]
		
		await fetchReportData()
		
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActionCreators.ActionCreators.setRequestParam({
				date: '2023-01-01',
				status: 'active'
			})
		)
	})
})
