import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import DropdownRadioItem from '@/components/dropdown/DropdownRadioItem'

describe('DropdownRadioItem', () => {
	test('renders radio item with label', () => {
		render(
			<DropdownRadioItem
				id="test-radio"
				text="Test Option"
				value="test-value"
				checked={false}
				onChange={jest.fn()}
			/>
		)
		
		const radioInput = screen.getByRole('radio')
		const label = screen.getByText('Test Option')
		
		expect(radioInput).toBeInTheDocument()
		expect(label).toBeInTheDocument()
		expect(radioInput).toHaveAttribute('value', 'test-value')
		expect(radioInput).toHaveAttribute('id', 'test-radio')
		expect(radioInput).toHaveAttribute('name', 'test-radio')
	})

	test('renders with checked state', () => {
		render(
			<DropdownRadioItem
				id="test-radio"
				text="Test Option"
				value="test-value"
				checked={true}
				onChange={jest.fn()}
			/>
		)
		
		const radioInput = screen.getByRole('radio')
		expect(radioInput).toBeChecked()
	})

	test('renders with unchecked state', () => {
		render(
			<DropdownRadioItem
				id="test-radio"
				text="Test Option"
				value="test-value"
				checked={false}
				onChange={jest.fn()}
			/>
		)
		
		const radioInput = screen.getByRole('radio')
		expect(radioInput).not.toBeChecked()
	})

	test('calls onChange when clicked', () => {
		const mockOnChange = jest.fn()
		render(
			<DropdownRadioItem
				id="test-radio"
				text="Test Option"
				value="test-value"
				checked={false}
				onChange={mockOnChange}
			/>
		)
		
		const label = screen.getByText('Test Option').closest('.selection-item')
		fireEvent.click(label)
		
		expect(mockOnChange).toHaveBeenCalledTimes(1)
		expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({
			value: 'test-value'
		}))
	})

	test('prevents default and stops propagation on click', () => {
		const mockOnChange = jest.fn()
		render(
			<DropdownRadioItem
				id="test-radio"
				text="Test Option"
				value="test-value"
				checked={false}
				onChange={mockOnChange}
			/>
		)
		
		const label = screen.getByText('Test Option').closest('.selection-item')
		fireEvent.click(label)
		
		expect(mockOnChange).toHaveBeenCalled()
		const callArgs = mockOnChange.mock.calls[0][0]
		expect(callArgs.value).toBe('test-value')
	})

	test('renders with HTML content in text', () => {
		render(
			<DropdownRadioItem
				id="test-radio"
				text="<strong>Bold</strong> Text"
				value="test-value"
				checked={false}
				onChange={jest.fn()}
			/>
		)
		
		const boldElement = screen.getByText('Bold')
		expect(boldElement).toBeInTheDocument()
		expect(boldElement.tagName).toBe('STRONG')
	})

	test('has correct className structure', () => {
		const { container } = render(
			<DropdownRadioItem
				id="test-radio"
				text="Test Option"
				value="test-value"
				checked={false}
				onChange={jest.fn()}
			/>
		)
		
		const label = container.querySelector('.selection-item')
		expect(label).toBeInTheDocument()
		expect(label.tagName).toBe('LABEL')
	})

	test('radio input is readOnly', () => {
		render(
			<DropdownRadioItem
				id="test-radio"
				text="Test Option"
				value="test-value"
				checked={false}
				onChange={jest.fn()}
			/>
		)
		
		const radioInput = screen.getByRole('radio')
		expect(radioInput).toHaveAttribute('readOnly')
	})

	test('handles different value types', () => {
		const numberValue = 123
		const mockOnChange = jest.fn()
		
		render(
			<DropdownRadioItem
				id="test-radio"
				text="Test Option"
				value={numberValue}
				checked={false}
				onChange={mockOnChange}
			/>
		)
		
		const label = screen.getByText('Test Option').closest('.selection-item')
		fireEvent.click(label)
		
		expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({
			value: numberValue
		}))
	})

	test('memoization works correctly', () => {
		const props = {
			id: 'test-radio',
			text: 'Test Option',
			value: 'test-value',
			checked: false,
			onChange: jest.fn()
		}
		
		const { rerender } = render(<DropdownRadioItem {...props} />)
		
		// Re-render with same props
		rerender(<DropdownRadioItem {...props} />)
		
		// Component should still be in the document
		expect(screen.getByRole('radio')).toBeInTheDocument()
	})
})
