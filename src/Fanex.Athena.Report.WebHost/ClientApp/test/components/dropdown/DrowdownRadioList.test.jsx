import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import DrowdownRadioList from '@/components/dropdown/DrowdownRadioList'

jest.mock('uuid', () => ({
	v4: jest.fn(() => 'mock-uuid-id')
}))

jest.mock('@/components/dropdown/DropdownButton', () => {
	return function MockDropdownButton({ children, isOpen, onToggle, onClose, buttonLabel, className, toggleButton }) {
		return (
			<div data-testid="dropdown-button" className={className} data-is-open={isOpen}>
				<button onClick={onToggle} data-testid="toggle-button">
					{buttonLabel}
				</button>
				<div data-testid="dropdown-content">
					{children}
				</div>
			</div>
		)
	}
})

jest.mock('@/components/dropdown/DropdownItem', () => {
	return function MockDropdownItem({ children, tag }) {
		const Tag = tag || 'div'
		return <Tag data-testid="dropdown-item">{children}</Tag>
	}
})

jest.mock('@/components/dropdown/DropdownRadioItem', () => {
	return function MockDropdownRadioItem({ id, checked, value, text, onChange }) {
		return (
			<input
				data-testid={`radio-item-${id}`}
				type="radio"
				checked={checked}
				value={value}
				onChange={() => onChange && onChange(value)}
				aria-label={text}
			/>
		)
	}
})

describe('DrowdownRadioList', () => {
	const defaultProps = {
		id: 'test-dropdown',
		dataSource: [
			{ id: 1, value: 'Option 1' },
			{ id: 2, value: 'Option 2' },
			{ id: 3, value: 'Option 3' }
		],
		keySelector: 'id',
		valueSelector: 'value',
		selectedValue: 1,
		onChange: jest.fn()
	}

	beforeEach(() => {
		jest.clearAllMocks()
	})

	test('renders dropdown with default props', () => {
		render(<DrowdownRadioList {...defaultProps} />)
		
		expect(screen.getByTestId('dropdown-button')).toBeInTheDocument()
		expect(screen.getByTestId('toggle-button')).toBeInTheDocument()
	})

	test('renders with default className when not provided', () => {
		render(<DrowdownRadioList {...defaultProps} />)
		
		const dropdown = screen.getByTestId('dropdown-button')
		expect(dropdown).not.toHaveClass('custom-class')
	})

	test('applies custom className', () => {
		render(<DrowdownRadioList {...defaultProps} className="custom-class" />)
		
		const dropdown = screen.getByTestId('dropdown-button')
		expect(dropdown).toHaveClass('custom-class')
	})

	test('renders settings icon with default iconClass', () => {
		render(<DrowdownRadioList {...defaultProps} />)
		
		const icon = screen.getByRole('button').querySelector('i')
		expect(icon).toHaveClass('material-icons')
		expect(icon).toHaveTextContent('settings')
	})

	test('renders with custom iconClass', () => {
		render(<DrowdownRadioList {...defaultProps} iconClass="fa fa-cog" />)
		
		const icon = screen.getByRole('button').querySelector('i')
		expect(icon).toHaveClass('fa', 'fa-cog')
	})

	test('renders radio items for each data source item', () => {
		render(<DrowdownRadioList {...defaultProps} />)
		
		expect(screen.getByTestId('radio-item-test-dropdown-1')).toBeInTheDocument()
		expect(screen.getByTestId('radio-item-test-dropdown-2')).toBeInTheDocument()
		expect(screen.getByTestId('radio-item-test-dropdown-3')).toBeInTheDocument()
	})

	test('sets correct checked state for selected value', () => {
		render(<DrowdownRadioList {...defaultProps} selectedValue={2} />)
		
		expect(screen.getByTestId('radio-item-test-dropdown-1')).not.toBeChecked()
		expect(screen.getByTestId('radio-item-test-dropdown-2')).toBeChecked()
		expect(screen.getByTestId('radio-item-test-dropdown-3')).not.toBeChecked()
	})

	test('calls onChange when radio item is selected', () => {
		const mockOnChange = jest.fn()
		render(<DrowdownRadioList {...defaultProps} onChange={mockOnChange} />)
		
		fireEvent.click(screen.getByTestId('radio-item-test-dropdown-2'))
		
		expect(mockOnChange).toHaveBeenCalledWith(2)
	})

	test('handles empty data source', () => {
		render(<DrowdownRadioList {...defaultProps} dataSource={[]} />)
		
		expect(screen.getByTestId('dropdown-button')).toBeInTheDocument()
		expect(screen.queryByTestId(/radio-item/)).not.toBeInTheDocument()
	})

	test('works with function selectors', () => {
		const dataSource = [
			{ customId: 'a', customValue: 'Alpha' },
			{ customId: 'b', customValue: 'Beta' }
		]
		
		render(
			<DrowdownRadioList
				{...defaultProps}
				dataSource={dataSource}
				keySelector={key => key === 'customId'}
				valueSelector={key => key === 'customValue'}
				selectedValue="a"
			/>
		)
		
		expect(screen.getByTestId('radio-item-test-dropdown-a')).toBeInTheDocument()
		expect(screen.getByTestId('radio-item-test-dropdown-b')).toBeInTheDocument()
	})

	test('works with string selectors', () => {
		const dataSource = [
			{ code: 'US', name: 'United States' },
			{ code: 'UK', name: 'United Kingdom' }
		]
		
		render(
			<DrowdownRadioList
				{...defaultProps}
				dataSource={dataSource}
				keySelector="code"
				valueSelector="name"
				selectedValue="US"
			/>
		)
		
		expect(screen.getByTestId('radio-item-test-dropdown-US')).toBeInTheDocument()
		expect(screen.getByTestId('radio-item-test-dropdown-UK')).toBeInTheDocument()
	})

	test('manages dropdown open state correctly', () => {
		render(<DrowdownRadioList {...defaultProps} />)
		
		const dropdown = screen.getByTestId('dropdown-button')
		expect(dropdown).toHaveAttribute('data-is-open', 'false')
		
		fireEvent.click(screen.getByTestId('toggle-button'))
		expect(dropdown).toHaveAttribute('data-is-open', 'true')
	})

	test('uses default id when not provided', () => {
		const { id, ...propsWithoutId } = defaultProps
		render(<DrowdownRadioList {...propsWithoutId} />)
		
		expect(screen.getByTestId('radio-item-mock-uuid-id-1')).toBeInTheDocument()
	})

	test('has display name set by memo', () => {
		expect(DrowdownRadioList.$$typeof).toBeDefined()
	})

	test('component is memoized', () => {
		expect(DrowdownRadioList.$$typeof).toBeDefined()
	})
})
