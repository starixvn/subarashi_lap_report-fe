import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ExportExcel from '@/components/ExportExcel'

// Mock LangHelper
jest.mock('@/helpers/langHelper', () => ({
	getSingleResource: jest.fn(() => 'Export to Excel')
}))

describe('ExportExcel', () => {
	const getIcon = () => document.getElementById('ExportToExcel')

	test('renders with default props', () => {
		render(<ExportExcel />)
		
		const icon = getIcon()
		expect(icon).toBeInTheDocument()
		expect(icon).toHaveAttribute('id', 'ExportToExcel')
		expect(icon).toHaveClass('icon-excel', 'right')
		expect(icon).toHaveAttribute('title', 'Export to Excel')
	})

	test('applies custom className', () => {
		render(<ExportExcel className="custom-excel-icon" />)
		
		const icon = getIcon()
		expect(icon).toHaveClass('custom-excel-icon')
	})

	test('calls onClick when clicked and not disabled', () => {
		const mockOnClick = jest.fn()
		render(<ExportExcel onClick={mockOnClick} disabled={false} />)
		
		const icon = getIcon()
		fireEvent.click(icon)
		
		expect(mockOnClick).toHaveBeenCalledTimes(1)
	})

	test('does not call onClick when disabled', () => {
		const mockOnClick = jest.fn()
		render(<ExportExcel onClick={mockOnClick} disabled={true} />)
		
		const icon = getIcon()
		fireEvent.click(icon)
		
		expect(mockOnClick).not.toHaveBeenCalled()
	})

	test('handles missing onClick prop gracefully', () => {
		render(<ExportExcel />)
		
		const icon = getIcon()
		
		// Should not throw error when clicking without onClick prop
		expect(() => {
			fireEvent.click(icon)
		}).not.toThrow()
	})

	test('works with disabled false', () => {
		const mockOnClick = jest.fn()
		render(<ExportExcel onClick={mockOnClick} disabled={false} />)
		
		const icon = getIcon()
		fireEvent.click(icon)
		
		expect(mockOnClick).toHaveBeenCalledTimes(1)
	})

	test('works with disabled true', () => {
		const mockOnClick = jest.fn()
		render(<ExportExcel onClick={mockOnClick} disabled={true} />)
		
		const icon = getIcon()
		fireEvent.click(icon)
		
		expect(mockOnClick).not.toHaveBeenCalled()
	})
})