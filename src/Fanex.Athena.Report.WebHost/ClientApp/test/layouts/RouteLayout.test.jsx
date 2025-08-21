import React from 'react'
import { render, screen } from '@testing-library/react'
import RouteLayout from '@/layouts/RouteLayout'

jest.mock('@/hooks/gtagEvents', () => ({
	usePageViewEvent: jest.fn()
}))

import { usePageViewEvent } from '@/hooks/gtagEvents'

describe('RouteLayout', () => {
	const MockComponent = () => <div>Test Component Content</div>
	const MockLayout = ({ children }) => (
		<div data-testid="mock-layout">
			<header>Layout Header</header>
			{children}
		</div>
	)

	beforeEach(() => {
		jest.clearAllMocks()
	})

	test('renders component without layout when layout is not provided', () => {
		render(<RouteLayout id="test-page" component={MockComponent} />)
		
		expect(screen.getByText('Test Component Content')).toBeInTheDocument()
		expect(screen.queryByTestId('mock-layout')).not.toBeInTheDocument()
	})

	test('renders component with layout when layout is provided', () => {
		render(
			<RouteLayout 
				id="test-page" 
				component={MockComponent}
				layout={MockLayout}
			/>
		)
		
		expect(screen.getByTestId('mock-layout')).toBeInTheDocument()
		expect(screen.getByText('Layout Header')).toBeInTheDocument()
		expect(screen.getByText('Test Component Content')).toBeInTheDocument()
	})

	test('calls usePageViewEvent with id when pageName is not provided', () => {
		render(<RouteLayout id="dashboard" component={MockComponent} />)
		
		expect(usePageViewEvent).toHaveBeenCalledWith('dashboard')
	})

	test('calls usePageViewEvent with pageName when provided', () => {
		render(
			<RouteLayout 
				id="dashboard" 
				pageName="Dashboard Page"
				component={MockComponent} 
			/>
		)
		
		expect(usePageViewEvent).toHaveBeenCalledWith('Dashboard Page')
	})

	test('passes through additional props to layout', () => {
		const MockLayoutWithProps = ({ children, customProp, className }) => (
			<div data-testid="mock-layout" className={className} data-custom={customProp}>
				{children}
			</div>
		)
		
		render(
			<RouteLayout 
				id="test-page"
				component={MockComponent}
				layout={MockLayoutWithProps}
				customProp="test-value"
				className="custom-layout"
			/>
		)
		
		const layout = screen.getByTestId('mock-layout')
		expect(layout).toHaveAttribute('data-custom', 'test-value')
		expect(layout).toHaveClass('custom-layout')
	})

	test('handles component with props', () => {
		const ComponentWithProps = ({ title = 'Default', count = 0 }) => (
			<div>
				{title}: {count}
			</div>
		)
		
		render(<RouteLayout id="test" component={ComponentWithProps} />)
		
		expect(screen.getByText('Default: 0')).toBeInTheDocument()
	})

	test('handles layout with complex structure', () => {
		const ComplexLayout = ({ children }) => (
			<div data-testid="complex-layout">
				<nav>Navigation</nav>
				<aside>Sidebar</aside>
				<main>{children}</main>
				<footer>Footer</footer>
			</div>
		)
		
		render(
			<RouteLayout 
				id="complex-page"
				component={MockComponent}
				layout={ComplexLayout}
			/>
		)
		
		expect(screen.getByTestId('complex-layout')).toBeInTheDocument()
		expect(screen.getByText('Navigation')).toBeInTheDocument()
		expect(screen.getByText('Sidebar')).toBeInTheDocument()
		expect(screen.getByText('Footer')).toBeInTheDocument()
		expect(screen.getByText('Test Component Content')).toBeInTheDocument()
	})

	test('component is memoized', () => {
		expect(RouteLayout.$$typeof).toBeDefined()
	})

	test('handles null/undefined layout', () => {
		render(<RouteLayout id="test" component={MockComponent} layout={null} />)
		
		expect(screen.getByText('Test Component Content')).toBeInTheDocument()
		expect(screen.queryByTestId('mock-layout')).not.toBeInTheDocument()
	})

	test('handles empty string as pageName', () => {
		render(<RouteLayout id="test" pageName="" component={MockComponent} />)
		
		expect(usePageViewEvent).toHaveBeenCalledWith('')
	})

	test('handles undefined pageName falling back to id', () => {
		render(<RouteLayout id="fallback-id" pageName={undefined} component={MockComponent} />)
		
		expect(usePageViewEvent).toHaveBeenCalledWith('fallback-id')
	})

	test('handles null pageName falling back to id', () => {
		render(<RouteLayout id="fallback-id" pageName={null} component={MockComponent} />)
		
		expect(usePageViewEvent).toHaveBeenCalledWith('fallback-id')
	})
})