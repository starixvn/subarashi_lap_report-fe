import React from 'react'
import { render } from '@testing-library/react'
import { BuildFooter } from '@/pages/winlossbytimezone/gridBuilder/BuildFooter'

jest.mock('@legion-lib/react-grid', () => ({
	Row: ({ children, className, ...props }) => <div className={className} {...props}>{children}</div>,
	Cell: ({ children, className, title, colSpan, ...props }) => (
		<div data-testid="cell" className={className} title={title} data-colspan={colSpan} {...props}>
			{children}
		</div>
	)
}))

jest.mock('@/helpers/langHelper', () => ({
	__esModule: true,
	default: {
		getSingleResource: jest.fn((key) => {
			const resources = {
				'TotalIn': 'Total in'
			}
			return resources[key] || key
		})
	}
}))

jest.mock('@/lib/numberFormat', () => ({
	format: jest.fn((value) => value?.toLocaleString() || '0'),
	formatDecimal: jest.fn((value) => value?.toFixed(2) || '0.00')
}))

jest.mock('@/pages/winlossbytimezone/constants/settingConst', () => ({
	SettingConst: {
		ReportBySummary: 0,
		ReportByDaily: 2,
		ReportByMonthly: 1
	}
}))

describe('BuildFooter', () => {
	const mockData = {
		betCount: 500,
		turnover: 5000.75,
		customerComm: 125.50,
		licenseeWinLoss: 375.25,
		licenseeComm: 50.00,
		licenseeNetWinLoss: 425.25,
		margin: 8.50
	}

	test('renders footer with summary report', () => {
		const result = BuildFooter(mockData, { reportBy: 0, baseCurrency: 'USD' })
		
		const { container } = render(<div>{result}</div>)
		
		expect(container.querySelector('.fixed-table-grant-total')).toBeInTheDocument()
		expect(container).toHaveTextContent('Total in USD')
		expect(container).toHaveTextContent('500')
		expect(container).toHaveTextContent('5000.75')
	})

	test('renders footer with non-summary report', () => {
		const result = BuildFooter(mockData, { reportBy: 1, baseCurrency: 'EUR' })
		
		const { container } = render(<div>{result}</div>)
		
		expect(container).toHaveTextContent('Total in EUR')
		
		const totalCell = container.querySelector('[data-colspan="3"]')
		expect(totalCell).toBeInTheDocument()
	})

	test('applies correct colSpan for summary report', () => {
		const result = BuildFooter(mockData, { reportBy: 0, baseCurrency: 'USD' })
		
		const { container } = render(<div>{result}</div>)
		
		const totalCell = container.querySelector('[data-colspan="2"]')
		expect(totalCell).toBeInTheDocument()
		expect(totalCell).toHaveTextContent('Total in USD')
	})

	test('applies negative class for negative licenseeWinLoss', () => {
		const negativeData = {
			...mockData,
			licenseeWinLoss: -100.50
		}

		const result = BuildFooter(negativeData, { reportBy: 1, baseCurrency: 'USD' })
		
		const { container } = render(<div>{result}</div>)
		
		const negativeCells = container.querySelectorAll('.negative')
		expect(negativeCells.length).toBeGreaterThan(0)
	})

	test('applies negative class for negative licenseeNetWinLoss', () => {
		const negativeData = {
			...mockData,
			licenseeNetWinLoss: -200.75
		}

		const result = BuildFooter(negativeData, { reportBy: 1, baseCurrency: 'USD' })
		
		const { container } = render(<div>{result}</div>)
		
		const negativeCells = container.querySelectorAll('.negative')
		expect(negativeCells.length).toBeGreaterThan(0)
	})

	test('formats numbers correctly', () => {
		const NumberFormat = require('@/lib/numberFormat')
		
		BuildFooter(mockData, { reportBy: 1, baseCurrency: 'USD' })
		
		expect(NumberFormat.format).toHaveBeenCalledWith(500)
		expect(NumberFormat.formatDecimal).toHaveBeenCalledWith(5000.75)
		expect(NumberFormat.formatDecimal).toHaveBeenCalledWith(125.50)
		expect(NumberFormat.formatDecimal).toHaveBeenCalledWith(375.25)
	})

	test('displays margin as percentage', () => {
		const result = BuildFooter(mockData, { reportBy: 1, baseCurrency: 'USD' })
		
		const { container } = render(<div>{result}</div>)
		
		expect(container).toHaveTextContent('8.50%')
	})

	test('sets correct titles for cells', () => {
		const result = BuildFooter(mockData, { reportBy: 1, baseCurrency: 'USD' })
		
		const { container } = render(<div>{result}</div>)
		
		const betCountCell = Array.from(container.querySelectorAll('[data-testid="cell"]'))
			.find(cell => cell.getAttribute('title') === '500')
		expect(betCountCell).toBeInTheDocument()

		const turnoverCell = Array.from(container.querySelectorAll('[data-testid="cell"]'))
			.find(cell => cell.getAttribute('title') === '5000.75')
		expect(turnoverCell).toBeInTheDocument()
	})

	test('applies correct CSS classes', () => {
		const result = BuildFooter(mockData, { reportBy: 1, baseCurrency: 'USD' })
		
		const { container } = render(<div>{result}</div>)
		
		expect(container.querySelector('.center-align')).toBeInTheDocument()
		expect(container.querySelectorAll('.right-align').length).toBeGreaterThan(0)
	})

	test('handles zero values correctly', () => {
		const zeroData = {
			betCount: 0,
			turnover: 0,
			customerComm: 0,
			licenseeWinLoss: 0,
			licenseeComm: 0,
			licenseeNetWinLoss: 0,
			margin: 0
		}

		const result = BuildFooter(zeroData, { reportBy: 1, baseCurrency: 'USD' })
		
		const { container } = render(<div>{result}</div>)
		
		expect(container).toHaveTextContent('0.00%')
		expect(container.querySelectorAll('.negative')).toHaveLength(0)
	})

	test('returns array with single row element', () => {
		const result = BuildFooter(mockData, { reportBy: 1, baseCurrency: 'USD' })
		
		expect(Array.isArray(result)).toBe(true)
		expect(result).toHaveLength(1)
	})

	test('handles undefined baseCurrency', () => {
		const result = BuildFooter(mockData, { reportBy: 1, baseCurrency: undefined })
		
		const { container } = render(<div>{result}</div>)
		
		expect(container).toHaveTextContent('Total in undefined')
	})
})
