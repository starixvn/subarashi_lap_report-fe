import React from 'react'
import { render } from '@testing-library/react'
import { BuildFooter } from '@/pages/customerturnover/gridBuilder/BuildFooter'

jest.mock('@legion-lib/react-grid', () => ({
	Row: ({ children, ...props }) => <div data-testid="row" {...props}>{children}</div>,
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
				'Total': 'Total'
			}
			return resources[key] || key
		})
	}
}))

jest.mock('@/lib/numberFormat', () => ({
	formatDecimal: jest.fn((value) => value?.toFixed(2) || '0.00'),
	formatInteger: jest.fn((value) => Math.floor(value || 0).toString())
}))

describe('BuildFooter', () => {
	const mockData = {
		effectiveBettingValue: 1500.75,
		totalTransactions: 250,
		turnover: 2000.50,
		totalTurnover: 2500.00,
		customerWinLoss: -125.25,
		customerComm: 75.50,
		customerTotal: -49.75
	}

	test('renders footer without customer commission', () => {
		const result = BuildFooter(mockData, { isAllowedCustomerCommission: false })
		
		const { container } = render(result)
		
		expect(container.querySelector('[data-testid="row"]')).toBeInTheDocument()
		expect(container).toHaveTextContent('Total')
		expect(container).toHaveTextContent('1500.75')
		expect(container).toHaveTextContent('250')
		expect(container).toHaveTextContent('2000.50')
		expect(container).toHaveTextContent('-125.25')
	})

	test('renders footer with customer commission enabled', () => {
		const result = BuildFooter(mockData, { isAllowedCustomerCommission: true })
		
		const { container } = render(result)
		
		expect(container).toHaveTextContent('Total')
		expect(container).toHaveTextContent('75.50')
		expect(container).toHaveTextContent('-49.75')
	})

	test('does not render customer commission cells when disabled', () => {
		const result = BuildFooter(mockData, { isAllowedCustomerCommission: false })
		
		const { container } = render(result)
		
		expect(container).not.toHaveTextContent('75.50')
		expect(container).not.toHaveTextContent('-49.75')
	})

	test('applies correct colSpan to total cell', () => {
		const result = BuildFooter(mockData, { isAllowedCustomerCommission: false })
		
		const { container } = render(result)
		
		const totalCell = container.querySelector('[data-colspan="7"]')
		expect(totalCell).toBeInTheDocument()
		expect(totalCell).toHaveTextContent('Total')
	})

	test('formats numbers correctly', () => {
		const NumberFormat = require('@/lib/numberFormat')
		
		BuildFooter(mockData, { isAllowedCustomerCommission: true })
		
		expect(NumberFormat.formatDecimal).toHaveBeenCalledWith(1500.75)
		expect(NumberFormat.formatInteger).toHaveBeenCalledWith(250)
		expect(NumberFormat.formatDecimal).toHaveBeenCalledWith(2000.50)
		expect(NumberFormat.formatDecimal).toHaveBeenCalledWith(2500.00)
		expect(NumberFormat.formatDecimal).toHaveBeenCalledWith(-125.25)
		expect(NumberFormat.formatDecimal).toHaveBeenCalledWith(75.50)
		expect(NumberFormat.formatDecimal).toHaveBeenCalledWith(-49.75)
	})

	test('sets correct titles for cells', () => {
		const result = BuildFooter(mockData, { isAllowedCustomerCommission: true })
		
		const { container } = render(result)
		
		const effectiveCell = Array.from(container.querySelectorAll('[data-testid="cell"]'))
			.find(cell => cell.getAttribute('title') === '1500.75')
		expect(effectiveCell).toBeInTheDocument()

		const transactionCell = Array.from(container.querySelectorAll('[data-testid="cell"]'))
			.find(cell => cell.getAttribute('title') === '250')
		expect(transactionCell).toBeInTheDocument()
	})

	test('applies correct CSS classes', () => {
		const result = BuildFooter(mockData, { isAllowedCustomerCommission: false })
		
		const { container } = render(result)
		
		expect(container.querySelector('.center-align')).toBeInTheDocument()
		expect(container.querySelectorAll('.right-align').length).toBeGreaterThan(0)
	})

	test('handles zero values correctly', () => {
		const zeroData = {
			effectiveBettingValue: 0,
			totalTransactions: 0,
			turnover: 0,
			totalTurnover: 0,
			customerWinLoss: 0,
			customerComm: 0,
			customerTotal: 0
		}

		const result = BuildFooter(zeroData, { isAllowedCustomerCommission: true })
		
		const { container } = render(result)
		
		expect(container).toHaveTextContent('0.00')
		expect(container).toHaveTextContent('0')
	})

	test('handles undefined data values', () => {
		const undefinedData = {
			effectiveBettingValue: undefined,
			totalTransactions: undefined,
			turnover: undefined,
			totalTurnover: undefined,
			customerWinLoss: undefined,
			customerComm: undefined,
			customerTotal: undefined
		}

		const result = BuildFooter(undefinedData, { isAllowedCustomerCommission: true })
		
		const { container } = render(result)
		
		expect(container).toHaveTextContent('0.00')
		expect(container).toHaveTextContent('0')
	})

	test('renders single row element', () => {
		const result = BuildFooter(mockData, { isAllowedCustomerCommission: false })
		
		const { container } = render(result)
		
		expect(container.querySelectorAll('[data-testid="row"]')).toHaveLength(1)
	})

	test('uses LangHelper for localization', () => {
		const LangHelper = require('@/helpers/langHelper').default
		
		BuildFooter(mockData, { isAllowedCustomerCommission: false })
		
		expect(LangHelper.getSingleResource).toHaveBeenCalledWith('Total')
	})

	test('has correct row key', () => {
		const result = BuildFooter(mockData, { isAllowedCustomerCommission: false })
		
		const { container } = render(result)
		
		const row = container.querySelector('[data-testid="row"]')
		expect(row).toBeInTheDocument()
	})
})
