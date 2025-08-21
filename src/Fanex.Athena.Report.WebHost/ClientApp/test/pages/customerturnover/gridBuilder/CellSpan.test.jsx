import React from 'react'
import { render } from '@testing-library/react'
import CellSpan from '@/pages/customerturnover/gridBuilder/CellSpan'

jest.mock('@legion-lib/react-grid', () => ({
	Cell: ({ children, rowSpan, ...props }) => (
		<td {...props} rowSpan={rowSpan}>
			{children}
		</td>
	)
}))

describe('CellSpan', () => {
	test('returns null when rowSpan is negative', () => {
		const { container } = render(<CellSpan rowSpan={-1} />)
		
		expect(container.firstChild).toBeNull()
	})

	test('returns Cell with rowSpan when rowSpan is greater than 1', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CellSpan rowSpan={3} className="test-class">
							Test Content
						</CellSpan>
					</tr>
				</tbody>
			</table>
		)
		
		const cell = container.querySelector('td')
		expect(cell).toBeInTheDocument()
		expect(cell).toHaveAttribute('rowspan', '3')
		expect(cell).toHaveClass('test-class')
		expect(cell.textContent).toBe('Test Content')
	})

	test('returns Cell without rowSpan when rowSpan is 1', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CellSpan rowSpan={1} className="test-class">
							Test Content
						</CellSpan>
					</tr>
				</tbody>
			</table>
		)
		
		const cell = container.querySelector('td')
		expect(cell).toBeInTheDocument()
		expect(cell).not.toHaveAttribute('rowspan')
		expect(cell).toHaveClass('test-class')
		expect(cell.textContent).toBe('Test Content')
	})

	test('returns Cell without rowSpan when rowSpan is 0', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CellSpan rowSpan={0} className="test-class">
							Test Content
						</CellSpan>
					</tr>
				</tbody>
			</table>
		)
		
		const cell = container.querySelector('td')
		expect(cell).toBeInTheDocument()
		expect(cell).not.toHaveAttribute('rowspan')
		expect(cell).toHaveClass('test-class')
		expect(cell.textContent).toBe('Test Content')
	})

	test('passes through all other props except rowSpan when rowSpan <= 1', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CellSpan 
							rowSpan={1} 
							className="test-class"
							title="Test Title"
							id="test-id"
							data-testid="test-cell"
						>
							Test Content
						</CellSpan>
					</tr>
				</tbody>
			</table>
		)
		
		const cell = container.querySelector('td')
		expect(cell).toHaveClass('test-class')
		expect(cell).toHaveAttribute('title', 'Test Title')
		expect(cell).toHaveAttribute('id', 'test-id')
		expect(cell).toHaveAttribute('data-testid', 'test-cell')
	})

	test('passes through all props including rowSpan when rowSpan > 1', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CellSpan 
							rowSpan={2} 
							className="test-class"
							title="Test Title"
							id="test-id"
							data-testid="test-cell"
						>
							Test Content
						</CellSpan>
					</tr>
				</tbody>
			</table>
		)
		
		const cell = container.querySelector('td')
		expect(cell).toHaveClass('test-class')
		expect(cell).toHaveAttribute('title', 'Test Title')
		expect(cell).toHaveAttribute('id', 'test-id')
		expect(cell).toHaveAttribute('data-testid', 'test-cell')
		expect(cell).toHaveAttribute('rowspan', '2')
	})

	test('handles undefined rowSpan', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CellSpan className="test-class">
							Test Content
						</CellSpan>
					</tr>
				</tbody>
			</table>
		)
		
		const cell = container.querySelector('td')
		expect(cell).toBeInTheDocument()
		expect(cell).not.toHaveAttribute('rowspan')
	})

	test('handles zero rowSpan correctly', () => {
		const { container } = render(<CellSpan rowSpan={0} />)
		
		expect(container.querySelector('td')).toBeInTheDocument()
	})

	test('handles large rowSpan values', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CellSpan rowSpan={10}>
							Test Content
						</CellSpan>
					</tr>
				</tbody>
			</table>
		)
		
		const cell = container.querySelector('td')
		expect(cell).toHaveAttribute('rowspan', '10')
	})

	test('renders children correctly', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CellSpan rowSpan={1}>
							<span>Child Element</span>
						</CellSpan>
					</tr>
				</tbody>
			</table>
		)
		
		const cell = container.querySelector('td')
		const childSpan = cell.querySelector('span')
		expect(childSpan).toBeInTheDocument()
		expect(childSpan.textContent).toBe('Child Element')
	})

	test('handles multiple children', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CellSpan rowSpan={1}>
							<span>First</span>
							<span>Second</span>
						</CellSpan>
					</tr>
				</tbody>
			</table>
		)
		
		const cell = container.querySelector('td')
		const spans = cell.querySelectorAll('span')
		expect(spans).toHaveLength(2)
		expect(spans[0].textContent).toBe('First')
		expect(spans[1].textContent).toBe('Second')
	})
})
