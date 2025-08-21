import React from 'react'
import { render, screen } from '@testing-library/react'
import NoDataTitle from '@/components/NoDataTitle'

// Mock langHelper
jest.mock('@/helpers/langHelper', () => ({
	__esModule: true,
	default: {
		getSingleResource: jest.fn((key) => `mocked_${key}`)
	}
}))

// Get the actual mock function
const langHelper = require('@/helpers/langHelper').default

describe('NoDataTitle', () => {
	beforeEach(() => {
		langHelper.getSingleResource.mockClear()
	})

	test('renders with custom title', () => {
		render(<NoDataTitle title="Custom No Data Message" />)
		
		const element = screen.getByText('Custom No Data Message')
		expect(element).toBeInTheDocument()
		expect(element).toHaveClass('no-info-row', 'center-align')
		expect(element.tagName).toBe('P')
	})

	test('renders with default title from langHelper when no title provided', () => {
		render(<NoDataTitle />)
		
		const element = screen.getByText('mocked_NoInfo')
		expect(element).toBeInTheDocument()
		expect(langHelper.getSingleResource).toHaveBeenCalledWith('NoInfo')
	})

	test('renders with empty title', () => {
		render(<NoDataTitle title="" />)
		
		const element = screen.getByText('mocked_NoInfo')
		expect(element).toBeInTheDocument()
		expect(element).toHaveClass('no-info-row', 'center-align')
		expect(langHelper.getSingleResource).toHaveBeenCalledWith('NoInfo')
	})

	test('renders HTML content using dangerouslySetInnerHTML', () => {
		render(<NoDataTitle title="<strong>Bold Text</strong>" />)
		
		const element = screen.getByText('Bold Text')
		expect(element.tagName).toBe('STRONG')
		expect(element.parentElement).toHaveClass('no-info-row', 'center-align')
	})

	test('handles null title gracefully', () => {
		render(<NoDataTitle title={null} />)
		
		const element = screen.getByText('mocked_NoInfo')
		expect(element).toBeInTheDocument()
		expect(langHelper.getSingleResource).toHaveBeenCalledWith('NoInfo')
	})

	test('handles undefined title gracefully', () => {
		render(<NoDataTitle title={undefined} />)
		
		const element = screen.getByText('mocked_NoInfo')
		expect(element).toBeInTheDocument()
		expect(langHelper.getSingleResource).toHaveBeenCalledWith('NoInfo')
	})

	test('applies correct CSS classes', () => {
		render(<NoDataTitle title="Test Message" />)
		
		const element = screen.getByText('Test Message')
		expect(element).toHaveClass('no-info-row')
		expect(element).toHaveClass('center-align')
		expect(element).toHaveAttribute('class', 'no-info-row center-align')
	})
})
