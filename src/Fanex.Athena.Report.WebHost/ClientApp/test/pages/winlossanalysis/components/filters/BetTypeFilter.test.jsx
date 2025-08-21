import React from 'react'
import { render, screen } from '@testing-library/react'
import { BetTypeFilter } from '@/pages/winlossanalysis/components/filters/BetTypeFilter'

jest.mock('@legion-lib/react-multiselect', () => ({
	TreeViewSelect: ({ id, dataSource, texts, isValid, onChange, ...props }) => (
		<div data-testid={id} data-valid={isValid}>
			<select onChange={onChange} {...props}>
				{dataSource.map((item, index) => (
					<option key={index} value={item.value}>
						{item.name}
					</option>
				))}
			</select>
			{texts?.All && <span data-testid="all-text">{texts.All}</span>}
		</div>
	)
}))

jest.mock('@/helpers/langHelper', () => ({
	__esModule: true,
	default: {
		currentLanguage: 'en',
		getSingleResource: jest.fn((key) => {
			const resources = {
				'N_A': 'N/A',
				'BetType': 'Bet Type'
			}
			return resources[key] || key
		})
	}
}))

jest.mock('@/constants/report', () => ({
	TreeViewOption: {
		mode: 'test'
	}
}))

describe('BetTypeFilter', () => {
	test('renders with default props', () => {
		render(<BetTypeFilter />)
		
		expect(screen.getByText('Bet Type')).toBeInTheDocument()
		expect(screen.getByTestId('BetTypeList')).toBeInTheDocument()
	})

	test('renders with empty dataSource', () => {
		render(<BetTypeFilter dataSource={[]} />)
		
		const treeView = screen.getByTestId('BetTypeList')
		expect(treeView).toHaveAttribute('data-valid', 'false')
		expect(screen.getByTestId('all-text')).toHaveTextContent('N/A')
	})

	test('renders with valid dataSource', () => {
		const mockDataSource = [
			{ value: '1', name: 'Single', checked: true },
			{ value: '2', name: 'Multiple', checked: false }
		]
		const mockOnChange = jest.fn()

		render(<BetTypeFilter dataSource={mockDataSource} onChange={mockOnChange} isValid={true} />)
		
		const treeView = screen.getByTestId('BetTypeList')
		expect(treeView).toHaveAttribute('data-valid', 'true')
		
		expect(screen.getByText('Single')).toBeInTheDocument()
		expect(screen.getByText('Multiple')).toBeInTheDocument()
	})

	test('renders with null dataSource', () => {
		render(<BetTypeFilter dataSource={null} />)
		
		const treeView = screen.getByTestId('BetTypeList')
		expect(treeView).toHaveAttribute('data-valid', 'false')
		expect(screen.getByTestId('all-text')).toHaveTextContent('N/A')
	})

	test('passes onChange handler correctly', () => {
		const mockOnChange = jest.fn()
		const mockDataSource = [{ value: '1', name: 'Test', checked: true }]

		render(<BetTypeFilter dataSource={mockDataSource} onChange={mockOnChange} />)
		
		const treeView = screen.getByTestId('BetTypeList')
		expect(treeView).toBeInTheDocument()
	})

	test('handles isValid prop correctly', () => {
		const mockDataSource = [{ value: '1', name: 'Test', checked: true }]

		const { rerender } = render(<BetTypeFilter dataSource={mockDataSource} isValid={false} />)
		expect(screen.getByTestId('BetTypeList')).toHaveAttribute('data-valid', 'false')

		rerender(<BetTypeFilter dataSource={mockDataSource} isValid={true} />)
		expect(screen.getByTestId('BetTypeList')).toHaveAttribute('data-valid', 'true')
	})

	test('renders form structure correctly', () => {
		render(<BetTypeFilter />)
		
		const formGroup = document.querySelector('.form-group')
		expect(formGroup).toBeInTheDocument()
		
		const label = screen.getByText('Bet Type')
		expect(label).toHaveClass('label-text')
	})

	test('applies default props correctly', () => {
		render(<BetTypeFilter />)
		
		const treeView = screen.getByTestId('BetTypeList')
		expect(treeView).toBeInTheDocument()
	})
})
