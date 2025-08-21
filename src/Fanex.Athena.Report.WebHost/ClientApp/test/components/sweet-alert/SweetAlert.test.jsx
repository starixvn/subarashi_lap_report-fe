import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SweetAlert from '@/components/sweet-alert/index'

// Mock the Popup component
jest.mock('@/components/Popup', () => ({ children, isShow, isHtml, title, onClose, className, ...props }) => (
	<div 
		data-testid="popup" 
		className={className}
		data-is-show={isShow}
		data-is-html={isHtml}
		data-title={title}
		data-has-onclose={!!onClose}
		{...props}
	>
		{children}
	</div>
))

describe('SweetAlert', () => {
	const defaultProps = {
		isShow: true,
		title: 'Test Alert',
		buttons: [
			{ text: 'OK', onClick: jest.fn() },
			{ text: 'Cancel', onClick: jest.fn() }
		]
	}

	test('renders sweet alert with default props', () => {
		render(<SweetAlert />)
		
		const sweetAlert = screen.getByTestId('popup').closest('.sweet-alert')
		expect(sweetAlert).toBeInTheDocument()
	})

	test('renders with title and buttons', () => {
		render(<SweetAlert {...defaultProps} />)
		
		expect(screen.getByTestId('popup')).toBeInTheDocument()
		expect(screen.getByText('OK')).toBeInTheDocument()
		expect(screen.getByText('Cancel')).toBeInTheDocument()
	})

	test('renders error icon correctly', () => {
		render(<SweetAlert {...defaultProps} icon="error" />)
		
		const iconElement = document.querySelector('.swal-icon.swal-icon--error')
		expect(iconElement).toBeInTheDocument()
	})

	test('renders warning icon correctly', () => {
		render(<SweetAlert {...defaultProps} icon="warning" />)
		
		const iconElement = document.querySelector('.swal-icon.swal-icon--warning')
		expect(iconElement).toBeInTheDocument()
	})

	test('renders success icon correctly', () => {
		render(<SweetAlert {...defaultProps} icon="success" />)
		
		const iconElement = document.querySelector('.swal-icon.swal-icon--success')
		expect(iconElement).toBeInTheDocument()
	})

	test('does not render icon for unknown icon type', () => {
		render(<SweetAlert {...defaultProps} icon="unknown" />)
		
		const iconElement = document.querySelector('.swal-icon')
		expect(iconElement).not.toBeInTheDocument()
	})

	test('does not render icon when icon prop is not provided', () => {
		render(<SweetAlert {...defaultProps} />)
		
		const iconElement = document.querySelector('.swal-icon')
		expect(iconElement).not.toBeInTheDocument()
	})

	test('renders info icon (no markup)', () => {
		render(<SweetAlert {...defaultProps} icon="info" />)
		
		const iconElement = document.querySelector('.swal-icon.swal-icon--info')
		expect(iconElement).toBeInTheDocument()
		expect(iconElement.innerHTML).toBe('')
	})

	test('renders button group correctly', () => {
		const buttons = [
			{ text: 'Confirm', className: 'btn-primary', onClick: jest.fn() },
			{ text: 'Cancel', className: 'btn-secondary', onClick: jest.fn() }
		]
		
		render(<SweetAlert {...defaultProps} buttons={buttons} />)
		
		const buttonContainer = document.querySelector('.al-button-container')
		expect(buttonContainer).toBeInTheDocument()
		
		const confirmButton = screen.getByText('Confirm')
		const cancelButton = screen.getByText('Cancel')
		
		expect(confirmButton).toBeInTheDocument()
		expect(cancelButton).toBeInTheDocument()
		expect(confirmButton).toHaveClass('btn-primary')
		expect(cancelButton).toHaveClass('btn-secondary')
	})

	test('handles button click events', () => {
		const mockClick = jest.fn()
		const buttons = [{ text: 'Click Me', onClick: mockClick }]
		
		render(<SweetAlert {...defaultProps} buttons={buttons} />)
		
		const button = screen.getByText('Click Me')
		fireEvent.click(button)
		
		expect(mockClick).toHaveBeenCalledTimes(1)
	})

	test('renders with custom children', () => {
		render(
			<SweetAlert {...defaultProps}>
				<p>Custom content</p>
				<div>More content</div>
			</SweetAlert>
		)
		
		expect(screen.getByText('Custom content')).toBeInTheDocument()
		expect(screen.getByText('More content')).toBeInTheDocument()
	})

	test('passes props to Popup component', () => {
		render(
			<SweetAlert
				{...defaultProps}
				className="custom-class"
				onClose={jest.fn()}
				isHtml={true}
			/>
		)
		
		const popup = screen.getByTestId('popup')
		expect(popup).toHaveClass('custom-class')
		expect(popup).toHaveAttribute('data-is-html', 'true')
		expect(popup).toHaveAttribute('data-has-onclose', 'true')
	})

	test('filters out buttons prop from Popup', () => {
		render(<SweetAlert {...defaultProps} />)
		
		const popup = screen.getByTestId('popup')
		expect(popup).not.toHaveAttribute('buttons')
	})

	test('filters out icon prop from Popup', () => {
		render(<SweetAlert {...defaultProps} icon="error" />)
		
		const popup = screen.getByTestId('popup')
		expect(popup).not.toHaveAttribute('icon')
	})

	test('renders empty button container when no buttons provided', () => {
		render(<SweetAlert {...defaultProps} buttons={[]} />)
		
		const buttonContainer = document.querySelector('.al-button-container')
		expect(buttonContainer).toBeInTheDocument()
		expect(buttonContainer.children).toHaveLength(0)
	})

	test('handles buttons with additional attributes', () => {
		const buttons = [
			{
				text: 'Submit',
				type: 'submit',
				disabled: true,
				'data-testid': 'submit-btn'
			}
		]
		
		render(<SweetAlert {...defaultProps} buttons={buttons} />)
		
		const button = screen.getByTestId('submit-btn')
		expect(button).toHaveAttribute('type', 'submit')
		expect(button).toBeDisabled()
	})

	test('renders multiple buttons in correct order', () => {
		const buttons = [
			{ text: 'First' },
			{ text: 'Second' },
			{ text: 'Third' }
		]
		
		render(<SweetAlert {...defaultProps} buttons={buttons} />)
		
		const buttonContainer = document.querySelector('.al-button-container')
		const buttons_ = buttonContainer.querySelectorAll('button')
		
		expect(buttons_).toHaveLength(3)
		expect(buttons_[0]).toHaveTextContent('First')
		expect(buttons_[1]).toHaveTextContent('Second')
		expect(buttons_[2]).toHaveTextContent('Third')
	})

	test('uses default props correctly', () => {
		render(<SweetAlert />)
		
		const popup = screen.getByTestId('popup')
		expect(popup).toHaveClass('sweet-alert-popup')
		expect(popup).toHaveAttribute('data-is-show', 'false')
		expect(popup).toHaveAttribute('data-is-html', 'false')
		expect(popup).toHaveAttribute('data-title', '')
		
		const buttonContainer = document.querySelector('.al-button-container')
		expect(buttonContainer.children).toHaveLength(0)
	})
})
