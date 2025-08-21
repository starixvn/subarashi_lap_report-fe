import React from 'react'
import { render, screen } from '@testing-library/react'
import BetListPopupLayout from '@/components/BetListPopupLayout'

describe('BetListPopupLayout', () => {
	test('renders with title and children', () => {
		render(
			<BetListPopupLayout title="Test Title" className="test-class">
				<div>Test Content</div>
			</BetListPopupLayout>
		)
		
		expect(screen.getByText('Test Title')).toBeInTheDocument()
		expect(screen.getByText('Test Content')).toBeInTheDocument()
	})

	test('applies className to content div', () => {
		render(
			<BetListPopupLayout title="Test Title" className="custom-class">
				<div>Content</div>
			</BetListPopupLayout>
		)
		
		const contentDiv = screen.getByText('Content').parentElement
		expect(contentDiv).toHaveClass('custom-class')
	})

	test('renders without className', () => {
		render(
			<BetListPopupLayout title="Test Title">
				<div>Content</div>
			</BetListPopupLayout>
		)
		
		const contentDiv = screen.getByText('Content').parentElement
		expect(contentDiv).not.toHaveClass()
	})

	test('renders title as any prop type', () => {
		const { rerender } = render(
			<BetListPopupLayout title="String Title">
				<div>Content</div>
			</BetListPopupLayout>
		)
		
		expect(screen.getByText('String Title')).toBeInTheDocument()
		
		rerender(
			<BetListPopupLayout title={123}>
				<div>Content</div>
			</BetListPopupLayout>
		)
		
		expect(screen.getByText('123')).toBeInTheDocument()
		
		rerender(
			<BetListPopupLayout title={<span>JSX Title</span>}>
				<div>Content</div>
			</BetListPopupLayout>
		)
		
		expect(screen.getByText('JSX Title')).toBeInTheDocument()
	})

	test('renders with empty title', () => {
		render(
			<BetListPopupLayout title="">
				<div>Content</div>
			</BetListPopupLayout>
		)
		
		const captionDiv = screen.getByText('Content').parentElement.previousElementSibling
		expect(captionDiv).toHaveClass('caption')
		expect(captionDiv).toBeEmptyDOMElement()
	})

	test('renders without title prop', () => {
		render(
			<BetListPopupLayout>
				<div>Content</div>
			</BetListPopupLayout>
		)
		
		const captionDiv = screen.getByText('Content').parentElement.previousElementSibling
		expect(captionDiv).toHaveClass('caption')
	})

	test('renders multiple children', () => {
		render(
			<BetListPopupLayout title="Test Title">
				<div>First Child</div>
				<div>Second Child</div>
			</BetListPopupLayout>
		)
		
		expect(screen.getByText('First Child')).toBeInTheDocument()
		expect(screen.getByText('Second Child')).toBeInTheDocument()
	})

	test('has correct DOM structure', () => {
		render(
			<BetListPopupLayout title="Test Title" className="test-class">
				<div>Content</div>
			</BetListPopupLayout>
		)
		
		const container = screen.getByText('Test Title').parentElement
		expect(container).toHaveClass('popup-content-default')
		
		const caption = screen.getByText('Test Title')
		expect(caption).toHaveClass('caption')
		
		const contentDiv = screen.getByText('Content').parentElement
		expect(contentDiv).toHaveClass('test-class')
	})
})

