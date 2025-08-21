import React from 'react'
import { render } from '@testing-library/react'
import { BuildBody } from '@/pages/subsidiaryperformance/gridBuilder/BuildBody'

jest.mock('@legion-lib/react-grid', () => ({
	Row: ({ children, ...props }) => <div data-testid="row" {...props}>{children}</div>,
	Cell: ({ children, className, title, rowSpan, ...props }) => (
		<div 
			data-testid="cell" 
			className={className} 
			title={title} 
			data-rowspan={rowSpan}
			{...props}
		>
			{children}
		</div>
	)
}))

jest.mock('@/pages/subsidiaryperformance/customGrid/ReportLink', () => ({ children, subsidiary }) => (
	<span data-testid="report-link" data-subsidiary={subsidiary}>{children}</span>
))

jest.mock('@/pages/subsidiaryperformance/gridBuilder/CommonCells', () => ({ data, index }) => (
	<div data-testid="common-cells" data-index={index}>{data.product || data.externalId}</div>
))

jest.mock('@/constants/report', () => ({
	ReportLevel: {
		CUSTOMER: 'CUSTOMER',
		MAIN: 'MAIN'
	},
	SubsidiaryViewType: {
		MASTER_MANAGEMENT: 'MASTER_MANAGEMENT',
		NORMAL: 'NORMAL'
	}
}))

describe('BuildBody', () => {
	const mockCustomerData = [
		{
			externalId: 'CUST001',
			systemId: 'SYS001',
			currencyName: 'USD'
		},
		{
			externalId: 'CUST002',
			systemId: 'SYS002',
			currencyName: 'EUR'
		}
	]

	const mockMainData = [
		{
			whiteLabel: 'Label1',
			totalItem: 4,
			details: [
				{
					subsidiary: 'Sub1',
					totalItem: 2,
					details: {
						USD: [
							{ product: 'SABA' },
							{ product: 'BTI' }
						]
					}
				}
			]
		}
	]

	test('renders customer detail body', () => {
		const result = BuildBody(mockCustomerData, { drillDownLevel: 'CUSTOMER' })
		
		const { container } = render(<div>{result}</div>)
		
		expect(container.querySelectorAll('[data-testid="row"]')).toHaveLength(2)
		expect(container).toHaveTextContent('CUST001')
		expect(container).toHaveTextContent('SYS001')
		expect(container).toHaveTextContent('USD')
		expect(container).toHaveTextContent('CUST002')
	})

	test('renders main body with normal view type', () => {
		const result = BuildBody(mockMainData, { 
			drillDownLevel: 'MAIN',
			viewType: 'NORMAL'
		})
		
		const { container } = render(<div>{result}</div>)
		
		expect(container.querySelectorAll('[data-testid="row"]')).toHaveLength(2)
		expect(container).toHaveTextContent('Sub1')
		expect(container).toHaveTextContent('USD')
		expect(container).toHaveTextContent('SABA')
		expect(container).toHaveTextContent('BTI')
	})

	test('renders main body with master management view type', () => {
		const result = BuildBody(mockMainData, { 
			drillDownLevel: 'MAIN',
			viewType: 'MASTER_MANAGEMENT'
		})
		
		const { container } = render(<div>{result}</div>)
		
		expect(container).toHaveTextContent('Label1')
		expect(container).toHaveTextContent('Sub1')
	})

	test('handles multiple currencies and products', () => {
		const complexData = [
			{
				whiteLabel: 'Label1',
				totalItem: 8,
				details: [
					{
						subsidiary: 'Sub1',
						totalItem: 4,
						details: {
							USD: [
								{ product: 'SABA' },
								{ product: 'BTI' }
							],
							EUR: [
								{ product: 'SABA' },
								{ product: 'BTI' }
							]
						}
					}
				]
			}
		]

		const result = BuildBody(complexData, { 
			drillDownLevel: 'MAIN',
			viewType: 'NORMAL'
		})
		
		const { container } = render(<div>{result}</div>)
		
		expect(container.querySelectorAll('[data-testid="row"]')).toHaveLength(4)
		expect(container).toHaveTextContent('USD')
		expect(container).toHaveTextContent('EUR')
	})

	test('sets correct rowSpan for cells', () => {
		const result = BuildBody(mockMainData, { 
			drillDownLevel: 'MAIN',
			viewType: 'NORMAL'
		})
		
		const { container } = render(<div>{result}</div>)
		
		const subsidiaryCell = Array.from(container.querySelectorAll('[data-testid="cell"]'))
			.find(cell => cell.textContent.includes('Sub1'))
		expect(subsidiaryCell).toHaveAttribute('data-rowspan', '2')

		const currencyCell = Array.from(container.querySelectorAll('[data-testid="cell"]'))
			.find(cell => cell.textContent === 'USD')
		expect(currencyCell).toHaveAttribute('data-rowspan', '2')
	})

	test('applies correct CSS classes', () => {
		const result = BuildBody(mockCustomerData, { drillDownLevel: 'CUSTOMER' })
		
		const { container } = render(<div>{result}</div>)
		
		expect(container.querySelector('.center-align')).toBeInTheDocument()
	})

	test('increments row index correctly in customer mode', () => {
		const result = BuildBody(mockCustomerData, { drillDownLevel: 'CUSTOMER' })
		
		const { container } = render(<div>{result}</div>)
		
		expect(container).toHaveTextContent('1')
		expect(container).toHaveTextContent('2')
	})

	test('handles empty data arrays', () => {
		const result = BuildBody([], { drillDownLevel: 'CUSTOMER' })
		
		const { container } = render(<div>{result}</div>)
		
		expect(container.querySelectorAll('[data-testid="row"]')).toHaveLength(0)
	})

	test('handles complex subsidiary structure', () => {
		const complexSubData = [
			{
				whiteLabel: 'Label1',
				totalItem: 4,
				details: [
					{
						subsidiary: 'Sub1',
						totalItem: 2,
						details: {
							USD: [{ product: 'SABA' }]
						}
					},
					{
						subsidiary: 'Sub2',
						totalItem: 2,
						details: {
							EUR: [{ product: 'BTI' }]
						}
					}
				]
			}
		]

		const result = BuildBody(complexSubData, { 
			drillDownLevel: 'MAIN',
			viewType: 'MASTER_MANAGEMENT'
		})
		
		const { container } = render(<div>{result}</div>)
		
		expect(container).toHaveTextContent('Sub1')
		expect(container).toHaveTextContent('Sub2')
		expect(container).toHaveTextContent('SABA')
		expect(container).toHaveTextContent('BTI')
	})

	test('sets correct titles for cells', () => {
		const result = BuildBody(mockCustomerData, { drillDownLevel: 'CUSTOMER' })
		
		const { container } = render(<div>{result}</div>)
		
		const externalIdCell = Array.from(container.querySelectorAll('[data-testid="cell"]'))
			.find(cell => cell.getAttribute('title') === 'CUST001')
		expect(externalIdCell).toBeInTheDocument()

		const currencyCell = Array.from(container.querySelectorAll('[data-testid="cell"]'))
			.find(cell => cell.getAttribute('title') === 'USD')
		expect(currencyCell).toBeInTheDocument()
	})
})
