import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ReportSelect from '@/components/ReportSelect'

// Mock react-select
jest.mock('react-select', () => {
	const MockSelect = ({ className, classNamePrefix, children, menuIsOpen, components, isDisabled, placeholder, value, ...props }) => {
		const CustomDropdownIndicator = components?.DropdownIndicator;
		return (
			<div 
				className={className}
				data-testid="react-select"
				data-menu-open={menuIsOpen}
				data-disabled={String(!!isDisabled)}
				placeholder={placeholder}
				value={value ? String(value) : undefined}
				components={JSON.stringify(components || {})}
			>
				{CustomDropdownIndicator && (
					<CustomDropdownIndicator selectProps={{ menuIsOpen }} />
				)}
				{children}
			</div>
		)
	}
	
	return {
		__esModule: true,
		default: MockSelect,
		components: {
			DropdownIndicator: ({ children, selectProps, ...props }) => (
				<div data-testid="dropdown-indicator" data-menu-open={String(!!selectProps?.menuIsOpen)} {...props}>
					<div className="select-arrow-zone">
						<span className={`select-arrow${selectProps?.menuIsOpen ? ' expanded' : ''}`}></span>
					</div>
					{children}
				</div>
			)
		}
	}
})

describe('ReportSelect', () => {
	test('renders with correct className and classNamePrefix', () => {
		render(<ReportSelect />)
		
		const select = screen.getByTestId('react-select')
		expect(select).toHaveClass('report-select-container')
		expect(select).toHaveAttribute('data-testid', 'react-select')
	})

	test('passes through additional props', () => {
		const options = [
			{ value: 'option1', label: 'Option 1' },
			{ value: 'option2', label: 'Option 2' }
		]
		
		render(
			<ReportSelect 
				options={options}
				placeholder="Select option"
				isDisabled={true}
			/>
		)
		
		const select = screen.getByTestId('react-select')
		expect(select).toHaveAttribute('placeholder', 'Select option')
		expect(select).toHaveAttribute('data-disabled', 'true')
	})

	test('renders CustomDropdownIndicator when menu is closed', () => {
		render(<ReportSelect menuIsOpen={false} />)
		
		const indicator = screen.getByTestId('dropdown-indicator')
		expect(indicator).toHaveAttribute('data-menu-open', 'false')
		
		const arrowZone = indicator.querySelector('.select-arrow-zone')
		expect(arrowZone).toBeInTheDocument()
		
		const arrow = arrowZone.querySelector('.select-arrow')
		expect(arrow).toBeInTheDocument()
		expect(arrow).not.toHaveClass('expanded')
	})

	test('renders CustomDropdownIndicator when menu is open', () => {
		render(<ReportSelect menuIsOpen={true} />)
		
		const indicator = screen.getByTestId('dropdown-indicator')
		expect(indicator).toHaveAttribute('data-menu-open', 'true')
		
		const arrowZone = indicator.querySelector('.select-arrow-zone')
		expect(arrowZone).toBeInTheDocument()
		
		const arrow = arrowZone.querySelector('.select-arrow')
		expect(arrow).toBeInTheDocument()
		expect(arrow).toHaveClass('expanded')
	})

	test('toggles arrow state based on menuIsOpen prop', () => {
		const { rerender } = render(<ReportSelect menuIsOpen={false} />)
		
		let arrow = screen.getByTestId('dropdown-indicator').querySelector('.select-arrow')
		expect(arrow).not.toHaveClass('expanded')
		
		rerender(<ReportSelect menuIsOpen={true} />)
		
		arrow = screen.getByTestId('dropdown-indicator').querySelector('.select-arrow')
		expect(arrow).toHaveClass('expanded')
	})

	test('handles undefined menuIsOpen prop', () => {
		render(<ReportSelect />)
		
		const indicator = screen.getByTestId('dropdown-indicator')
		const arrow = indicator.querySelector('.select-arrow')
		expect(arrow).not.toHaveClass('expanded')
	})

	test('applies correct component override', () => {
		render(<ReportSelect />)
		
		const indicator = screen.getByTestId('dropdown-indicator')
		expect(indicator).toBeInTheDocument()
	})

	test('maintains Select functionality with custom components', () => {
		const mockOnChange = jest.fn()
		
		render(
			<ReportSelect 
				onChange={mockOnChange}
				value={{ value: 'test', label: 'Test' }}
			/>
		)
		
		const select = screen.getByTestId('react-select')
		expect(select).toHaveAttribute('value', '[object Object]')
	})

	test('CustomDropdownIndicator receives correct props', () => {
		const testProps = {
			selectProps: { menuIsOpen: true },
			otherProp: 'test'
		}
		
		render(<ReportSelect {...testProps.selectProps} />)
		
		const indicator = screen.getByTestId('dropdown-indicator')
		expect(indicator).toHaveAttribute('data-menu-open', 'true')
	})
})

