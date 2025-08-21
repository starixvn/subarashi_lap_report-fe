import React from 'react'
import { render, screen } from '@testing-library/react'
import DropdownMenu from '@/components/dropdown/DropdownMenu'

// Mock the Overlay component
jest.mock('@/components/Overlay', () => {
	const MockOverlay = ({ children, isOpening, onOpen, onClose }) => (
		<div 
			data-testid="mock-overlay"
			data-is-opening={String(isOpening === true)}
			data-on-open={!!onOpen}
			data-on-close={!!onClose}
		>
			{children}
		</div>
	)
	return MockOverlay
})

describe('DropdownMenu', () => {
	test('renders with default props', () => {
		render(
			<DropdownMenu>
				<div>Menu Content</div>
			</DropdownMenu>
		)
		
		const menuContent = screen.getByText('Menu Content')
		expect(menuContent).toBeInTheDocument()
		const menuContainer = menuContent.parentElement
		expect(menuContainer).toHaveClass('dropdown-menu')
		expect(menuContainer.tagName).toBe('DIV')
	})

	test('renders with custom tag', () => {
		render(
			<DropdownMenu tag="ul">
				<li>Menu Item</li>
			</DropdownMenu>
		)
		
		const menu = screen.getByText('Menu Item').parentElement
		expect(menu.tagName).toBe('UL')
		expect(menu).toHaveClass('dropdown-menu')
	})

	test('applies custom className', () => {
		render(
			<DropdownMenu className="custom-menu-class">
				<div>Menu Content</div>
			</DropdownMenu>
		)
		
		const menuContent = screen.getByText('Menu Content')
		const menuContainer = menuContent.parentElement
		expect(menuContainer).toHaveClass('dropdown-menu', 'custom-menu-class')
	})

	test('passes isOpen prop to Overlay', () => {
		render(
			<DropdownMenu isOpen={true}>
				<div>Menu Content</div>
			</DropdownMenu>
		)
		
		const overlay = screen.getByTestId('mock-overlay')
		expect(overlay).toHaveAttribute('data-is-opening', 'true')
	})

	test('passes onOpen prop to Overlay', () => {
		const mockOnOpen = jest.fn()
		render(
			<DropdownMenu onOpen={mockOnOpen}>
				<div>Menu Content</div>
			</DropdownMenu>
		)
		
		const overlay = screen.getByTestId('mock-overlay')
		expect(overlay).toHaveAttribute('data-on-open', 'true')
	})

	test('passes onClose prop to Overlay', () => {
		const mockOnClose = jest.fn()
		render(
			<DropdownMenu onClose={mockOnClose}>
				<div>Menu Content</div>
			</DropdownMenu>
		)
		
		const overlay = screen.getByTestId('mock-overlay')
		expect(overlay).toHaveAttribute('data-on-close', 'true')
	})

	test('spreads additional attributes to menu element', () => {
		render(
			<DropdownMenu 
				id="custom-menu-id"
				role="menu"
				aria-label="Custom menu"
				data-testid="dropdown-menu"
			>
				<div>Menu Content</div>
			</DropdownMenu>
		)
		
		const menu = screen.getByTestId('dropdown-menu')
		expect(menu).toHaveAttribute('id', 'custom-menu-id')
		expect(menu).toHaveAttribute('role', 'menu')
		expect(menu).toHaveAttribute('aria-label', 'Custom menu')
	})

	test('renders children inside menu element', () => {
		render(
			<DropdownMenu>
				<div>First Item</div>
				<div>Second Item</div>
				<span>Third Item</span>
			</DropdownMenu>
		)
		
		expect(screen.getByText('First Item')).toBeInTheDocument()
		expect(screen.getByText('Second Item')).toBeInTheDocument()
		expect(screen.getByText('Third Item')).toBeInTheDocument()
	})

	test('handles all props together', () => {
		const mockOnOpen = jest.fn()
		const mockOnClose = jest.fn()
		
		render(
			<DropdownMenu 
				tag="nav"
				className="complex-menu"
				isOpen={true}
				onOpen={mockOnOpen}
				onClose={mockOnClose}
				role="navigation"
			>
				<div>Complex Menu Content</div>
			</DropdownMenu>
		)
		
		const overlay = screen.getByTestId('mock-overlay')
		expect(overlay).toHaveAttribute('data-is-opening', 'true')
		expect(overlay).toHaveAttribute('data-on-open', 'true')
		expect(overlay).toHaveAttribute('data-on-close', 'true')
		
		const menuContent = screen.getByText('Complex Menu Content')
		const menuContainer = menuContent.parentElement
		expect(menuContainer.tagName).toBe('NAV')
		expect(menuContainer).toHaveClass('dropdown-menu', 'complex-menu')
		expect(menuContainer).toHaveAttribute('role', 'navigation')
	})

	test('filters out component-specific props from DOM element', () => {
		render(
			<DropdownMenu 
				tag="div"
				isOpen={true}
				onOpen={jest.fn()}
				onClose={jest.fn()}
				data-testid="menu-element"
			>
				<div>Content</div>
			</DropdownMenu>
		)
		
		const menu = screen.getByTestId('menu-element')
		
		// These props should not appear on the DOM element
		expect(menu).not.toHaveAttribute('tag')
		expect(menu).not.toHaveAttribute('isOpen')
		expect(menu).not.toHaveAttribute('onOpen')
		expect(menu).not.toHaveAttribute('onClose')
	})

	test('wraps content in Overlay component', () => {
		render(
			<DropdownMenu>
				<div>Wrapped Content</div>
			</DropdownMenu>
		)
		
		const overlay = screen.getByTestId('mock-overlay')
		const content = screen.getByText('Wrapped Content')
		
		expect(overlay).toBeInTheDocument()
		expect(overlay).toContainElement(content)
	})

	test('works with default isOpen state', () => {
		render(
			<DropdownMenu>
				<div>Default State Content</div>
			</DropdownMenu>
		)
		
		const overlay = screen.getByTestId('mock-overlay')
		expect(overlay).toHaveAttribute('data-is-opening', 'false')
	})
})

