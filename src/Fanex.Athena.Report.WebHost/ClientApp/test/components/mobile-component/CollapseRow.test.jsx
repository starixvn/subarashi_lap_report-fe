import React from 'react'
import { render, screen } from '@testing-library/react'
import CollapseRow from '@/components/mobile-component/CollapseRow'

jest.mock('@/components/mobile-component/RefRow', () => {
	const { forwardRef } = require('react')
	return forwardRef(function MockRefRow({ children, className }, ref) {
		return (
			<div ref={ref} className={className} data-testid="ref-row">
				{children}
			</div>
		)
	})
})

jest.mock('usehooks-ts', () => ({
	useHover: jest.fn()
}))

import { useHover } from 'usehooks-ts'

describe('CollapseRow', () => {
	const defaultProps = {
		children: <div>Test Content</div>,
		onFocus: jest.fn(),
		index: 1
	}

	beforeEach(() => {
		jest.clearAllMocks()
		useHover.mockReturnValue(false)
	})

	test('renders children with RefRow when not using custom collapse row', () => {
		render(<CollapseRow {...defaultProps} />)
		
		expect(screen.getByTestId('ref-row')).toBeInTheDocument()
		expect(screen.getByText('Test Content')).toBeInTheDocument()
	})

	test('renders children directly when using custom collapse row', () => {
		render(<CollapseRow {...defaultProps} isUseCumtomCollapseRow={true} />)
		
		expect(screen.queryByTestId('ref-row')).not.toBeInTheDocument()
		expect(screen.getByText('Test Content')).toBeInTheDocument()
	})

	test('applies default props correctly', () => {
		render(<CollapseRow {...defaultProps} />)
		
		const refRow = screen.getByTestId('ref-row')
		expect(refRow).not.toHaveClass('row-active')
	})

	test('applies row-active class when isFocus is true', () => {
		render(<CollapseRow {...defaultProps} isFocus={true} />)
		
		const refRow = screen.getByTestId('ref-row')
		expect(refRow).toHaveClass('row-active')
	})

	test('applies custom className', () => {
		render(<CollapseRow {...defaultProps} className="custom-class" />)
		
		const refRow = screen.getByTestId('ref-row')
		expect(refRow).toHaveClass('custom-class')
	})

	test('combines focus and custom classes', () => {
		render(<CollapseRow {...defaultProps} isFocus={true} className="custom-class" />)
		
		const refRow = screen.getByTestId('ref-row')
		expect(refRow).toHaveClass('row-active', 'custom-class')
	})

	test('calls onFocus when hover state changes from false to true', () => {
		const mockOnFocus = jest.fn()
		useHover.mockReturnValue(true)
		
		render(<CollapseRow {...defaultProps} onFocus={mockOnFocus} index={5} />)
		
		expect(mockOnFocus).toHaveBeenCalledWith(5, true)
	})

	test('calls onFocus when hover state changes from true to false', () => {
		const mockOnFocus = jest.fn()
		
		const { rerender } = render(<CollapseRow {...defaultProps} onFocus={mockOnFocus} index={3} />)
		
		useHover.mockReturnValue(true)
		rerender(<CollapseRow {...defaultProps} onFocus={mockOnFocus} index={3} />)
		
		useHover.mockReturnValue(false)
		rerender(<CollapseRow {...defaultProps} onFocus={mockOnFocus} index={3} />)
		
		expect(mockOnFocus).toHaveBeenCalledWith(3, false)
	})

	test('does not call onFocus when hover state remains the same', () => {
		const mockOnFocus = jest.fn()
		useHover.mockReturnValue(false)
		
		const { rerender } = render(<CollapseRow {...defaultProps} onFocus={mockOnFocus} />)
		
		mockOnFocus.mockClear()
		
		rerender(<CollapseRow {...defaultProps} onFocus={mockOnFocus} />)
		
		expect(mockOnFocus).not.toHaveBeenCalled()
	})

	test('handles missing onFocus prop gracefully', () => {
		useHover.mockReturnValue(false)
		
		render(<CollapseRow {...defaultProps} onFocus={undefined} />)
		
		expect(screen.getByTestId('ref-row')).toBeInTheDocument()
	})

	test('uses default index when not provided', () => {
		const mockOnFocus = jest.fn()
		useHover.mockReturnValue(true)
		
		const { index, ...propsWithoutIndex } = defaultProps
		render(<CollapseRow {...propsWithoutIndex} onFocus={mockOnFocus} />)
		
		expect(mockOnFocus).toHaveBeenCalledWith(0, true)
	})

	test('renders with complex children', () => {
		const complexChildren = (
			<div>
				<span>Title</span>
				<button>Action</button>
			</div>
		)
		
		render(<CollapseRow {...defaultProps}>{complexChildren}</CollapseRow>)
		
		expect(screen.getByText('Title')).toBeInTheDocument()
		expect(screen.getByText('Action')).toBeInTheDocument()
	})

	test('maintains ref for hover detection', () => {
		const { container } = render(<CollapseRow {...defaultProps} />)
		
		const refRow = screen.getByTestId('ref-row')
		expect(refRow).toBeInTheDocument()
		
		expect(useHover).toHaveBeenCalledWith(expect.objectContaining({
			current: refRow
		}))
	})
})
