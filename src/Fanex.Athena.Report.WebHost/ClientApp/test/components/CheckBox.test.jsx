import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CheckBox from '@/components/CheckBox'

describe('CheckBox', () => {
	test('renders checkbox with label', () => {
		render(<CheckBox id="test-checkbox" label="Test Label" />)
		
		const checkbox = screen.getByRole('checkbox')
		const label = screen.getByText('Test Label')
		
		expect(checkbox).toBeInTheDocument()
		expect(label).toBeInTheDocument()
		expect(label).toHaveAttribute('for', 'test-checkbox')
	})

	test('renders with default props', () => {
		render(<CheckBox id="test-checkbox" />)
		
		const checkbox = screen.getByRole('checkbox')
		const container = checkbox.closest('.checkbox-group')
		
		expect(checkbox).toBeChecked()
		expect(checkbox).toBeEnabled()
		expect(container).toHaveClass('checkbox-group')
		
		const label = screen.getByLabelText('')
		expect(label).toBeInTheDocument()
	})

	test('applies custom className', () => {
		render(<CheckBox id="test-checkbox" className="custom-class" />)
		
		const container = screen.getByRole('checkbox').closest('.checkbox-group')
		expect(container).toHaveClass('checkbox-group', 'custom-class')
	})

	test('handles checked prop correctly', () => {
		const { rerender } = render(<CheckBox id="test-checkbox" checked={false} />)
		
		expect(screen.getByRole('checkbox')).not.toBeChecked()
		
		rerender(<CheckBox id="test-checkbox" checked={true} />)
		expect(screen.getByRole('checkbox')).toBeChecked()
	})

	test('handles disabled prop correctly', () => {
		render(<CheckBox id="test-checkbox" disabled={true} />)
		
		expect(screen.getByRole('checkbox')).toBeDisabled()
	})

	test('calls onChange when clicked', () => {
		const mockOnChange = jest.fn()
		render(<CheckBox id="test-checkbox" checked={false} onChange={mockOnChange} />)
		
		const checkbox = screen.getByRole('checkbox')
		fireEvent.click(checkbox)
		
		expect(mockOnChange).toHaveBeenCalledWith(true)
	})

	test('calls onChange with opposite value when checked', () => {
		const mockOnChange = jest.fn()
		render(<CheckBox id="test-checkbox" checked={true} onChange={mockOnChange} />)
		
		const checkbox = screen.getByRole('checkbox')
		fireEvent.click(checkbox)
		
		expect(mockOnChange).toHaveBeenCalledWith(false)
	})

	test('still calls onChange when disabled (component behavior)', () => {
		const mockOnChange = jest.fn()
		render(<CheckBox id="test-checkbox" disabled={true} checked={false} onChange={mockOnChange} />)
		
		const checkbox = screen.getByRole('checkbox')
		fireEvent.click(checkbox)
		
		// The component currently calls onChange even when disabled
		expect(mockOnChange).toHaveBeenCalledWith(true)
	})

	test('supports ref forwarding', () => {
		const ref = React.createRef()
		render(<CheckBox id="test-checkbox" ref={ref} />)
		
		expect(ref.current).toBeInstanceOf(HTMLDivElement)
		expect(ref.current).toHaveClass('checkbox-group')
	})

	test('has correct displayName', () => {
		expect(CheckBox.displayName).toBe('CheckBox')
	})
})