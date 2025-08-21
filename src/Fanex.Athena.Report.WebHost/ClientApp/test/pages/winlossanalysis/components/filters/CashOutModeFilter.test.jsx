import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { CashOutModeFilter } from '@/pages/winlossanalysis/components/filters/CashOutModeFilter'

jest.mock('@/components/ReportSelect', () => {
	return function MockReportSelect({ instanceId, value, options, isDisabled, onChange }) {
		return (
			<select 
				data-testid={instanceId}
				value={value?.value || ''}
				disabled={isDisabled}
				onChange={(e) => onChange({ value: e.target.value, label: e.target.options[e.target.selectedIndex].text })}
			>
				{options?.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		)
	}
})

jest.mock('@/helpers/langHelper', () => ({
	getSingleResource: jest.fn((key) => {
		const translations = {
			'CashOut': 'Cash Out'
		}
		return translations[key] || key
	})
}))

jest.mock('@/pages/winlossanalysis/common/constants', () => ({
	CashOutModeList: [
		{ value: 'all', label: 'All' },
		{ value: 'cashout', label: 'Cash Out' },
		{ value: 'no-cashout', label: 'No Cash Out' }
	]
}))

describe('CashOutModeFilter', () => {
	const defaultProps = {
		onChange: jest.fn(),
		value: { value: 'all', label: 'All' },
		viewInTime: false,
		disabled: false
	}

	beforeEach(() => {
		jest.clearAllMocks()
	})

	test('renders with default props', () => {
		render(<CashOutModeFilter {...defaultProps} />)
		
		expect(screen.getByRole('combobox')).toBeInTheDocument()
		expect(screen.getByTestId('CashOutMode')).toBeInTheDocument()
	})

	test('renders label correctly', () => {
		const { container } = render(<CashOutModeFilter {...defaultProps} />)
		
		const label = container.querySelector('.label-text')
		expect(label).toBeInTheDocument()
		expect(label).toHaveClass('label-text')
		expect(label).toHaveTextContent('Cash Out')
	})

	test('passes correct props to ReportSelect', () => {
		render(<CashOutModeFilter {...defaultProps} />)
		
		const select = screen.getByTestId('CashOutMode')
		expect(select).toBeInTheDocument()
		expect(select).toHaveValue('all')
		expect(select).not.toBeDisabled()
	})

	test('renders with disabled state', () => {
		render(<CashOutModeFilter {...defaultProps} disabled={true} />)
		
		const select = screen.getByTestId('CashOutMode')
		expect(select).toBeDisabled()
	})

	test('renders with different value', () => {
		const props = {
			...defaultProps,
			value: { value: 'cashout', label: 'Cash Out' }
		}
		
		render(<CashOutModeFilter {...props} />)
		
		const select = screen.getByTestId('CashOutMode')
		expect(select).toHaveValue('cashout')
	})

	test('calls onChange when value changes', () => {
		const mockOnChange = jest.fn()
		const props = {
			...defaultProps,
			onChange: mockOnChange,
			viewInTime: true
		}
		
		render(<CashOutModeFilter {...props} />)
		
		const select = screen.getByTestId('CashOutMode')
		fireEvent.change(select, { target: { value: 'no-cashout' } })
		
		expect(mockOnChange).toHaveBeenCalledWith(
			{ value: 'no-cashout', label: 'No Cash Out' },
			true
		)
	})

	test('passes viewInTime parameter to onChange', () => {
		const mockOnChange = jest.fn()
		const props = {
			...defaultProps,
			onChange: mockOnChange,
			viewInTime: false
		}
		
		render(<CashOutModeFilter {...props} />)
		
		const select = screen.getByTestId('CashOutMode')
		fireEvent.change(select, { target: { value: 'cashout' } })
		
		expect(mockOnChange).toHaveBeenCalledWith(
			{ value: 'cashout', label: 'Cash Out' },
			false
		)
	})

	test('handles undefined value prop', () => {
		const props = {
			...defaultProps,
			value: undefined
		}
		
		expect(() => {
			render(<CashOutModeFilter {...props} />)
		}).not.toThrow()
	})

	test('handles undefined onChange prop', () => {
		const props = {
			...defaultProps,
			onChange: undefined
		}
		
		expect(() => {
			render(<CashOutModeFilter {...props} />)
		}).not.toThrow()
	})

	test('renders form group structure', () => {
		const { container } = render(<CashOutModeFilter {...defaultProps} />)
		
		const formGroup = container.querySelector('.form-group')
		expect(formGroup).toBeInTheDocument()
		
		const label = formGroup.querySelector('.label-text')
		expect(label).toBeInTheDocument()
	})

	test('has correct component structure', () => {
		const { container } = render(<CashOutModeFilter {...defaultProps} />)
		
		expect(container.firstChild).toHaveClass('form-group')
		expect(container.querySelector('label')).toHaveClass('label-text')
	})

	test('is memoized component', () => {
		expect(typeof CashOutModeFilter).toBe('function')
	})

	test('handles all props correctly', () => {
		const allProps = {
			onChange: jest.fn(),
			value: { value: 'cashout', label: 'Cash Out' },
			viewInTime: true,
			disabled: true
		}
		
		render(<CashOutModeFilter {...allProps} />)
		
		const select = screen.getByTestId('CashOutMode')
		expect(select).toBeDisabled()
		expect(select).toHaveValue('cashout')
	})
})
