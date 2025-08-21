import React from 'react'
import { render } from '@testing-library/react'
import { BuildBody } from '@/pages/turnover/gridBuilder/BuildBody'

jest.mock('@legion-lib/react-grid', () => ({
	Row: ({ children, ...props }) => <div data-testid="row" {...props}>{children}</div>,
	Cell: ({ children, className, title, ...props }) => (
		<div data-testid="cell" className={className} title={title} {...props}>
			{children}
		</div>
	)
}))

jest.mock('@/pages/turnover/gridBuilder/CommonCells', () => ({ data, options }) => (
	<div data-testid="common-cells" className="left-align">{data.product || 'common'}</div>
))

describe('BuildBody', () => {
	const mockData = [
		{
			index: 1,
			date: '2023-08-26',
			product: 'SABA',
			betCount: 150,
			turnover: 1500.25,
			customerWinLoss: -125.75,
			customerComm: 37.50,
			licenseeWinLoss: 163.25,
			licenseeComm: 15.25,
			margin: 0.109
		},
		{
			index: 2,
			date: '2023-08-26',
			product: 'BTI',
			betCount: 75,
			turnover: 750.50,
			customerWinLoss: 50.25,
			customerComm: 18.75,
			licenseeWinLoss: -69.00,
			licenseeComm: 7.50,
			margin: -0.092
		}
	]

	test('renders basic data structure', () => {
		const result = BuildBody(mockData, {})
		
		const { container } = render(<div>{result}</div>)
		
		expect(container.querySelectorAll('[data-testid="row"]')).toHaveLength(2)
		expect(container).toHaveTextContent('SABA')
		expect(container).toHaveTextContent('BTI')
		expect(container).toHaveTextContent('1')
		expect(container).toHaveTextContent('2')
	})

	test('includes CommonCells for each row', () => {
		const result = BuildBody(mockData, {})
		
		const { container } = render(<div>{result}</div>)
		
		const commonCells = container.querySelectorAll('[data-testid="common-cells"]')
		expect(commonCells).toHaveLength(2)
		expect(commonCells[0]).toHaveTextContent('SABA')
		expect(commonCells[1]).toHaveTextContent('BTI')
	})

	test('applies correct CSS classes', () => {
		const result = BuildBody(mockData, {})
		
		const { container } = render(<div>{result}</div>)
		
		const centerAlignCells = container.querySelectorAll('.center-align')
		expect(centerAlignCells.length).toBeGreaterThan(0)

		const leftAlignCells = container.querySelectorAll('.left-align')
		expect(leftAlignCells.length).toBeGreaterThan(0)
	})

	test('handles empty data array', () => {
		const result = BuildBody([], {})
		
		const { container } = render(<div>{result}</div>)
		
		expect(container.querySelectorAll('[data-testid="row"]')).toHaveLength(0)
	})

	test('sets correct titles for cells', () => {
		const result = BuildBody(mockData, {})
		
		const { container } = render(<div>{result}</div>)
		
		const indexCell = Array.from(container.querySelectorAll('[data-testid="cell"]'))
			.find(cell => cell.getAttribute('title') === '1')
		expect(indexCell).toBeInTheDocument()

		const dateCell = Array.from(container.querySelectorAll('[data-testid="cell"]'))
			.find(cell => cell.getAttribute('title') === '08/26/2023')
		expect(dateCell).toBeInTheDocument()
	})

	test('generates correct row keys', () => {
		const result = BuildBody(mockData, {})
		
		const { container } = render(<div>{result}</div>)
		
		const rows = container.querySelectorAll('[data-testid="row"]')
		expect(rows).toHaveLength(2)
		
		expect(result[0].key).toBe('row-index-1-0')
		expect(result[1].key).toBe('row-index-2-1')
	})

	test('handles single row data', () => {
		const singleRowData = [mockData[0]]
		
		const result = BuildBody(singleRowData, {})
		
		const { container } = render(<div>{result}</div>)
		
		expect(container.querySelectorAll('[data-testid="row"]')).toHaveLength(1)
		expect(container).toHaveTextContent('SABA')
	})

	test('passes data correctly to CommonCells', () => {
		const result = BuildBody(mockData, {})
		
		const { container } = render(<div>{result}</div>)
		
		const commonCells = container.querySelectorAll('[data-testid="common-cells"]')
		expect(commonCells[0]).toHaveTextContent('SABA')
		expect(commonCells[1]).toHaveTextContent('BTI')
	})

	test('handles undefined or null product values', () => {
		const dataWithNullProduct = [
			{ ...mockData[0], product: null },
			{ ...mockData[1], product: undefined }
		]
		
		const result = BuildBody(dataWithNullProduct, {})
		
		const { container } = render(<div>{result}</div>)
		
		expect(container.querySelectorAll('[data-testid="row"]')).toHaveLength(2)
	})

	test('maintains data structure integrity', () => {
		const result = BuildBody(mockData, {})
		
		const { container } = render(<div>{result}</div>)
		
		expect(container).toHaveTextContent('SABA')
		expect(container).toHaveTextContent('BTI')
		
		const commonCells = container.querySelectorAll('[data-testid="common-cells"]')
		expect(commonCells).toHaveLength(2)
		expect(commonCells[0]).toHaveTextContent('SABA')
		expect(commonCells[1]).toHaveTextContent('BTI')
	})

	test('handles large datasets', () => {
		const largeData = Array.from({ length: 10 }, (_, i) => ({
			index: i + 1,
			date: '2023-08-26',
			product: `PRODUCT_${i}`,
			betCount: i * 10,
			turnover: i * 100.50
		}))
		
		const result = BuildBody(largeData, {})
		
		const { container } = render(<div>{result}</div>)
		
		expect(container.querySelectorAll('[data-testid="row"]')).toHaveLength(10)
		expect(container).toHaveTextContent('PRODUCT_0')
		expect(container).toHaveTextContent('PRODUCT_9')
	})
})
