import React from 'react'
import { render } from '@testing-library/react'
import { BuildBody } from '@/pages/winlossbytimezone/gridBuilder/BuildBody'

jest.mock('moment', () => {
	const moment = jest.requireActual('moment')
	return (date) => moment(date || '2023-01-15T10:30:00Z')
})

jest.mock('@legion-lib/react-grid', () => ({
	Row: ({ children, ...props }) => <div data-testid="row" {...props}>{children}</div>,
	Cell: ({ children, className, title, ...props }) => (
		<div data-testid="cell" className={className} title={title} {...props}>
			{children}
		</div>
	)
}))

jest.mock('@/lib/numberFormat', () => ({
	format: jest.fn((value) => value?.toLocaleString() || '0'),
	formatDecimal: jest.fn((value) => value?.toFixed(2) || '0.00')
}))

jest.mock('@/pages/winlossbytimezone/constants/settingConst', () => ({
	SettingConst: {
		GroupByProduct: 'PRODUCT',
		GroupByTimezone: 'TIMEZONE',
		ReportBySummary: 0,
		ReportByDaily: 2,
		ReportByMonthly: 1
	}
}))

describe('BuildBody', () => {
	const mockData = [
		{
			reportBy: '2023-01-15T00:00:00Z',
			groupBy: 'ASIA',
			betCount: 100,
			turnover: 1000.50,
			customerComm: 50.25,
			licenseeWinLoss: 75.75,
			licenseeComm: 25.00,
			licenseeNetWinLoss: 100.75,
			margin: 12.50
		},
		{
			reportBy: '2023-02-15T00:00:00Z',
			groupBy: 'EUROPE',
			betCount: 200,
			turnover: 2000.00,
			customerComm: 100.00,
			licenseeWinLoss: -150.50,
			licenseeComm: 50.00,
			licenseeNetWinLoss: -100.50,
			margin: -5.00
		}
	]

	const defaultOptions = {
		reportBy: 1,
		groupBy: 'TIMEZONE'
	}

	test('renders data with monthly report format', () => {
		const result = BuildBody(mockData, { reportBy: 1, groupBy: 'TIMEZONE' })
		
		const { container } = render(<div>{result}</div>)
		
		expect(container.querySelectorAll('[data-testid="row"]')).toHaveLength(2)
		expect(container).toHaveTextContent('01/2023')
		expect(container).toHaveTextContent('02/2023')
		expect(container).toHaveTextContent('ASIA')
		expect(container).toHaveTextContent('EUROPE')
	})

	test('renders data with daily report format', () => {
		const result = BuildBody(mockData, { reportBy: 2, groupBy: 'TIMEZONE' })
		
		const { container } = render(<div>{result}</div>)
		
		expect(container).toHaveTextContent('01/15/2023')
		expect(container).toHaveTextContent('02/15/2023')
	})

	test('renders data with summary report (no date column)', () => {
		const result = BuildBody(mockData, { reportBy: 0, groupBy: 'TIMEZONE' })
		
		const { container } = render(<div>{result}</div>)
		
		const cells = container.querySelectorAll('[data-testid="cell"]')
		const dateCell = Array.from(cells).find(cell => 
			cell.textContent.includes('/2023')
		)
		expect(dateCell).toBeUndefined()
	})

	test('applies correct alignment for product groupBy', () => {
		const result = BuildBody(mockData, { reportBy: 1, groupBy: 'PRODUCT' })
		
		const { container } = render(<div>{result}</div>)
		
		const groupByCell = Array.from(container.querySelectorAll('[data-testid="cell"]'))
			.find(cell => cell.textContent === 'ASIA')
		expect(groupByCell).toHaveClass('left-align')
	})

	test('applies correct alignment for timezone groupBy', () => {
		const result = BuildBody(mockData, { reportBy: 1, groupBy: 'TIMEZONE' })
		
		const { container } = render(<div>{result}</div>)
		
		const groupByCell = Array.from(container.querySelectorAll('[data-testid="cell"]'))
			.find(cell => cell.textContent === 'ASIA')
		expect(groupByCell).toHaveClass('center-align')
	})

	test('applies negative class for negative licenseeWinLoss', () => {
		const result = BuildBody(mockData, defaultOptions)
		
		const { container } = render(<div>{result}</div>)
		
		const negativeCells = container.querySelectorAll('.negative')
		expect(negativeCells.length).toBeGreaterThan(0)
	})

	test('formats numbers correctly', () => {
		const NumberFormat = require('@/lib/numberFormat')
		
		BuildBody(mockData, defaultOptions)
		
		expect(NumberFormat.format).toHaveBeenCalledWith(100)
		expect(NumberFormat.format).toHaveBeenCalledWith(200)
		expect(NumberFormat.formatDecimal).toHaveBeenCalledWith(1000.50)
		expect(NumberFormat.formatDecimal).toHaveBeenCalledWith(50.25)
	})

	test('displays margin as percentage', () => {
		const result = BuildBody(mockData, defaultOptions)
		
		const { container } = render(<div>{result}</div>)
		
		expect(container).toHaveTextContent('12.50%')
		expect(container).toHaveTextContent('-5.00%')
	})

	test('sets correct row index', () => {
		const result = BuildBody(mockData, defaultOptions)
		
		const { container } = render(<div>{result}</div>)
		
		expect(container).toHaveTextContent('1')
		expect(container).toHaveTextContent('2')
	})

	test('handles empty data array', () => {
		const result = BuildBody([], defaultOptions)
		
		const { container } = render(<div>{result}</div>)
		
		expect(container.querySelectorAll('[data-testid="row"]')).toHaveLength(0)
	})

	test('sets correct titles for cells', () => {
		const result = BuildBody(mockData, defaultOptions)
		
		const { container } = render(<div>{result}</div>)
		
		const betCountCell = Array.from(container.querySelectorAll('[data-testid="cell"]'))
			.find(cell => cell.getAttribute('title') === '100')
		expect(betCountCell).toBeInTheDocument()

		const turnoverCell = Array.from(container.querySelectorAll('[data-testid="cell"]'))
			.find(cell => cell.getAttribute('title') === '1000.50')
		expect(turnoverCell).toBeInTheDocument()
	})

	test('applies correct CSS classes to cells', () => {
		const result = BuildBody(mockData, defaultOptions)
		
		const { container } = render(<div>{result}</div>)
		
		expect(container.querySelectorAll('.center-align').length).toBeGreaterThan(0)
		expect(container.querySelectorAll('.right-align').length).toBeGreaterThan(0)
	})

	test('handles zero and undefined values', () => {
		const dataWithZeros = [
			{
				reportBy: '2023-01-01T00:00:00Z',
				groupBy: 'TEST',
				betCount: 0,
				turnover: undefined,
				customerComm: null,
				licenseeWinLoss: 0,
				licenseeComm: 0,
				licenseeNetWinLoss: 0,
				margin: 0
			}
		]

		const result = BuildBody(dataWithZeros, defaultOptions)
		
		const { container } = render(<div>{result}</div>)
		
		expect(container).toHaveTextContent('0')
		expect(container).toHaveTextContent('0.00%')
	})
})
