import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Popup from '@/components/Popup'

describe('Popup', () => {
	test('renders with default props', () => {
		render(<Popup />)
		
		const container = document.querySelector('.popup-container')
		expect(container).toBeInTheDocument()
		expect(container).toHaveClass('popup-container', '', 'hide')
		
		const content = document.querySelector('.popup-content')
		expect(content).toBeInTheDocument()
	})

	test('shows popup when isShow is true', () => {
		render(<Popup isShow={true} />)
		
		const container = document.querySelector('.popup-container')
		expect(container).toHaveClass('show')
		expect(container).not.toHaveClass('hide')
	})

	test('hides popup when isShow is false', () => {
		render(<Popup isShow={false} />)
		
		const container = document.querySelector('.popup-container')
		expect(container).toHaveClass('hide')
		expect(container).not.toHaveClass('show')
	})

	test('renders title', () => {
		render(<Popup title="Test Title" />)
		
		expect(screen.getByText('Test Title')).toBeInTheDocument()
		
		const titleElement = document.querySelector('.txt-title')
		expect(titleElement).toHaveTextContent('Test Title')
	})

	test('renders children content', () => {
		render(
			<Popup>
				<div>Test Content</div>
			</Popup>
		)
		
		expect(screen.getByText('Test Content')).toBeInTheDocument()
	})

	test('renders HTML content when isHtml is true', () => {
		const htmlContent = '<p>HTML <strong>Content</strong></p>'
		render(<Popup isHtml={true}>{htmlContent}</Popup>)
		
		const content = document.querySelector('.popup-content')
		expect(content.innerHTML).toBe(htmlContent)
	})

	test('renders iframe when iframeUrl is provided', () => {
		render(<Popup iframeUrl="https://example.com" />)
		
		const iframe = document.querySelector('iframe')
		expect(iframe).toBeInTheDocument()
		expect(iframe).toHaveAttribute('src', 'https://example.com')
		expect(iframe).toHaveAttribute('width', '100%')
		expect(iframe).toHaveAttribute('height', '100%')
	})

	test('prioritizes iframe over other content', () => {
		render(
			<Popup iframeUrl="https://example.com" isHtml={true}>
				<div>This should not render</div>
			</Popup>
		)
		
		const iframe = document.querySelector('iframe')
		expect(iframe).toBeInTheDocument()
		
		expect(screen.queryByText('This should not render')).not.toBeInTheDocument()
	})

	test('applies custom className', () => {
		render(<Popup className="custom-popup" />)
		
		const popup = document.querySelector('.flat-popup')
		expect(popup).toHaveClass('flat-popup', 'custom-popup')
	})

	test('applies custom containerClassName', () => {
		render(<Popup containerClassName="custom-container" />)
		
		const container = document.querySelector('.popup-container')
		expect(container).toHaveClass('popup-container', 'custom-container')
	})

	test('applies custom contentClassName', () => {
		render(<Popup contentClassName="custom-content" />)
		
		const content = document.querySelector('.popup-content')
		expect(content).toHaveClass('popup-content', 'custom-content')
	})

	test('calls onClose when close button is clicked', () => {
		const mockOnClose = jest.fn()
		render(<Popup onClose={mockOnClose} />)
		
		const closeButton = document.querySelector('.popup-close')
		fireEvent.click(closeButton)
		
		expect(mockOnClose).toHaveBeenCalledTimes(1)
	})

	test('calls onClick when container is clicked', () => {
		const mockOnClick = jest.fn()
		render(<Popup onClick={mockOnClick} />)
		
		const container = document.querySelector('.popup-container')
		fireEvent.click(container)
		
		expect(mockOnClick).toHaveBeenCalledTimes(1)
	})

	test('does not call onClose when onClose is not provided', () => {
		render(<Popup />)
		
		const closeButton = document.querySelector('.popup-close')
		
		expect(() => {
			fireEvent.click(closeButton)
		}).not.toThrow()
	})

	test('renders close icon', () => {
		render(<Popup />)
		
		const closeIcon = document.querySelector('.icon-close')
		expect(closeIcon).toBeInTheDocument()
		
		const closeButton = document.querySelector('.popup-close')
		expect(closeButton).toContainElement(closeIcon)
	})

	test('renders popup structure correctly', () => {
		render(<Popup title="Test" />)
		
		const container = document.querySelector('.popup-container')
		const blockBody = container.querySelector('.popup-block-body')
		const popup = container.querySelector('.flat-popup')
		const title = popup.querySelector('.popup-title')
		const content = popup.querySelector('.popup-content')
		
		expect(blockBody).toBeInTheDocument()
		expect(popup).toBeInTheDocument()
		expect(title).toBeInTheDocument()
		expect(content).toBeInTheDocument()
	})

	test('handles undefined className gracefully', () => {
		render(<Popup className={undefined} />)
		
		const popup = document.querySelector('.flat-popup')
		expect(popup).toHaveClass('flat-popup')
		expect(popup.className).toBe('flat-popup ')
	})

	test('handles null iframeUrl', () => {
		render(<Popup iframeUrl={null}>Content</Popup>)
		
		expect(screen.getByText('Content')).toBeInTheDocument()
		expect(document.querySelector('iframe')).not.toBeInTheDocument()
	})

	test('renders normal content when isHtml is false', () => {
		render(
			<Popup isHtml={false}>
				<div data-testid="react-content">React Content</div>
			</Popup>
		)
		
		expect(screen.getByTestId('react-content')).toBeInTheDocument()
		
		const content = document.querySelector('.popup-content')
		expect(content.innerHTML).not.toContain('dangerouslySetInnerHTML')
	})

	test('applies empty string classes correctly', () => {
		render(
			<Popup 
				className="" 
				containerClassName="" 
				contentClassName=""
			/>
		)
		
		const container = document.querySelector('.popup-container')
		const popup = document.querySelector('.flat-popup')
		const content = document.querySelector('.popup-content')
		
		expect(container).toHaveClass('popup-container')
		expect(popup).toHaveClass('flat-popup')
		expect(content).toHaveClass('popup-content')
	})
})