import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Radio from '@/components/Radio'

describe('Radio', () => {
	test('renders with required props', () => {
		render(<Radio id="test-radio" />)
		
		const radio = screen.getByRole('radio')
		const label = radio.nextElementSibling
		
		expect(radio).toBeInTheDocument()
		expect(radio).toHaveAttribute('id', 'test-radio')
		expect(label).toBeInTheDocument()
		expect(label).toHaveAttribute('for', 'test-radio')
	})

	test('renders with default props', () => {
		render(<Radio id="test-radio" />)
		
		const radio = screen.getByRole('radio')
		const label = screen.getByLabelText('')
		
		expect(radio).toHaveAttribute('value', '0')
		expect(radio).toHaveAttribute('name', '')
		expect(radio).not.toBeChecked()
		expect(label).toBeInTheDocument()
	})

	test('renders with custom props', () => {
		render(
			<Radio 
				id="custom-radio"
				label="Custom Label"
				name="radio-group"
				value="custom-value"
				checked={true}
			/>
		)
		
		const radio = screen.getByRole('radio')
		
		expect(radio).toHaveAttribute('value', 'custom-value')
		expect(radio).toHaveAttribute('name', 'radio-group')
		expect(radio).toBeChecked()
		expect(screen.getByText('Custom Label')).toBeInTheDocument()
	})

	test('handles numeric value', () => {
		render(<Radio id="test-radio" value={42} />)
		
		const radio = screen.getByRole('radio')
		expect(radio).toHaveAttribute('value', '42')
	})

	test('handles string value', () => {
		render(<Radio id="test-radio" value="string-value" />)
		
		const radio = screen.getByRole('radio')
		expect(radio).toHaveAttribute('value', 'string-value')
	})

	test('calls onChange with value when clicked', () => {
		const mockOnChange = jest.fn()
		render(
			<Radio 
				id="test-radio" 
				value="test-value" 
				onChange={mockOnChange} 
			/>
		)
		
		const radio = screen.getByRole('radio')
		fireEvent.click(radio)
		
		expect(mockOnChange).toHaveBeenCalledWith('test-value')
		expect(mockOnChange).toHaveBeenCalledTimes(1)
	})

	test('calls onChange with numeric value', () => {
		const mockOnChange = jest.fn()
		render(
			<Radio 
				id="test-radio" 
				value={123} 
				onChange={mockOnChange} 
			/>
		)
		
		const radio = screen.getByRole('radio')
		fireEvent.click(radio)
		
		expect(mockOnChange).toHaveBeenCalledWith(123)
	})

	test('does not call onChange when onChange is not provided', () => {
		// Should not throw error
		render(<Radio id="test-radio" value="test" />)
		
		const radio = screen.getByRole('radio')
		
		expect(() => {
			fireEvent.click(radio)
		}).not.toThrow()
	})

	test('handles change event correctly', () => {
		const mockOnChange = jest.fn()
		render(
			<Radio 
				id="test-radio-change" 
				value="test-value" 
				onChange={mockOnChange} 
			/>
		)
		
		const radio = screen.getByRole('radio')
		fireEvent.click(radio)
		
		expect(mockOnChange).toHaveBeenCalledWith('test-value')
	})

	test('label is associated with radio input', () => {
		render(<Radio id="associated-radio" label="Associated Label" />)
		
		const radio = screen.getByRole('radio')
		const label = screen.getByText('Associated Label')
		
		expect(label).toHaveAttribute('for', 'associated-radio')
		expect(radio).toHaveAttribute('id', 'associated-radio')
	})

	test('renders within span wrapper', () => {
		const { container } = render(<Radio id="test-radio" />)
		
		const span = container.firstChild
		expect(span.tagName).toBe('SPAN')
		
		const radio = span.querySelector('input[type="radio"]')
		const label = span.querySelector('label')
		
		expect(radio).toBeInTheDocument()
		expect(label).toBeInTheDocument()
	})

	test('handles checked state changes', () => {
		const { rerender } = render(
			<Radio id="test-radio" checked={false} />
		)
		
		let radio = screen.getByRole('radio')
		expect(radio).not.toBeChecked()
		
		rerender(<Radio id="test-radio" checked={true} />)
		
		radio = screen.getByRole('radio')
		expect(radio).toBeChecked()
	})

	test('handles name attribute for radio grouping', () => {
		render(
			<div>
				<Radio id="radio1" name="group1" value="option1" />
				<Radio id="radio2" name="group1" value="option2" />
				<Radio id="radio3" name="group2" value="option3" />
			</div>
		)
		
		const radios = screen.getAllByRole('radio')
		
		expect(radios[0]).toHaveAttribute('name', 'group1')
		expect(radios[1]).toHaveAttribute('name', 'group1')
		expect(radios[2]).toHaveAttribute('name', 'group2')
	})

	test('handles empty string values', () => {
		render(<Radio id="test-radio-empty" value="" label="" name="" />)
		
		const radio = screen.getByRole('radio')
		const label = screen.getByLabelText('')
		
		expect(radio).toHaveAttribute('value', '')
		expect(radio).toHaveAttribute('name', '')
		expect(label).toBeInTheDocument()
	})
})