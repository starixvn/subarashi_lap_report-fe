import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '@/App'

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
	RouterProvider: ({ router }) => (
		<div data-testid="router-provider" data-router-basename={router.basename}>
			Router Provider Mock
			{router.routes}
		</div>
	),
	createBrowserRouter: jest.fn((routes, options) => ({
		routes,
		basename: options?.basename || '/',
		options
	})),
	createRoutesFromElements: jest.fn((element) => element),
	Route: ({ children, path, element, loader, errorElement, id, ...props }) => (
		<div 
			data-testid="route"
			data-path={path}
			data-id={id}
			data-has-loader={!!loader}
			data-has-error-element={errorElement !== null && errorElement !== undefined}
		>
			{children}
			{element}
		</div>
	)
}))

// Mock routes configuration
jest.mock('@/routes', () => [
	{
		Id: 'test-route-1',
		PageName: 'Test Page 1',
		Path: 'test/path1/*',
		Permissions: ['TEST_PERMISSION_1'],
		Layout: 'TestLayout1',
		Component: 'TestComponent1'
	},
	{
		Id: 'test-route-2',
		PageName: 'Test Page 2',
		Path: 'test/path2/*',
		Permissions: ['TEST_PERMISSION_2'],
		Layout: 'TestLayout2',
		Component: 'TestComponent2'
	}
])

// Mock RouteLayout
jest.mock('@/layouts/RouteLayout', () => {
	const MockRouteLayout = ({ id, pageName, layout, component }) => (
		<div 
			data-testid="route-layout"
			data-id={id}
			data-page-name={pageName}
			data-layout={layout}
			data-component={component}
		>
			RouteLayout for {id}
		</div>
	)
	return MockRouteLayout
})

// Mock NotFound
jest.mock('@/pages/NotFound', () => {
	const MockNotFound = () => <div data-testid="not-found">Not Found Page</div>
	return MockNotFound
})

// Mock RouteErrorBoundary
jest.mock('@/components/RouteErrorBoundary', () => {
	const MockRouteErrorBoundary = () => <div data-testid="error-boundary">Error Boundary</div>
	return MockRouteErrorBoundary
})

// Mock helper functions
jest.mock('@/helpers/validatorHelper', () => ({
	AuthorizeRequestInfo: jest.fn(async (params) => ({
		permissions: params.permissions,
		authorized: true
	}))
}))

// Mock config with a variable that can be changed
let mockIsDebugging = false
jest.mock('@/constants/config', () => ({
	get isDebugging() {
		return mockIsDebugging
	}
}))

describe('App', () => {
	beforeEach(() => {
		// Reset window.rootUrl before each test
		delete window.rootUrl
		jest.clearAllMocks()
	})

	test('renders RouterProvider', () => {
		render(<App />)
		
		const routerProvider = screen.getByTestId('router-provider')
		expect(routerProvider).toBeInTheDocument()
		expect(routerProvider).toHaveTextContent('Router Provider Mock')
	})

	test('uses default root URL when window.rootUrl is not set', () => {
		render(<App />)
		
		const routerProvider = screen.getByTestId('router-provider')
		expect(routerProvider).toHaveAttribute('data-router-basename', '/')
	})

	test('uses custom root URL from window.rootUrl', () => {
		window.rootUrl = '/custom-app/'
		
		render(<App />)
		
		const routerProvider = screen.getByTestId('router-provider')
		expect(routerProvider).toHaveAttribute('data-router-basename', '/custom-app/')
	})

	test('creates routes from configuration', () => {
		render(<App />)
		
		const routes = screen.getAllByTestId('route')
		
		// Should have routes for each configured route plus the catch-all route
		expect(routes.length).toBeGreaterThan(0)
		
		// Check for NotFound route
		const notFoundRoute = routes.find(route => route.getAttribute('data-path') === '*')
		expect(notFoundRoute).toBeInTheDocument()
	})

	test('creates route elements with correct props', () => {
		render(<App />)
		
		const routeLayouts = screen.getAllByTestId('route-layout')
		expect(routeLayouts).toHaveLength(2)
		
		const firstRoute = routeLayouts[0]
		expect(firstRoute).toHaveAttribute('data-id', 'test-route-1')
		expect(firstRoute).toHaveAttribute('data-page-name', 'Test Page 1')
		expect(firstRoute).toHaveAttribute('data-layout', 'TestLayout1')
		expect(firstRoute).toHaveAttribute('data-component', 'TestComponent1')
	})

	test('includes NotFound component for catch-all route', () => {
		render(<App />)
		
		expect(screen.getByTestId('not-found')).toBeInTheDocument()
	})

	test('includes error boundary when not debugging', () => {
		// Config is mocked to have isDebugging: false
		render(<App />)
		
		const routes = screen.getAllByTestId('route')
		const routesWithErrorBoundary = routes.filter(
			route => route.getAttribute('data-has-error-element') === 'true'
		)
		
		expect(routesWithErrorBoundary.length).toBeGreaterThan(0)
	})

	test('excludes error boundary when debugging', () => {
		// Set debugging to true
		mockIsDebugging = true
		
		render(<App />)
		
		const routes = screen.getAllByTestId('route')
		const routesWithErrorBoundary = routes.filter(
			route => route.getAttribute('data-has-error-element') === 'true'
		)
		
		expect(routesWithErrorBoundary).toHaveLength(0)
		
		// Reset to false for other tests
		mockIsDebugging = false
	})

	test('sets up loaders for routes with permissions', () => {
		render(<App />)
		
		const routes = screen.getAllByTestId('route')
		const routesWithLoaders = routes.filter(
			route => route.getAttribute('data-has-loader') === 'true'
		)
		
		// Should have loaders for the configured routes (not the catch-all)
		expect(routesWithLoaders.length).toBeGreaterThan(0)
	})

	test('component is memoized', () => {
		expect(App.$$typeof).toBeDefined() // React.memo creates this property
	})

	test('handles empty route configuration gracefully', () => {
		// Mock empty routes
		jest.doMock('@/routes', () => [])
		
		const { default: EmptyApp } = require('@/App')
		
		expect(() => render(<EmptyApp />)).not.toThrow()
	})

	test('handles route without permissions', () => {
		// Mock route without permissions
		jest.doMock('@/routes', () => [
			{
				Id: 'no-permission-route',
				PageName: 'No Permission Page',
				Path: 'no-permission/*',
				Layout: 'NoPermissionLayout',
				Component: 'NoPermissionComponent'
			}
		])
		
		const { default: NoPermissionApp } = require('@/App')
		
		expect(() => render(<NoPermissionApp />)).not.toThrow()
	})

	test('router configuration includes correct options', () => {
		const { createBrowserRouter } = require('react-router-dom')
		
		render(<App />)
		
		expect(createBrowserRouter).toHaveBeenCalledWith(
			expect.anything(),
			expect.objectContaining({
				basename: '/'
			})
		)
	})

	test('creates route elements structure correctly', () => {
		render(<App />)
		
		// Should have a root route with path "/"
		const rootRoute = screen.getAllByTestId('route').find(
			route => route.getAttribute('data-path') === '/'
		)
		expect(rootRoute).toBeInTheDocument()
	})
})

