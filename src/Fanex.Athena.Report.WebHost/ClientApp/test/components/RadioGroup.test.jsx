import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import RadioGroup from '@/components/RadioGroup'

describe('RadioGroup', () => {
	const defaultOptions = [
		{ label: 'Option 1', value: 1 },
		{ label: 'Option 2', value: 2 },
		{ label: 'Option 3', value: 3 }
	]

	test('renders with required options', () => {
		render(<RadioGroup options={defaultOptions} />)
		
		expect(screen.getByText('Option 1')).toBeInTheDocument()
		expect(screen.getByText('Option 2')).toBeInTheDocument()
		expect(screen.getByText('Option 3')).toBeInTheDocument()
	})

	test('renders with label', () => {
		render(
			<RadioGroup 
				label="Choose Option" 
				options={defaultOptions} 
			/>
		)
		
		expect(screen.getByText('Choose Option')).toBeInTheDocument()
		expect(screen.getByText('Choose Option')).toHaveClass('label-text')
	})

	test('applies custom className', () => {
		render(
			<RadioGroup 
				className="custom-class" 
				options={defaultOptions} 
			/>
		)
		
		const container = screen.getByText('Option 1').closest('.radio-group')
		expect(container).toHaveClass('radio-group', 'custom-class')
	})

	test('sets default value correctly', () => {
		render(
			<RadioGroup 
				options={defaultOptions} 
				value={2} 
			/>
		)
		
		const option2Radio = screen.getByLabelText('Option 2')
		const option1Radio = screen.getByLabelText('Option 1')
		
		expect(option2Radio).toBeChecked()
		expect(option1Radio).not.toBeChecked()
	})

	test('generates correct IDs and names for radio inputs', () => {
		render(
			<RadioGroup 
				name="test-group" 
				options={defaultOptions} 
			/>
		)
		
		const option1Radio = screen.getByLabelText('Option 1')
		const option2Radio = screen.getByLabelText('Option 2')
		
		expect(option1Radio).toHaveAttribute('id', 'test-group-1')
		expect(option1Radio).toHaveAttribute('name', 'test-group')
		expect(option2Radio).toHaveAttribute('id', 'test-group-2')
		expect(option2Radio).toHaveAttribute('name', 'test-group')
	})

	test('calls onChange when option is selected', () => {
		const mockOnChange = jest.fn()
		render(
			<RadioGroup 
				options={defaultOptions} 
				value={1}
				onChange={mockOnChange} 
			/>
		)
		
		const option2Radio = screen.getByLabelText('Option 2')
		fireEvent.click(option2Radio)
		
		expect(mockOnChange).toHaveBeenCalledWith(2)
	})

	test('does not call onChange when same option is clicked', () => {
		const mockOnChange = jest.fn()
		render(
			<RadioGroup 
				options={defaultOptions} 
				value={1}
				onChange={mockOnChange} 
			/>
		)
		
		const option1Radio = screen.getByLabelText('Option 1')
		fireEvent.click(option1Radio)
		
		expect(mockOnChange).not.toHaveBeenCalled()
	})

	test('updates internal state when different option is selected', () => {
		render(
			<RadioGroup 
				options={defaultOptions} 
				value={1}
			/>
		)
		
		const option2Radio = screen.getByLabelText('Option 2')
		const option1Radio = screen.getByLabelText('Option 1')
		
		expect(option1Radio).toBeChecked()
		expect(option2Radio).not.toBeChecked()
		
		fireEvent.click(option2Radio)
		
		expect(option2Radio).toBeChecked()
		expect(option1Radio).not.toBeChecked()
	})

	test('handles string values', () => {
		const stringOptions = [
			{ label: 'Option A', value: 'a' },
			{ label: 'Option B', value: 'b' }
		]
		const mockOnChange = jest.fn()
		
		render(
			<RadioGroup 
				options={stringOptions} 
				value="a"
				onChange={mockOnChange} 
			/>
		)
		
		const optionBRadio = screen.getByLabelText('Option B')
		fireEvent.click(optionBRadio)
		
		expect(mockOnChange).toHaveBeenCalledWith('b')
	})

	test('renders without label when label prop is empty', () => {
		render(
			<RadioGroup 
				label="" 
				options={defaultOptions} 
			/>
		)
		
		const labelElement = screen.getByText('Option 1').closest('.radio-group').querySelector('.label-text')
		expect(labelElement).toBeEmptyDOMElement()
	})

	test('handles default props correctly', () => {
		render(<RadioGroup options={defaultOptions} />)
		
		const option1Radio = screen.getByLabelText('Option 1')
		expect(option1Radio).not.toBeChecked()
		
		const container = screen.getByText('Option 1').closest('.radio-group')
		expect(container).toHaveClass('radio-group', 'undefined')
	})

	test('works with zero as value', () => {
		const zeroOptions = [
			{ label: 'Zero', value: 0 },
			{ label: 'One', value: 1 }
		]
		
		render(
			<RadioGroup 
				options={zeroOptions} 
				value={0}
			/>
		)
		
		const zeroRadio = screen.getByLabelText('Zero')
		const oneRadio = screen.getByLabelText('One')
		
		expect(zeroRadio).toBeChecked()
		expect(oneRadio).not.toBeChecked()
	})

	test('handles empty options array', () => {
		render(<RadioGroup options={[]} />)
		
		const container = document.querySelector('.radio-group')
		expect(container).toBeInTheDocument()
		expect(container.querySelectorAll('input[type="radio"]')).toHaveLength(0)
	})
})

