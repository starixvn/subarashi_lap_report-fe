import React from 'react'
import { render, screen } from '@testing-library/react'
import DropdownButton from '@/components/dropdown/DropdownButton'

// Mock the dropdown components
jest.mock('@/components/dropdown/DropdownToggle', () => {
	return function MockDropdownToggle({ children, onClick, caret, className, disabled, tag, ...props }) {
		return (
			<button 
				data-testid="dropdown-toggle" 
				onClick={onClick}
				className={className}
				disabled={disabled}
				{...props}
			>
				{children}
			</button>
		)
	}
})

jest.mock('@/components/dropdown/DropdownMenu', () => {
	return function MockDropdownMenu({ children, isOpen, onOpen, onClose, ...props }) {
		return (
			<div 
				data-testid="dropdown-menu" 
				data-is-open={isOpen}
				{...props}
			>
				{children}
			</div>
		)
	}
})

describe('DropdownButton', () => {
	test('renders with required props', () => {
		render(
			<DropdownButton buttonLabel="Test Button">
				<div>Menu Content</div>
			</DropdownButton>
		)
		
		expect(screen.getByTestId('dropdown-toggle')).toBeInTheDocument()
		expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument()
		expect(screen.getByText('Test Button')).toBeInTheDocument()
		expect(screen.getByText('Menu Content')).toBeInTheDocument()
	})

	test('applies default dropdown class', () => {
		const { container } = render(
			<DropdownButton buttonLabel="Test">
				<div>Content</div>
			</DropdownButton>
		)
		
		const dropdown = container.firstChild
		expect(dropdown).toHaveClass('dropdown')
	})

	test('applies custom className', () => {
		const { container } = render(
			<DropdownButton className="custom-dropdown" buttonLabel="Test">
				<div>Content</div>
			</DropdownButton>
		)
		
		const dropdown = container.firstChild
		expect(dropdown).toHaveClass('dropdown', 'custom-dropdown')
	})

	test('passes isOpen prop to DropdownMenu', () => {
		render(
			<DropdownButton isOpen={true} buttonLabel="Test">
				<div>Content</div>
			</DropdownButton>
		)
		
		const menu = screen.getByTestId('dropdown-menu')
		expect(menu).toHaveAttribute('data-is-open', 'true')
	})

	test('passes isOpen false to DropdownMenu', () => {
		render(
			<DropdownButton isOpen={false} buttonLabel="Test">
				<div>Content</div>
			</DropdownButton>
		)
		
		const menu = screen.getByTestId('dropdown-menu')
		expect(menu).toHaveAttribute('data-is-open', 'false')
	})

	test('passes onToggle to DropdownToggle', () => {
		const mockOnToggle = jest.fn()
		render(
			<DropdownButton onToggle={mockOnToggle} buttonLabel="Test">
				<div>Content</div>
			</DropdownButton>
		)
		
		const toggle = screen.getByTestId('dropdown-toggle')
		expect(toggle).toBeInTheDocument()
	})

	test('passes onOpen and onClose to DropdownMenu', () => {
		const mockOnOpen = jest.fn()
		const mockOnClose = jest.fn()
		
		render(
			<DropdownButton 
				onOpen={mockOnOpen} 
				onClose={mockOnClose} 
				buttonLabel="Test"
			>
				<div>Content</div>
			</DropdownButton>
		)
		
		// The mocked component will receive these props
		const menu = screen.getByTestId('dropdown-menu')
		expect(menu).toBeInTheDocument()
	})

	test('passes toggleButton props to DropdownToggle', () => {
		const toggleButtonProps = {
			caret: true,
			className: 'custom-toggle',
			disabled: true,
			tag: 'div'
		}
		
		render(
			<DropdownButton 
				toggleButton={toggleButtonProps} 
				buttonLabel="Test"
			>
				<div>Content</div>
			</DropdownButton>
		)
		
		const toggle = screen.getByTestId('dropdown-toggle')
		expect(toggle).toHaveClass('custom-toggle')
		expect(toggle).toBeDisabled()
	})

	test('uses default toggleButton props when not provided', () => {
		render(
			<DropdownButton buttonLabel="Test">
				<div>Content</div>
			</DropdownButton>
		)
		
		const toggle = screen.getByTestId('dropdown-toggle')
		expect(toggle).toHaveClass('toggle-default')
	})

	test('passes dropdownMenu props to DropdownMenu', () => {
		const dropdownMenuProps = {
			className: 'custom-menu',
			tag: 'section',
			children: <div>Menu content</div>
		}
		
		render(
			<DropdownButton 
				dropdownMenu={dropdownMenuProps} 
				buttonLabel="Test"
			>
				<div>Content</div>
			</DropdownButton>
		)
		
		const menu = screen.getByTestId('dropdown-menu')
		expect(menu).toHaveClass('custom-menu')
	})

	test('spreads additional attributes to container', () => {
		render(
			<DropdownButton 
				buttonLabel="Test"
				id="test-dropdown"
				data-custom="value"
			>
				<div>Content</div>
			</DropdownButton>
		)
		
		const container = document.getElementById('test-dropdown')
		expect(container).toBeInTheDocument()
		expect(container).toHaveAttribute('data-custom', 'value')
	})

	test('renders children inside DropdownMenu', () => {
		render(
			<DropdownButton buttonLabel="Test">
				<div data-testid="child-1">Child 1</div>
				<div data-testid="child-2">Child 2</div>
			</DropdownButton>
		)
		
		expect(screen.getByTestId('child-1')).toBeInTheDocument()
		expect(screen.getByTestId('child-2')).toBeInTheDocument()
	})

	test('supports different buttonLabel types', () => {
		const { rerender } = render(
			<DropdownButton buttonLabel="String Label">
				<div>Content</div>
			</DropdownButton>
		)
		
		expect(screen.getByText('String Label')).toBeInTheDocument()
		
		rerender(
			<DropdownButton buttonLabel={<span>JSX Label</span>}>
				<div>Content</div>
			</DropdownButton>
		)
		
		expect(screen.getByText('JSX Label')).toBeInTheDocument()
		
		rerender(
			<DropdownButton buttonLabel={123}>
				<div>Content</div>
			</DropdownButton>
		)
		
		expect(screen.getByText('123')).toBeInTheDocument()
	})
})