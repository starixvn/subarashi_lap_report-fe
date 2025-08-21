import React from 'react'
import { render } from '@testing-library/react'
import { BuildBody } from '@/pages/customerturnover/gridBuilder/BuildBody'

jest.mock('@legion-lib/react-grid', () => ({
	Row: ({ children, ...props }) => <div data-testid="row" {...props}>{children}</div>,
	Cell: ({ children, className, title, rowSpan, colSpan, ...props }) => (
		<div 
			data-testid="cell" 
			className={className} 
			title={title} 
			data-rowspan={rowSpan}
			data-colspan={colSpan}
			{...props}
		>
			{children}
		</div>
	)
}))

jest.mock('@/pages/customerturnover/gridBuilder/CellSpan', () => ({ children, title, rowSpan, className, ...props }) => (
	<div 
		data-testid="cell-span" 
		className={className} 
		title={title}
		data-rowspan={rowSpan}
		{...props}
	>
		{children}
	</div>
))

describe('BuildBody', () => {
	const mockData = [
		{
			index: 1,
			rowSpan: 1,
			rowSpan2: 1,
			reportBy: '2023-08-26',
			externalId: 'EXT001',
			systemId: 'SYS001',
			currency: 'USD',
			sportType: 'SABA',
			bettype: 'Single',
			effectiveBettingValue: 500.75,
			totalTransactions: 50,
			turnover: 500.75,
			totalTurnover: 500.75,
			customerWinLoss: -25.50,
			customerComm: 12.25,
			customerTotal: -13.25
		},
		{
			index: 2,
			rowSpan: 1,
			rowSpan2: 1,
			reportBy: '2023-08-26',
			externalId: 'EXT002',
			systemId: 'SYS002',
			currency: 'USD',
			sportType: 'BTI',
			bettype: 'Multiple',
			effectiveBettingValue: 1000.00,
			totalTransactions: 100,
			turnover: 1000.00,
			totalTurnover: 1000.00,
			customerWinLoss: 50.00,
			customerComm: 25.00,
			customerTotal: 75.00
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

	test('includes CellSpan for each row', () => {
		const result = BuildBody(mockData, {})
		
		const { container } = render(<div>{result}</div>)
		
		const cellSpans = container.querySelectorAll('[data-testid="cell-span"]')
		expect(cellSpans.length).toBeGreaterThan(0)
		
		const indexCells = Array.from(cellSpans).filter(cell => cell.getAttribute('title') === '1' || cell.getAttribute('title') === '2')
		expect(indexCells).toHaveLength(2)
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
		
		const sportTypeCell = Array.from(container.querySelectorAll('[data-testid="cell-span"]'))
			.find(cell => cell.getAttribute('title') === 'SABA')
		expect(sportTypeCell).toBeInTheDocument()
		
		const bettypeCell = Array.from(container.querySelectorAll('[data-testid="cell"]'))
			.find(cell => cell.getAttribute('title') === 'Single')
		expect(bettypeCell).toBeInTheDocument()
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
		expect(container).toHaveTextContent('EXT001')
		expect(container).toHaveTextContent('SABA')
	})

	test('displays formatted data correctly', () => {
		const result = BuildBody(mockData, {})
		
		const { container } = render(<div>{result}</div>)
		
		expect(container).toHaveTextContent('500.75')
		expect(container).toHaveTextContent('1,000.00')
		expect(container).toHaveTextContent('50')
		expect(container).toHaveTextContent('100')
	})

	test('handles undefined or null externalId values', () => {
		const dataWithNullExternalId = [
			{ ...mockData[0], externalId: null },
			{ ...mockData[1], externalId: undefined }
		]
		
		const result = BuildBody(dataWithNullExternalId, {})
		
		const { container } = render(<div>{result}</div>)
		
		expect(container.querySelectorAll('[data-testid="row"]')).toHaveLength(2)
	})

	test('preserves data integrity through rendering', () => {
		const result = BuildBody(mockData, {})
		
		const { container } = render(<div>{result}</div>)
		
		expect(container).toHaveTextContent('EXT001')
		expect(container).toHaveTextContent('EXT002')
		expect(container).toHaveTextContent('SABA')
		expect(container).toHaveTextContent('BTI')
		
		const rows = container.querySelectorAll('[data-testid="row"]')
		expect(rows).toHaveLength(2)
	})
})
