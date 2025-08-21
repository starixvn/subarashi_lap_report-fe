import React from 'react'
import { render, screen } from '@testing-library/react'
import RefRow from '@/components/mobile-component/RefRow'

describe('RefRow', () => {
	const defaultProps = {
		children: <td>Test Content</td>
	}

	test('renders as tr element', () => {
		const { container } = render(
			<table>
				<tbody>
					<RefRow {...defaultProps} />
				</tbody>
			</table>
		)
		
		const row = container.querySelector('tr')
		expect(row).toBeInTheDocument()
		expect(screen.getByText('Test Content')).toBeInTheDocument()
	})

	test('applies custom className', () => {
		const { container } = render(
			<table>
				<tbody>
					<RefRow {...defaultProps} className="custom-row" />
				</tbody>
			</table>
		)
		
		const row = container.querySelector('tr')
		expect(row).toHaveClass('custom-row')
	})

	test('renders without className when not provided', () => {
		const { container } = render(
			<table>
				<tbody>
					<RefRow {...defaultProps} />
				</tbody>
			</table>
		)
		
		const row = container.querySelector('tr')
		expect(row).not.toHaveAttribute('class')
	})

	test('forwards ref correctly', () => {
		const ref = React.createRef()
		render(
			<table>
				<tbody>
					<RefRow {...defaultProps} ref={ref} />
				</tbody>
			</table>
		)
		
		expect(ref.current).toBeInstanceOf(HTMLTableRowElement)
		expect(ref.current).toContainElement(screen.getByText('Test Content'))
	})

	test('renders with multiple table cells', () => {
		const complexChildren = [
			<td key="1">Cell 1</td>,
			<td key="2">Cell 2</td>,
			<td key="3">Cell 3</td>
		]
		
		render(
			<table>
				<tbody>
					<RefRow>{complexChildren}</RefRow>
				</tbody>
			</table>
		)
		
		expect(screen.getByText('Cell 1')).toBeInTheDocument()
		expect(screen.getByText('Cell 2')).toBeInTheDocument()
		expect(screen.getByText('Cell 3')).toBeInTheDocument()
	})

	test('renders with null children', () => {
		const { container } = render(
			<table>
				<tbody>
					<RefRow children={null} />
				</tbody>
			</table>
		)
		
		const row = container.querySelector('tr')
		expect(row).toBeEmptyDOMElement()
	})

	test('renders with string children (though invalid HTML)', () => {
		const { container } = render(
			<table>
				<tbody>
					<RefRow children="Simple text content" />
				</tbody>
			</table>
		)
		
		expect(container).toHaveTextContent('Simple text content')
	})

	test('maintains DOM structure as tr element', () => {
		const { container } = render(
			<table>
				<tbody>
					<RefRow {...defaultProps} />
				</tbody>
			</table>
		)
		
		const row = container.querySelector('tr')
		expect(row.tagName).toBe('TR')
	})

	test('passes through additional props', () => {
		const { container } = render(
			<table>
				<tbody>
					<RefRow 
						{...defaultProps} 
						data-testid="custom-ref-row" 
						role="row"
						onClick={() => {}}
					/>
				</tbody>
			</table>
		)
		
		const row = container.querySelector('tr')
		expect(row).toHaveAttribute('data-testid', 'custom-ref-row')
		expect(row).toHaveAttribute('role', 'row')
	})

	test('component is correctly exported', () => {
		expect(RefRow).toBeDefined()
		expect(typeof RefRow).toBe('object')
	})

	test('is a forwardRef component', () => {
		expect(RefRow.$$typeof.toString()).toContain('react.forward_ref')
	})

	test('can handle complex cell content', () => {
		const cellContent = (
			<td>
				<div className="cell-wrapper">
					<span>Label:</span>
					<strong>Value</strong>
				</div>
			</td>
		)
		
		render(
			<table>
				<tbody>
					<RefRow>{cellContent}</RefRow>
				</tbody>
			</table>
		)
		
		expect(screen.getByText('Label:')).toBeInTheDocument()
		expect(screen.getByText('Value')).toBeInTheDocument()
	})
})
