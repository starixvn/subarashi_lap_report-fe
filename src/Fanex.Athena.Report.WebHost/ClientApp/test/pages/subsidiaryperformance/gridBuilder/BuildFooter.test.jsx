import React from 'react'
import { render } from '@testing-library/react'
import { BuildFooter } from '@/pages/subsidiaryperformance/gridBuilder/BuildFooter'
import { ReportLevel, SubsidiaryViewType } from '@/constants/report'

jest.mock('@/pages/subsidiaryperformance/gridBuilder/CommonCells', () => {
	return function MockCommonCells({ data, index }) {
		return <div data-testid={`common-cells-${index}`}>{JSON.stringify(data)}</div>
	}
})

jest.mock('@/pages/subsidiaryperformance/common/tableSetting', () => ({
	TotalText: {
		TotalIn: 'Total In',
		Total: 'Total',
		Based: 'Based'
	}
}))

describe('BuildFooter', () => {
	const mockTotalData = {
		USD: {
			currencyName: 'USD',
			betCount: 100,
			turnover: 1000,
			customerWinLoss: -50,
			subsidiaryWinLoss: 50
		},
		EUR: {
			currencyName: 'EUR',
			betCount: 50,
			turnover: 500,
			customerWinLoss: -25,
			subsidiaryWinLoss: 25
		}
	}

	const mockGrandTotalData = {
		currencyName: 'USD',
		betCount: 150,
		turnover: 1500,
		customerWinLoss: -75,
		subsidiaryWinLoss: 75
	}

	const mockData = {
		totalData: mockTotalData,
		grandTotalData: mockGrandTotalData
	}

	const mockOptions = {
		baseCurrency: 'USD',
		viewType: SubsidiaryViewType.MASTER_MANAGEMENT
	}

	test('returns detail footer when drillDownLevel is CUSTOMER', () => {
		const options = { ...mockOptions, drillDownLevel: ReportLevel.CUSTOMER }
		
		const result = BuildFooter(mockData, options)
		
		expect(result).toBeDefined()
		expect(Array.isArray(result)).toBe(true)
	})

	test('returns main footer when drillDownLevel is not CUSTOMER', () => {
		const options = { ...mockOptions, drillDownLevel: ReportLevel.SUBSIDIARY }
		
		const result = BuildFooter(mockData, options)
		
		expect(result).toBeDefined()
		expect(Array.isArray(result)).toBe(true)
	})

	test('builds detail footer with correct structure', () => {
		const options = { ...mockOptions, drillDownLevel: ReportLevel.CUSTOMER }
		
		const { container } = render(<div>{BuildFooter(mockData, options)}</div>)
		
		const rows = container.querySelectorAll('.light-footer')
		expect(rows).toHaveLength(2)
		
		const centerAlignCells = container.querySelectorAll('.center-align')
		expect(centerAlignCells.length).toBeGreaterThan(0)
	})

	test('builds detail footer without grand total', () => {
		const dataWithoutGrandTotal = { totalData: mockTotalData }
		const options = { ...mockOptions, drillDownLevel: ReportLevel.CUSTOMER }
		
		const result = BuildFooter(dataWithoutGrandTotal, options)
		
		expect(result).toBeDefined()
		expect(Array.isArray(result)).toBe(true)
		expect(result.length).toBe(2)
	})

	test('builds detail grand total when grandTotalData exists', () => {
		const options = { ...mockOptions, drillDownLevel: ReportLevel.CUSTOMER }
		
		const { container } = render(<div>{BuildFooter(mockData, options)}</div>)
		
		const grandTotalRow = container.querySelector('[data-testid="common-cells-grandTotal"]')
		expect(grandTotalRow).toBeInTheDocument()
	})

	test('builds main footer with correct column span for MASTER_MANAGEMENT', () => {
		const options = { 
			...mockOptions, 
			drillDownLevel: ReportLevel.SUBSIDIARY,
			viewType: SubsidiaryViewType.MASTER_MANAGEMENT
		}
		
		const { container } = render(<div>{BuildFooter(mockData, options)}</div>)
		
		const cells = container.querySelectorAll('td[colspan="2"]')
		expect(cells.length).toBeGreaterThan(0)
	})

	test('builds main footer with correct column span for non-MASTER_MANAGEMENT', () => {
		const options = { 
			...mockOptions, 
			drillDownLevel: ReportLevel.SUBSIDIARY,
			viewType: SubsidiaryViewType.WHITE_LABEL
		}
		
		const { container } = render(<div>{BuildFooter(mockData, options)}</div>)
		
		const rows = container.querySelectorAll('.light-footer')
		expect(rows.length).toBeGreaterThan(0)
	})

	test('builds main grand total with correct structure', () => {
		const options = { 
			...mockOptions, 
			drillDownLevel: ReportLevel.SUBSIDIARY,
			viewType: SubsidiaryViewType.MASTER_MANAGEMENT
		}
		
		const { container } = render(<div>{BuildFooter(mockData, options)}</div>)
		
		const grandTotalRow = container.querySelector('[data-testid="common-cells-grandTotal"]')
		expect(grandTotalRow).toBeInTheDocument()
	})

	test('returns null for detail grand total when no grandTotalData', () => {
		const options = { ...mockOptions, drillDownLevel: ReportLevel.CUSTOMER }
		const dataWithoutGrandTotal = { totalData: mockTotalData, grandTotalData: null }
		
		const result = BuildFooter(dataWithoutGrandTotal, options)
		
		expect(result.length).toBe(2)
	})

	test('returns null for main grand total when no grandTotalData', () => {
		const options = { ...mockOptions, drillDownLevel: ReportLevel.SUBSIDIARY }
		const dataWithoutGrandTotal = { totalData: mockTotalData, grandTotalData: null }
		
		const result = BuildFooter(dataWithoutGrandTotal, options)
		
		expect(result.length).toBe(2)
	})

	test('handles empty totalData object', () => {
		const emptyData = { totalData: {}, grandTotalData: mockGrandTotalData }
		const options = { ...mockOptions, drillDownLevel: ReportLevel.CUSTOMER }
		
		const result = BuildFooter(emptyData, options)
		
		expect(result).toBeDefined()
		expect(Array.isArray(result)).toBe(true)
	})
})
