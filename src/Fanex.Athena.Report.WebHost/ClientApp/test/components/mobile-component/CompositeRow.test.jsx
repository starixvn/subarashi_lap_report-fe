import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CompositeRow from '@/components/mobile-component/CompositeRow'

jest.mock('@/components/mobile-component/RefRow', () => {
	const { forwardRef } = require('react')
	return forwardRef(function MockRefRow({ children, className }, ref) {
		return (
			<tr ref={ref} className={className} data-testid="ref-row">
				{children}
			</tr>
		)
	})
})

jest.mock('@/components/mobile-component/CollapseRow', () => {
	return function MockCollapseRow({ children, className, onFocus, index, isFocus }) {
		return (
			<tr className={className} data-testid={`collapse-row-${index}`} data-is-focus={isFocus}>
				{children}
			</tr>
		)
	}
})

jest.mock('@legion-lib/react-grid', () => ({
	Cell: ({ children, className, onClick }) => (
		<td className={className} onClick={onClick} data-testid="grid-cell">
			{children}
		</td>
	)
}))

jest.mock('usehooks-ts', () => ({
	useHover: jest.fn()
}))

import { useHover } from 'usehooks-ts'

describe('CompositeRow', () => {
	const defaultProps = {
		children: <td>Test Content</td>
	}

	beforeEach(() => {
		jest.clearAllMocks()
		useHover.mockReturnValue(false)
	})

	test('renders main row with children', () => {
		render(<CompositeRow {...defaultProps} />)
		
		expect(screen.getByTestId('ref-row')).toBeInTheDocument()
		expect(screen.getByText('Test Content')).toBeInTheDocument()
	})

	test('renders with custom className', () => {
		render(<CompositeRow {...defaultProps} className="custom-class" />)
		
		const refRow = screen.getByTestId('ref-row')
		expect(refRow).toHaveClass('custom-class')
	})

	test('applies active className when focused', () => {
		useHover.mockReturnValue(true)
		render(<CompositeRow {...defaultProps} activeClassName="row-active" />)
		
		const refRow = screen.getByTestId('ref-row')
		expect(refRow).toHaveClass('row-active')
	})

	test('renders collapse cell when collapsible and not using custom cell', () => {
		render(<CompositeRow {...defaultProps} isCollapsible={true} isUseCustomCollapseCell={false} />)
		
		expect(screen.getByTestId('grid-cell')).toBeInTheDocument()
		expect(screen.getByTestId('grid-cell')).toHaveClass('center-align', 'cell-collapse')
	})

	test('does not render collapse cell when not collapsible', () => {
		render(<CompositeRow {...defaultProps} isCollapsible={false} />)
		
		expect(screen.queryByTestId('grid-cell')).not.toBeInTheDocument()
	})

	test('does not render collapse cell when using custom collapse cell', () => {
		render(<CompositeRow {...defaultProps} isCollapsible={true} isUseCustomCollapseCell={true} />)
		
		expect(screen.queryByTestId('grid-cell')).not.toBeInTheDocument()
	})

	test('shows plus icon when collapsed', () => {
		render(<CompositeRow {...defaultProps} isCollapsible={true} />)
		
		const iconElement = screen.getByTestId('grid-cell').querySelector('.icon-collapse span')
		expect(iconElement).toHaveClass('icon', 'icon-lap-plus')
	})

	test('shows minus icon when expanded', () => {
		render(<CompositeRow {...defaultProps} isCollapsible={true} />)
		
		const collapseCell = screen.getByTestId('grid-cell')
		fireEvent.click(collapseCell)
		
		const iconElement = collapseCell.querySelector('.icon-collapse span')
		expect(iconElement).toHaveClass('icon', 'icon-lap-minus')
	})

	test('toggles collapse state when collapse cell clicked', () => {
		const mockOnExpanded = jest.fn()
		const mockOnCollapsed = jest.fn()
		
		render(
			<CompositeRow 
				{...defaultProps} 
				isCollapsible={true} 
				onExpanded={mockOnExpanded}
				onCollapsed={mockOnCollapsed}
			/>
		)
		
		const collapseCell = screen.getByTestId('grid-cell')
		
		fireEvent.click(collapseCell)
		expect(mockOnExpanded).toHaveBeenCalled()
		
		fireEvent.click(collapseCell)
		expect(mockOnCollapsed).toHaveBeenCalled()
	})

	test('renders expand rows when expanded and has expand rows', () => {
		const expandRows = [
			<td key="1">Expand Row 1</td>,
			<td key="2">Expand Row 2</td>
		]
		
		render(<CompositeRow {...defaultProps} isCollapsible={true} expandRows={expandRows} />)
		
		const collapseCell = screen.getByTestId('grid-cell')
		fireEvent.click(collapseCell)
		
		expect(screen.getByTestId('collapse-row-0')).toBeInTheDocument()
		expect(screen.getByTestId('collapse-row-1')).toBeInTheDocument()
		expect(screen.getByText('Expand Row 1')).toBeInTheDocument()
		expect(screen.getByText('Expand Row 2')).toBeInTheDocument()
	})

	test('does not render expand rows when collapsed', () => {
		const expandRows = [<td key="1">Expand Row 1</td>]
		
		render(<CompositeRow {...defaultProps} isCollapsible={true} expandRows={expandRows} />)
		
		expect(screen.queryByTestId('collapse-row-0')).not.toBeInTheDocument()
		expect(screen.queryByText('Expand Row 1')).not.toBeInTheDocument()
	})

	test('uses custom hover row when specified', () => {
		render(<CompositeRow {...defaultProps} isUseCustomHoverRow={true} />)
		
		expect(screen.queryByTestId('ref-row')).not.toBeInTheDocument()
		expect(screen.getByText('Test Content')).toBeInTheDocument()
	})

	test('handles empty expand rows', () => {
		render(<CompositeRow {...defaultProps} isCollapsible={true} expandRows={[]} />)
		
		const collapseCell = screen.getByTestId('grid-cell')
		fireEvent.click(collapseCell)
		
		expect(screen.queryByTestId(/collapse-row/)).not.toBeInTheDocument()
	})

	test('applies collapse row class to expand rows', () => {
		const expandRows = [<td key="1">Expand Row 1</td>]
		
		render(
			<CompositeRow 
				{...defaultProps} 
				isCollapsible={true} 
				expandRows={expandRows}
				collapaseRowClass="custom-collapse"
			/>
		)
		
		const collapseCell = screen.getByTestId('grid-cell')
		fireEvent.click(collapseCell)
		
		const collapseRow = screen.getByTestId('collapse-row-0')
		expect(collapseRow).toHaveClass('collapse-row', 'custom-collapse')
	})

	test('component is memoized', () => {
		expect(CompositeRow.$$typeof).toBeDefined()
	})
})
