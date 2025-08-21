import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ActionCell from '@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/customGrid/ActionCell'

describe('ActionCell', () => {
	test('renders edit button when not in edit mode', () => {
		const mockOnEditClick = jest.fn()
		const mockOnCloseClick = jest.fn()
		
		render(
			<ActionCell 
				isEdited={false} 
				onEditClick={mockOnEditClick} 
				onCloseClick={mockOnCloseClick} 
			/>
		)
		
		const buttons = screen.getAllByRole('button')
		const editIcon = document.querySelector('.icon-edit')
		const closeIcon = document.querySelector('.icon-close')
		
		expect(buttons).toHaveLength(2)
		expect(editIcon).toBeInTheDocument()
		expect(closeIcon).toBeInTheDocument()
		expect(document.querySelector('.icon-save')).not.toBeInTheDocument()
	})

	test('renders save button when in edit mode', () => {
		const mockOnSaveClick = jest.fn()
		const mockOnCloseClick = jest.fn()
		
		render(
			<ActionCell 
				isEdited={true} 
				onSaveClick={mockOnSaveClick} 
				onCloseClick={mockOnCloseClick} 
			/>
		)
		
		const saveIcon = document.querySelector('.icon-save')
		const closeIcon = document.querySelector('.icon-close')
		
		expect(saveIcon).toBeInTheDocument()
		expect(closeIcon).toBeInTheDocument()
		expect(document.querySelector('.icon-edit')).not.toBeInTheDocument()
	})

	test('calls onEditClick when edit button is clicked', () => {
		const mockOnEditClick = jest.fn()
		const mockOnCloseClick = jest.fn()
		
		render(
			<ActionCell 
				isEdited={false} 
				onEditClick={mockOnEditClick} 
				onCloseClick={mockOnCloseClick} 
			/>
		)
		
		const buttons = screen.getAllByRole('button')
		const editButton = buttons[0]
		
		fireEvent.click(editButton)
		expect(mockOnEditClick).toHaveBeenCalledTimes(1)
	})

	test('calls onSaveClick when save button is clicked', () => {
		const mockOnSaveClick = jest.fn()
		const mockOnCloseClick = jest.fn()
		
		render(
			<ActionCell 
				isEdited={true} 
				onSaveClick={mockOnSaveClick} 
				onCloseClick={mockOnCloseClick} 
			/>
		)
		
		const buttons = screen.getAllByRole('button')
		const saveButton = buttons[0]
		
		fireEvent.click(saveButton)
		expect(mockOnSaveClick).toHaveBeenCalledTimes(1)
	})

	test('calls onCloseClick when close button is clicked', () => {
		const mockOnCloseClick = jest.fn()
		
		render(
			<ActionCell 
				isEdited={false} 
				onCloseClick={mockOnCloseClick} 
			/>
		)
		
		const buttons = screen.getAllByRole('button')
		const closeButton = buttons[1]
		
		fireEvent.click(closeButton)
		expect(mockOnCloseClick).toHaveBeenCalledTimes(1)
	})

	test('renders with default props', () => {
		render(<ActionCell />)
		
		const editIcon = document.querySelector('.icon-edit')
		const closeIcon = document.querySelector('.icon-close')
		
		expect(editIcon).toBeInTheDocument()
		expect(closeIcon).toBeInTheDocument()
	})

	test('applies correct styles to buttons', () => {
		render(<ActionCell isEdited={false} />)
		
		const buttons = screen.getAllByRole('button')
		buttons.forEach(button => {
			expect(button).toHaveClass('waves-effect', 'waves-light', 'btn')
			expect(button).toHaveStyle({
				padding: '0 8px',
				height: '24px',
				lineHeight: '24px',
				marginRight: '8px',
				minWidth: '0'
			})
		})
	})

	test('applies correct styles to icons', () => {
		const { rerender } = render(<ActionCell isEdited={false} />)
		
		const editIcon = document.querySelector('.icon-edit')
		expect(editIcon).toHaveStyle({
			fontSize: '14px',
			lineHeight: '24px',
			color: '#cc0000'
		})
		
		rerender(<ActionCell isEdited={true} />)
		
		const saveIcon = document.querySelector('.icon-save')
		expect(saveIcon).toHaveStyle({
			fontSize: '14px',
			lineHeight: '24px',
			color: '#cc0000'
		})
		
		const closeIcon = document.querySelector('.icon-close')
		expect(closeIcon).toHaveStyle({
			fontSize: '14px',
			lineHeight: '24px',
			color: '#cc0000'
		})
	})

	test('handles missing callback props gracefully', () => {
		expect(() => {
			render(<ActionCell isEdited={false} />)
			
			const buttons = screen.getAllByRole('button')
			fireEvent.click(buttons[0])
			fireEvent.click(buttons[1])
		}).not.toThrow()
	})
})
