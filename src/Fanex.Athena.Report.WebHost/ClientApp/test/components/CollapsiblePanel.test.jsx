import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CollapsiblePanel from '@/components/CollapsiblePanel'

// Mock window.dispatchEvent
const mockDispatchEvent = jest.fn()
Object.defineProperty(window, 'dispatchEvent', {
	value: mockDispatchEvent,
	writable: true
})

describe('CollapsiblePanel', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	test('renders with default props', () => {
		render(<CollapsiblePanel />)
		
		const container = document.querySelector('.page-filter')
		expect(container).toBeInTheDocument()
		expect(container).toHaveClass('page-filter', 'min')
	})

	test('renders children when provided', () => {
		render(
			<CollapsiblePanel>
				<div>Test Content</div>
			</CollapsiblePanel>
		)
		
		expect(screen.getByText('Test Content')).toBeInTheDocument()
		
		const container = document.querySelector('.page-filter')
		expect(container).not.toHaveClass('min')
	})

	test('renders default content when no children', () => {
		render(<CollapsiblePanel />)
		
		const defaultContent = screen.getByText('Extend Row')
		expect(defaultContent).toBeInTheDocument()
		expect(defaultContent).toHaveStyle({ opacity: '0' })
	})

	test('applies custom className', () => {
		render(<CollapsiblePanel className="custom-class" />)
		
		const container = document.querySelector('.page-filter')
		expect(container).toHaveClass('page-filter', 'custom-class', 'min')
	})

	test('shows collapse toggle when isCollapseMode is true', () => {
		render(<CollapsiblePanel isCollapseMode={true} />)
		
		const toggleHandle = document.querySelector('.filter-handle')
		expect(toggleHandle).toBeInTheDocument()
		
		const toggleIcon = document.querySelector('.icon-toggle')
		expect(toggleIcon).toBeInTheDocument()
	})

	test('hides collapse toggle when isCollapseMode is false', () => {
		render(<CollapsiblePanel isCollapseMode={false} />)
		
		const toggleHandle = document.querySelector('.filter-handle')
		expect(toggleHandle).not.toBeInTheDocument()
	})

	test('starts expanded by default', () => {
		render(
			<CollapsiblePanel>
				<div>Content</div>
			</CollapsiblePanel>
		)
		
		const content = screen.getByText('Content')
		expect(content.parentElement).toHaveStyle({ display: 'block' })
		
		const toggleIcon = document.querySelector('.icon-toggle')
		expect(toggleIcon).toHaveClass('collapsed')
	})

	test('starts collapsed when isInitCollapsed is true', () => {
		render(
			<CollapsiblePanel isInitCollapsed={true}>
				<div>Content</div>
			</CollapsiblePanel>
		)
		
		const content = screen.getByText('Content')
		expect(content.parentElement).toHaveStyle({ display: 'none' })
		
		const toggleIcon = document.querySelector('.icon-toggle')
		expect(toggleIcon).not.toHaveClass('collapsed')
	})

	test('toggles collapse state when clicked', () => {
		render(
			<CollapsiblePanel>
				<div>Content</div>
			</CollapsiblePanel>
		)
		
		const toggleHandle = document.querySelector('.filter-handle')
		const content = screen.getByText('Content')
		
		// Initially expanded
		expect(content.parentElement).toHaveStyle({ display: 'block' })
		
		// Click to collapse
		fireEvent.click(toggleHandle)
		expect(content.parentElement).toHaveStyle({ display: 'none' })
		
		// Click to expand
		fireEvent.click(toggleHandle)
		expect(content.parentElement).toHaveStyle({ display: 'block' })
	})

	test('calls onCollapse when collapsing', () => {
		const mockOnCollapse = jest.fn()
		render(
			<CollapsiblePanel onCollapse={mockOnCollapse}>
				<div>Content</div>
			</CollapsiblePanel>
		)
		
		const toggleHandle = document.querySelector('.filter-handle')
		fireEvent.click(toggleHandle)
		
		expect(mockOnCollapse).toHaveBeenCalledTimes(1)
	})

	test('calls onExpand when expanding', () => {
		const mockOnExpand = jest.fn()
		render(
			<CollapsiblePanel isInitCollapsed={true} onExpand={mockOnExpand}>
				<div>Content</div>
			</CollapsiblePanel>
		)
		
		const toggleHandle = document.querySelector('.filter-handle')
		fireEvent.click(toggleHandle)
		
		expect(mockOnExpand).toHaveBeenCalledTimes(1)
	})

	test('dispatches resize event when toggling', () => {
		render(
			<CollapsiblePanel>
				<div>Content</div>
			</CollapsiblePanel>
		)
		
		const toggleHandle = document.querySelector('.filter-handle')
		fireEvent.click(toggleHandle)
		
		expect(mockDispatchEvent).toHaveBeenCalledWith(expect.any(Event))
		expect(mockDispatchEvent.mock.calls[0][0].type).toBe('resize')
	})

	test('shows custom icon toggle when provided', () => {
		const customIcon = <div data-testid="custom-toggle">Custom Toggle</div>
		render(
			<CollapsiblePanel iconToggle={customIcon}>
				<div>Content</div>
			</CollapsiblePanel>
		)
		
		expect(screen.getByTestId('custom-toggle')).toBeInTheDocument()
		expect(document.querySelector('.filter-handle')).not.toBeInTheDocument()
	})

	test('handles isCustomCollapse mode', () => {
		render(
			<CollapsiblePanel isCustomCollapse={true} isInitCollapsed={true}>
				<div>Content</div>
			</CollapsiblePanel>
		)
		
		const content = screen.getByText('Content')
		// In custom collapse mode, display should always be 'block'
		expect(content.parentElement).toHaveStyle({ display: 'block' })
	})

	test('renders sticky footer', () => {
		const stickyFooter = <div data-testid="sticky-footer">Footer Content</div>
		render(<CollapsiblePanel stickyFooter={stickyFooter} />)
		
		expect(screen.getByTestId('sticky-footer')).toBeInTheDocument()
		
		const caretBlock = document.querySelector('.caret-block')
		expect(caretBlock).toBeInTheDocument()
	})

	test('applies min class to caret-block when no children', () => {
		render(<CollapsiblePanel />)
		
		const caretBlock = document.querySelector('.caret-block')
		expect(caretBlock).toHaveClass('min')
	})

	test('does not apply min class to caret-block when children exist', () => {
		render(
			<CollapsiblePanel>
				<div>Content</div>
			</CollapsiblePanel>
		)
		
		const caretBlock = document.querySelector('.caret-block')
		expect(caretBlock).not.toHaveClass('min')
	})

	test('icon changes class based on collapsed state', () => {
		render(
			<CollapsiblePanel>
				<div>Content</div>
			</CollapsiblePanel>
		)
		
		const toggleIcon = document.querySelector('.icon-toggle')
		const toggleHandle = document.querySelector('.filter-handle')
		
		// Initially expanded - should have 'collapsed' class
		expect(toggleIcon).toHaveClass('collapsed')
		
		// Click to collapse
		fireEvent.click(toggleHandle)
		expect(toggleIcon).not.toHaveClass('collapsed')
		
		// Click to expand again
		fireEvent.click(toggleHandle)
		expect(toggleIcon).toHaveClass('collapsed')
	})
})