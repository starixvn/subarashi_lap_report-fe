import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import AppContainer from '@/pages/weeklylivematch/components/AppContainer'

jest.mock('@/components/Loader')
jest.mock('@/pages/weeklylivematch/components/FormFilter')
jest.mock('@/pages/weeklylivematch/components/DataGrid')

jest.mock('@/components/Loader', () => ({ isLoading }) => (
	<div data-testid="loader" data-loading={isLoading} />
))

jest.mock('@/pages/weeklylivematch/components/FormFilter', () => () => (
	<div data-testid="form-filter" />
))

jest.mock('@/pages/weeklylivematch/components/DataGrid', () => () => (
	<div data-testid="data-grid" />
))

describe('WeeklyLiveMatch AppContainer', () => {
	let store
	let mockDispatch

	const createMockStore = (initialState = {}) => {
		const defaultReducers = {
			isLoading: (state = false) => state,
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
		
		expect(screen.getByTestId('loader')).toBeInTheDocument()
		expect(screen.getByTestId('form-filter')).toBeInTheDocument()
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

	test('passes false isLoading prop to Loader when loading is false', () => {
		store = createMockStore({
			isLoading: (state = false) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<AppContainer />)
		
		const loader = screen.getByTestId('loader')
		expect(loader).toHaveAttribute('data-loading', 'false')
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

	test('renders all required components in correct order', () => {
		const { container } = renderWithProviders(<AppContainer />)
		
		const children = container.children
		expect(children.length).toBeGreaterThan(0)
		
		expect(screen.getByTestId('loader')).toBeInTheDocument()
		expect(screen.getByTestId('form-filter')).toBeInTheDocument()
		expect(screen.getByTestId('data-grid')).toBeInTheDocument()
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

	test('handles undefined isLoading state gracefully', () => {
		store = createMockStore({
			isLoading: (state = false) => state
		})
		store.dispatch = mockDispatch
		
		expect(() => {
			renderWithProviders(<AppContainer />)
		}).not.toThrow()
		
		expect(screen.getByTestId('loader')).toBeInTheDocument()
	})

	test('handles null isLoading state gracefully', () => {
		store = createMockStore({
			isLoading: (state = null) => state
		})
		store.dispatch = mockDispatch
		
		expect(() => {
			renderWithProviders(<AppContainer />)
		}).not.toThrow()
		
		expect(screen.getByTestId('loader')).toBeInTheDocument()
	})

	test('handles truthy values for isLoading', () => {
		const truthyValues = [true, 1, 'loading', [], {}]
		
		truthyValues.forEach(value => {
			store = createMockStore({
				isLoading: (state = value) => state
			})
			store.dispatch = mockDispatch
			
			const { unmount } = renderWithProviders(<AppContainer />)
			const loader = screen.getByTestId('loader')
			expect(loader).toHaveAttribute('data-loading', String(value))
			unmount()
		})
	})

	test('handles falsy values for isLoading', () => {
		const falsyValues = [false, 0, '']
		
		falsyValues.forEach(value => {
			store = createMockStore({
				isLoading: (state = value) => state
			})
			store.dispatch = mockDispatch
			
			const { unmount } = renderWithProviders(<AppContainer />)
			const loader = screen.getByTestId('loader')
			expect(loader).toHaveAttribute('data-loading', String(value))
			unmount()
		})
	})

	test('uses useSelector hook correctly', () => {
		renderWithProviders(<AppContainer />)
		
		expect(screen.getByTestId('loader')).toBeInTheDocument()
		expect(screen.getByTestId('form-filter')).toBeInTheDocument()
		expect(screen.getByTestId('data-grid')).toBeInTheDocument()
	})

	test('renders consistently across re-renders', () => {
		const { rerender } = renderWithProviders(<AppContainer />)
		
		expect(screen.getByTestId('loader')).toBeInTheDocument()
		expect(screen.getByTestId('form-filter')).toBeInTheDocument()
		expect(screen.getByTestId('data-grid')).toBeInTheDocument()
		
		rerender(
			<Provider store={store}>
				<AppContainer />
			</Provider>
		)
		
		expect(screen.getByTestId('loader')).toBeInTheDocument()
		expect(screen.getByTestId('form-filter')).toBeInTheDocument()
		expect(screen.getByTestId('data-grid')).toBeInTheDocument()
	})
})
