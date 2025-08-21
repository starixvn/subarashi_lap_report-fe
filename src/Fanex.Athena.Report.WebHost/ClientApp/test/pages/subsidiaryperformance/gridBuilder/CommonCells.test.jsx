import React from 'react'
import { render } from '@testing-library/react'
import CommonCells from '@/pages/subsidiaryperformance/gridBuilder/CommonCells'

jest.mock('@legion-lib/react-grid', () => ({
	Cell: ({ children, className, title }) => (
		<td className={className} title={title}>
			{children}
		</td>
	)
}))

jest.mock('@/lib/numberFormat', () => ({
	format: jest.fn((value) => value ? value.toString() : '0'),
	formatDecimal: jest.fn((value) => value ? value.toFixed(2) : '0.00')
}))

describe('CommonCells', () => {
	const mockData = {
		betCount: 150,
		turnover: 2500.75,
		customerWinLoss: -350.25,
		subsidiaryWinLoss: 450.50
	}

	test('renders all cells with correct data', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells data={mockData} index="test" />
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td')
		expect(cells).toHaveLength(4)
		
		expect(cells[0]).toHaveTextContent('150')
		expect(cells[1]).toHaveTextContent('2500.75')
		expect(cells[2]).toHaveTextContent('-350.25')
		expect(cells[3]).toHaveTextContent('450.50')
	})

	test('applies correct CSS classes', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells data={mockData} index="test" />
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td')
		
		cells.forEach(cell => {
			expect(cell).toHaveClass('right-align')
		})
	})

	test('applies negative class when subsidiaryWinLoss is negative', () => {
		const negativeData = {
			...mockData,
			subsidiaryWinLoss: -450.50
		}
		
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells data={negativeData} index="test" />
					</tr>
				</tbody>
			</table>
		)
		
		const subsidiaryWinLossCell = container.querySelectorAll('td')[3]
		expect(subsidiaryWinLossCell).toHaveClass('right-align', 'negative')
	})

	test('does not apply negative class when subsidiaryWinLoss is positive', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells data={mockData} index="test" />
					</tr>
				</tbody>
			</table>
		)
		
		const subsidiaryWinLossCell = container.querySelectorAll('td')[3]
		expect(subsidiaryWinLossCell).toHaveClass('right-align')
		expect(subsidiaryWinLossCell).not.toHaveClass('negative')
	})

	test('sets correct titles for all cells', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells data={mockData} index="test" />
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td')
		
		expect(cells[0]).toHaveAttribute('title', '150')
		expect(cells[1]).toHaveAttribute('title', '2500.75')
		expect(cells[2]).toHaveAttribute('title', '-350.25')
		expect(cells[3]).toHaveAttribute('title', '450.50')
	})

	test('generates correct keys for cells', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells data={mockData} index="test-index" />
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td')
		expect(cells).toHaveLength(4)
	})

	test('handles zero values correctly', () => {
		const zeroData = {
			betCount: 0,
			turnover: 0,
			customerWinLoss: 0,
			subsidiaryWinLoss: 0
		}
		
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells data={zeroData} index="test" />
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td')
		
		expect(cells[0]).toHaveTextContent('0')
		expect(cells[1]).toHaveTextContent('0.00')
		expect(cells[2]).toHaveTextContent('0.00')
		expect(cells[3]).toHaveTextContent('0.00')
		
		const subsidiaryWinLossCell = cells[3]
		expect(subsidiaryWinLossCell).not.toHaveClass('negative')
	})

	test('handles undefined data properties', () => {
		const undefinedData = {
			betCount: undefined,
			turnover: undefined,
			customerWinLoss: undefined,
			subsidiaryWinLoss: undefined
		}
		
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells data={undefinedData} index="test" />
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td')
		expect(cells).toHaveLength(4)
	})

	test('handles null data properties', () => {
		const nullData = {
			betCount: null,
			turnover: null,
			customerWinLoss: null,
			subsidiaryWinLoss: null
		}
		
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells data={nullData} index="test" />
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td')
		expect(cells).toHaveLength(4)
	})

	test('handles missing data object', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells data={{}} index="test" />
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td')
		expect(cells).toHaveLength(4)
	})

	test('handles large numbers correctly', () => {
		const largeData = {
			betCount: 999999,
			turnover: 999999.99,
			customerWinLoss: -999999.99,
			subsidiaryWinLoss: 999999.99
		}
		
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells data={largeData} index="test" />
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td')
		expect(cells).toHaveLength(4)
		
		expect(cells[0]).toHaveTextContent('999999')
		expect(cells[1]).toHaveTextContent('999999.99')
		expect(cells[2]).toHaveTextContent('-999999.99')
		expect(cells[3]).toHaveTextContent('999999.99')
	})

	test('handles different index values', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells data={mockData} index="custom-index-123" />
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td')
		expect(cells).toHaveLength(4)
	})
})
