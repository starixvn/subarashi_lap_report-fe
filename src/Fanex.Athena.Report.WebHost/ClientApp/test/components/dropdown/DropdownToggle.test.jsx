import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import DropdownToggle from '@/components/dropdown/DropdownToggle'

describe('DropdownToggle', () => {
	test('renders with default props', () => {
		render(<DropdownToggle>Toggle Button</DropdownToggle>)
		
		const button = screen.getByRole('button', { name: 'Toggle Button' })
		expect(button).toBeInTheDocument()
		expect(button.tagName).toBe('BUTTON')
		expect(button).toHaveClass('dropdown-toggle', 'site-caret')
	})

	test('renders with custom tag', () => {
		render(<DropdownToggle tag="div">Toggle Content</DropdownToggle>)
		
		const element = screen.getByText('Toggle Content')
		expect(element).toBeInTheDocument()
		expect(element.tagName).toBe('DIV')
		expect(element).toHaveClass('dropdown-toggle', 'site-caret')
	})

	test('applies custom className', () => {
		render(<DropdownToggle className="custom-class">Toggle Button</DropdownToggle>)
		
		const button = screen.getByRole('button')
		expect(button).toHaveClass('dropdown-toggle', 'site-caret', 'custom-class')
	})

	test('renders without caret when caret is false', () => {
		render(<DropdownToggle caret={false}>Toggle Button</DropdownToggle>)
		
		const button = screen.getByRole('button')
		expect(button).toHaveClass('dropdown-toggle')
		expect(button).not.toHaveClass('site-caret')
	})

	test('renders with caret when caret is true', () => {
		render(<DropdownToggle caret={true}>Toggle Button</DropdownToggle>)
		
		const button = screen.getByRole('button')
		expect(button).toHaveClass('dropdown-toggle', 'site-caret')
	})

	test('handles onClick event', () => {
		const mockClick = jest.fn()
		render(<DropdownToggle onClick={mockClick}>Toggle Button</DropdownToggle>)
		
		const button = screen.getByRole('button')
		fireEvent.click(button)
		
		expect(mockClick).toHaveBeenCalledTimes(1)
	})

	test('handles disabled state', () => {
		render(<DropdownToggle disabled={true}>Toggle Button</DropdownToggle>)
		
		const button = screen.getByRole('button')
		expect(button).toBeDisabled()
	})

	test('passes through additional attributes', () => {
		render(
			<DropdownToggle
				data-testid="custom-toggle"
				aria-label="Custom Toggle"
				type="submit"
			>
				Toggle Button
			</DropdownToggle>
		)
		
		const button = screen.getByTestId('custom-toggle')
		expect(button).toHaveAttribute('aria-label', 'Custom Toggle')
		expect(button).toHaveAttribute('type', 'submit')
	})

	test('filters out tag prop from spreading to DOM', () => {
		render(<DropdownToggle tag="span">Toggle Content</DropdownToggle>)
		
		const element = screen.getByText('Toggle Content')
		expect(element).not.toHaveAttribute('tag')
	})

	test('filters out caret prop from spreading to DOM', () => {
		render(<DropdownToggle caret={false}>Toggle Button</DropdownToggle>)
		
		const button = screen.getByRole('button')
		expect(button).not.toHaveAttribute('caret')
	})

	test('combines multiple classNames correctly', () => {
		render(
			<DropdownToggle
				className="custom-class another-class"
				caret={true}
			>
				Toggle Button
			</DropdownToggle>
		)
		
		const button = screen.getByRole('button')
		expect(button).toHaveClass('dropdown-toggle', 'site-caret', 'custom-class', 'another-class')
	})

	test('works with different tag types', () => {
		const tags = ['button', 'div', 'span', 'a']
		
		tags.forEach(tag => {
			const { unmount } = render(
				<DropdownToggle tag={tag}>Toggle {tag}</DropdownToggle>
			)
			
			const element = screen.getByText(`Toggle ${tag}`)
			expect(element.tagName).toBe(tag.toUpperCase())
			expect(element).toHaveClass('dropdown-toggle')
			
			unmount()
		})
	})

	test('handles empty children', () => {
		render(<DropdownToggle />)
		
		const button = screen.getByRole('button')
		expect(button).toBeInTheDocument()
		expect(button).toHaveClass('dropdown-toggle', 'site-caret')
	})

	test('handles null children', () => {
		render(<DropdownToggle>{null}</DropdownToggle>)
		
		const button = screen.getByRole('button')
		expect(button).toBeInTheDocument()
		expect(button).toHaveClass('dropdown-toggle', 'site-caret')
	})

	test('handles mixed content children', () => {
		render(
			<DropdownToggle>
				<span>Icon</span>
				Text Content
			</DropdownToggle>
		)
		
		const button = screen.getByRole('button')
		expect(button).toBeInTheDocument()
		expect(screen.getByText('Icon')).toBeInTheDocument()
		expect(screen.getByText('Text Content')).toBeInTheDocument()
	})
})
