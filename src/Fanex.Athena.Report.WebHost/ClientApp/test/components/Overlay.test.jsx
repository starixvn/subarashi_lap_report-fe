import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Overlay from '@/components/Overlay'

describe('Overlay', () => {
	beforeEach(() => {
		// Clean up any event listeners
		document.removeEventListener('click', jest.fn())
	})

	test('renders children when open', () => {
		render(
			<Overlay isOpening={true}>
				<div>Overlay Content</div>
			</Overlay>
		)
		
		expect(screen.getByText('Overlay Content')).toBeInTheDocument()
	})

	test('applies correct CSS classes when closed', () => {
		render(
			<Overlay isOpening={false}>
				<div>Content</div>
			</Overlay>
		)
		
		const overlay = screen.getByText('Content').parentElement
		expect(overlay).toHaveClass('overlay')
		expect(overlay).not.toHaveClass('overlay-open')
	})

	test('applies correct CSS classes when open', () => {
		render(
			<Overlay isOpening={true}>
				<div>Content</div>
			</Overlay>
		)
		
		const overlay = screen.getByText('Content').parentElement
		expect(overlay).toHaveClass('overlay', 'overlay-open')
	})

	test('applies correct inline styles when closed', () => {
		render(
			<Overlay isOpening={false}>
				<div>Content</div>
			</Overlay>
		)
		
		const overlay = screen.getByText('Content').parentElement
		expect(overlay).toHaveStyle({ display: 'none' })
	})

	test('applies correct inline styles when open', () => {
		render(
			<Overlay isOpening={true}>
				<div>Content</div>
			</Overlay>
		)
		
		const overlay = screen.getByText('Content').parentElement
		expect(overlay).toHaveStyle({ display: 'block' })
	})

	test('calls onOpen when opening', async () => {
		const mockOnOpen = jest.fn()
		
		const { rerender } = render(
			<Overlay isOpening={false} onOpen={mockOnOpen}>
				<div>Content</div>
			</Overlay>
		)
		
		rerender(
			<Overlay isOpening={true} onOpen={mockOnOpen}>
				<div>Content</div>
			</Overlay>
		)
		
		await waitFor(() => {
			expect(mockOnOpen).toHaveBeenCalledTimes(1)
		})
	})

	test('calls onClose when closing', async () => {
		const mockOnClose = jest.fn()
		
		const { rerender } = render(
			<Overlay isOpening={true} onClose={mockOnClose}>
				<div>Content</div>
			</Overlay>
		)
		
		rerender(
			<Overlay isOpening={false} onClose={mockOnClose}>
				<div>Content</div>
			</Overlay>
		)
		
		await waitFor(() => {
			expect(mockOnClose).toHaveBeenCalledTimes(1)
		})
	})

	test('handles outside click when closeOnOutsideClick is true', async () => {
		const mockOnClose = jest.fn()
		
		render(
			<Overlay isOpening={true} closeOnOutsideClick={true} onClose={mockOnClose}>
				<div data-testid="overlay-content">Content</div>
			</Overlay>
		)
		
		// Click outside the overlay
		fireEvent.click(document.body)
		
		await waitFor(() => {
			expect(mockOnClose).toHaveBeenCalledTimes(1)
		})
	})

	test('does not close on inside click', async () => {
		const mockOnClose = jest.fn()
		
		render(
			<Overlay isOpening={true} closeOnOutsideClick={true} onClose={mockOnClose}>
				<div data-testid="overlay-content">Content</div>
			</Overlay>
		)
		
		// Click inside the overlay
		fireEvent.click(screen.getByTestId('overlay-content'))
		
		// Wait a bit to ensure no call happens
		await new Promise(resolve => setTimeout(resolve, 100))
		
		expect(mockOnClose).not.toHaveBeenCalled()
	})

	test('does not handle outside click when closeOnOutsideClick is false', async () => {
		const mockOnClose = jest.fn()
		
		render(
			<Overlay isOpening={true} closeOnOutsideClick={false} onClose={mockOnClose}>
				<div>Content</div>
			</Overlay>
		)
		
		// Click outside the overlay
		fireEvent.click(document.body)
		
		// Wait a bit to ensure no call happens
		await new Promise(resolve => setTimeout(resolve, 100))
		
		expect(mockOnClose).not.toHaveBeenCalled()
	})

	test('does not handle outside click when overlay is closed', async () => {
		const mockOnClose = jest.fn()
		
		render(
			<Overlay isOpening={false} closeOnOutsideClick={true} onClose={mockOnClose}>
				<div>Content</div>
			</Overlay>
		)
		
		// Click outside the overlay
		fireEvent.click(document.body)
		
		// Wait a bit to ensure no call happens
		await new Promise(resolve => setTimeout(resolve, 100))
		
		expect(mockOnClose).not.toHaveBeenCalled()
	})

	test('uses default props correctly', () => {
		render(
			<Overlay>
				<div>Content</div>
			</Overlay>
		)
		
		const overlay = screen.getByText('Content').parentElement
		expect(overlay).toHaveClass('overlay')
		expect(overlay).not.toHaveClass('overlay-open')
		expect(overlay).toHaveStyle({ display: 'none' })
	})

	test('cleans up event listeners on unmount', () => {
		const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')
		
		const { unmount } = render(
			<Overlay isOpening={true} closeOnOutsideClick={true}>
				<div>Content</div>
			</Overlay>
		)
		
		unmount()
		
		expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function))
		
		removeEventListenerSpy.mockRestore()
	})

	test('handles rapid open/close changes', async () => {
		const mockOnOpen = jest.fn()
		const mockOnClose = jest.fn()
		
		const { rerender } = render(
			<Overlay isOpening={false} onOpen={mockOnOpen} onClose={mockOnClose}>
				<div>Content</div>
			</Overlay>
		)
		
		// Rapidly change state
		rerender(
			<Overlay isOpening={true} onOpen={mockOnOpen} onClose={mockOnClose}>
				<div>Content</div>
			</Overlay>
		)
		
		rerender(
			<Overlay isOpening={false} onOpen={mockOnOpen} onClose={mockOnClose}>
				<div>Content</div>
			</Overlay>
		)
		
		await waitFor(() => {
			expect(mockOnOpen).toHaveBeenCalledTimes(1)
			expect(mockOnClose).toHaveBeenCalledTimes(1)
		})
	})

	test('maintains reference to container element', () => {
		render(
			<Overlay isOpening={true}>
				<div data-testid="content">Content</div>
			</Overlay>
		)
		
		const content = screen.getByTestId('content')
		const overlay = content.parentElement
		
		expect(overlay).toBeInTheDocument()
		expect(overlay.tagName).toBe('DIV')
	})
})

