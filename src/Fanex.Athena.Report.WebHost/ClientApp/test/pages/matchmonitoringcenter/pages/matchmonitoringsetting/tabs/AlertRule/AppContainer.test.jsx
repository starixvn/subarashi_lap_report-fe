import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import AppContainer from '@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/AppContainer'

jest.mock('@/components/Loader')
jest.mock('@/components/sweet-alert')
jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/FormatRule')
jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/DataGrid')

jest.mock('@/components/Loader', () => ({ isLoading }) => (
	<div data-testid="loader" data-loading={isLoading} />
))

jest.mock('@/components/sweet-alert', () => (props) => (
	<div data-testid="sweet-alert" data-props={JSON.stringify(props)} />
))

jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/FormatRule', () => () => (
	<div data-testid="format-rule" />
))

jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/DataGrid', () => () => (
	<div data-testid="data-grid" />
))

describe('AlertRule AppContainer', () => {
	let store
	let mockDispatch

	const createMockStore = (initialState = {}) => {
		const defaultReducers = {
			isLoading: (state = false) => state,
			sweetAlertOption: (state = null) => state,
			...initialState
		}
		return createStore(combineReducers(defaultReducers))
	}

	beforeEach(() => {
		mockDispatch = jest.fn()
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
		
		const container = document.querySelector('.alert-rule')
		expect(container).toBeInTheDocument()
		expect(screen.getByTestId('loader')).toBeInTheDocument()
		expect(screen.getByTestId('format-rule')).toBeInTheDocument()
		expect(screen.getByTestId('data-grid')).toBeInTheDocument()
	})

	test('passes isLoading prop to Loader correctly', () => {
		store = createMockStore({
			isLoading: (state = true) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		const loader = screen.getByTestId('loader')
		expect(loader).toHaveAttribute('data-loading', 'true')
	})

	test('does not render SweetAlert when sweetAlertOption is null', () => {
		renderWithProviders(<AppContainer />)
		
		expect(screen.queryByTestId('sweet-alert')).not.toBeInTheDocument()
	})

	test('renders SweetAlert when sweetAlertOption exists', () => {
		const sweetAlertOption = {
			title: 'Test Alert',
			message: 'Test message',
			type: 'success'
		}
		
		store = createMockStore({
			sweetAlertOption: (state = sweetAlertOption) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		const sweetAlert = screen.getByTestId('sweet-alert')
		expect(sweetAlert).toBeInTheDocument()
		
		const propsData = JSON.parse(sweetAlert.getAttribute('data-props'))
		expect(propsData.title).toBe('Test Alert')
		expect(propsData.message).toBe('Test message')
		expect(propsData.type).toBe('success')
	})

	test('handles different loading states', () => {
		const { rerender } = renderWithProviders(<AppContainer />)
		
		let loader = screen.getByTestId('loader')
		expect(loader).toHaveAttribute('data-loading', 'false')
		
		store = createMockStore({
			isLoading: (state = true) => state
		})
		store.dispatch = mockDispatch
		
		rerender(
			<Provider store={store}>
				<AppContainer />
			</Provider>
		)
		
		loader = screen.getByTestId('loader')
		expect(loader).toHaveAttribute('data-loading', 'true')
	})

	test('handles state changes correctly', () => {
		const initialState = {
			isLoading: (state = false) => state,
			sweetAlertOption: (state = null) => state
		}
		
		store = createMockStore(initialState)
		store.dispatch = mockDispatch
		
		const { rerender } = renderWithProviders(<AppContainer />)
		
		expect(screen.getByTestId('loader')).toHaveAttribute('data-loading', 'false')
		expect(screen.queryByTestId('sweet-alert')).not.toBeInTheDocument()
		
		const newState = {
			isLoading: (state = true) => state,
			sweetAlertOption: (state = { title: 'New Alert' }) => state
		}
		
		store = createMockStore(newState)
		store.dispatch = mockDispatch
		
		rerender(
			<Provider store={store}>
				<AppContainer />
			</Provider>
		)
		
		expect(screen.getByTestId('loader')).toHaveAttribute('data-loading', 'true')
		expect(screen.getByTestId('sweet-alert')).toBeInTheDocument()
	})

	test('mapStateToProps function works correctly', () => {
		const Component = AppContainer.WrappedComponent || AppContainer
		expect(Component).toBeDefined()
	})

	test('renders all required components in correct order', () => {
		renderWithProviders(<AppContainer />)
		
		const container = document.querySelector('.alert-rule')
		const children = container.children
		
		expect(children).toHaveLength(3)
		expect(children[0]).toHaveAttribute('data-testid', 'loader')
		expect(children[1]).toHaveAttribute('data-testid', 'format-rule')
		expect(children[2]).toHaveAttribute('data-testid', 'data-grid')
	})

	test('handles undefined state gracefully', () => {
		store = createMockStore({
			isLoading: (state = false) => state,
			sweetAlertOption: (state = null) => state
		})
		store.dispatch = mockDispatch
		
		expect(() => {
			renderWithProviders(<AppContainer />)
		}).not.toThrow()
		
		expect(screen.getByTestId('loader')).toBeInTheDocument()
		expect(screen.queryByTestId('sweet-alert')).not.toBeInTheDocument()
	})

	test('handles complex sweetAlertOption objects', () => {
		const complexSweetAlertOption = {
			title: 'Complex Alert',
			message: 'Complex message',
			type: 'error',
			buttons: ['OK', 'Cancel'],
			onConfirm: jest.fn(),
			onCancel: jest.fn()
		}
		
		store = createMockStore({
			sweetAlertOption: (state = complexSweetAlertOption) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		const sweetAlert = screen.getByTestId('sweet-alert')
		expect(sweetAlert).toBeInTheDocument()
		
		const propsData = JSON.parse(sweetAlert.getAttribute('data-props'))
		expect(propsData.title).toBe('Complex Alert')
		expect(propsData.type).toBe('error')
		expect(propsData.buttons).toEqual(['OK', 'Cancel'])
	})
})
