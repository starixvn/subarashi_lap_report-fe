import React from 'react'
import { render, screen } from '@testing-library/react'
import { RefPager } from '@/components/mobile-component/RefPager'

jest.mock('@legion-lib/react-grid', () => ({
	Pager: ({ totalPages, currentPage, onPageChange, ...props }) => (
		<div data-testid="pager" {...props}>
			<span>Page {currentPage} of {totalPages}</span>
			<button 
				disabled={currentPage <= 1} 
				onClick={() => onPageChange && onPageChange(currentPage - 1)}
			>
				Previous
			</button>
			<button 
				disabled={currentPage >= totalPages} 
				onClick={() => onPageChange && onPageChange(currentPage + 1)}
			>
				Next
			</button>
		</div>
	)
}))

describe('RefPager', () => {
	const defaultProps = {
		totalPages: 10,
		currentPage: 5,
		onPageChange: jest.fn()
	}

	beforeEach(() => {
		jest.clearAllMocks()
	})

	test('renders wrapper container with correct class', () => {
		const { container } = render(<RefPager {...defaultProps} />)
		
		const wrapper = container.firstChild
		expect(wrapper).toHaveClass('page-wrapper-container')
	})

	test('renders Pager component', () => {
		render(<RefPager {...defaultProps} />)
		
		expect(screen.getByTestId('pager')).toBeInTheDocument()
		expect(screen.getByText('Page 5 of 10')).toBeInTheDocument()
	})

	test('passes through all props to Pager', () => {
		const customProps = {
			...defaultProps,
			customProp: 'test-value',
			className: 'custom-pager'
		}
		
		render(<RefPager {...customProps} />)
		
		const pager = screen.getByTestId('pager')
		expect(pager).toHaveAttribute('customProp', 'test-value')
		expect(pager).toHaveClass('custom-pager')
	})

	test('forwards ref correctly', () => {
		const ref = React.createRef()
		render(<RefPager {...defaultProps} ref={ref} />)
		
		expect(ref.current).toBeInstanceOf(HTMLDivElement)
		expect(ref.current).toHaveClass('page-wrapper-container')
	})

	test('handles minimal props', () => {
		render(<RefPager />)
		
		expect(screen.getByTestId('pager')).toBeInTheDocument()
	})

	test('maintains structure with different page numbers', () => {
		render(<RefPager totalPages={100} currentPage={50} />)
		
		expect(screen.getByText('Page 50 of 100')).toBeInTheDocument()
	})

	test('component is correctly exported', () => {
		expect(RefPager).toBeDefined()
		expect(typeof RefPager).toBe('object')
	})

	test('is a forwardRef component', () => {
		expect(RefPager.$$typeof.toString()).toContain('react.forward_ref')
	})
})
