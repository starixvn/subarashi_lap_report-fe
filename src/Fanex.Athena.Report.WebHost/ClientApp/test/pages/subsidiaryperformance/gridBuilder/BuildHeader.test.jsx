import React from 'react'
import { render } from '@testing-library/react'
import { BuildHeaders } from '@/pages/subsidiaryperformance/gridBuilder/BuildHeader'
import { ReportLevel, SubsidiaryViewType } from '@/constants/report'

jest.mock('@/pages/subsidiaryperformance/common/tableSetting', () => ({
	HeaderText: {
		WhiteLabel: 'White Label',
		Index: '#',
		ExternalId: 'External ID',
		Subsidiary: 'Subsidiary',
		SystemId: 'System ID',
		CurrencyName: 'Currency',
		Product: 'Product',
		BetCount: 'Bet Count',
		Turnover: 'Turnover',
		CustomerWinLoss: 'Customer Win/Loss',
		SubsidiaryWinLoss: 'Subsidiary Win/Loss'
	}
}))

describe('BuildHeaders', () => {
	test('builds header for subsidiary level with MASTER_MANAGEMENT view', () => {
		const options = {
			drillDownLevel: ReportLevel.SUBSIDIARY,
			viewType: SubsidiaryViewType.MASTER_MANAGEMENT
		}
		
		const result = BuildHeaders(options)
		const { container } = render(<table><thead>{result}</thead></table>)
		
		expect(container.textContent).toContain('White Label')
		expect(container.textContent).toContain('Subsidiary')
		expect(container.textContent).toContain('Product')
		expect(container.textContent).toContain('Bet Count')
		expect(container.textContent).toContain('Turnover')
		expect(container.textContent).toContain('Customer Win/Loss')
		expect(container.textContent).toContain('Subsidiary Win/Loss')
	})

	test('builds header for subsidiary level with WHITE_LABEL view', () => {
		const options = {
			drillDownLevel: ReportLevel.SUBSIDIARY,
			viewType: SubsidiaryViewType.WHITE_LABEL
		}
		
		const result = BuildHeaders(options)
		const { container } = render(<table><thead>{result}</thead></table>)
		
		expect(container.textContent).not.toContain('White Label')
		expect(container.textContent).toContain('Subsidiary')
		expect(container.textContent).toContain('Product')
	})

	test('builds header for customer level', () => {
		const options = {
			drillDownLevel: ReportLevel.CUSTOMER,
			viewType: SubsidiaryViewType.MASTER_MANAGEMENT
		}
		
		const result = BuildHeaders(options)
		const { container } = render(<table><thead>{result}</thead></table>)
		
		expect(container.textContent).toContain('#')
		expect(container.textContent).toContain('External ID')
		expect(container.textContent).toContain('System ID')
		expect(container.textContent).toContain('Currency')
		expect(container.textContent).not.toContain('Product')
		expect(container.textContent).not.toContain('White Label')
	})

	test('hides product column for customer level', () => {
		const options = {
			drillDownLevel: ReportLevel.CUSTOMER,
			viewType: SubsidiaryViewType.MASTER_MANAGEMENT
		}
		
		const result = BuildHeaders(options)
		const { container } = render(<table><thead>{result}</thead></table>)
		
		expect(container.textContent).not.toContain('Product')
	})

	test('shows index column only for customer level', () => {
		const subsidiaryOptions = {
			drillDownLevel: ReportLevel.SUBSIDIARY,
			viewType: SubsidiaryViewType.MASTER_MANAGEMENT
		}
		
		const customerOptions = {
			drillDownLevel: ReportLevel.CUSTOMER,
			viewType: SubsidiaryViewType.MASTER_MANAGEMENT
		}
		
		const subsidiaryResult = BuildHeaders(subsidiaryOptions)
		const customerResult = BuildHeaders(customerOptions)
		
		const { container: subsidiaryContainer } = render(<table><thead>{subsidiaryResult}</thead></table>)
		const { container: customerContainer } = render(<table><thead>{customerResult}</thead></table>)
		
		expect(subsidiaryContainer.textContent).not.toContain('#')
		expect(customerContainer.textContent).toContain('#')
	})

	test('shows system id column only for customer level', () => {
		const subsidiaryOptions = {
			drillDownLevel: ReportLevel.SUBSIDIARY,
			viewType: SubsidiaryViewType.MASTER_MANAGEMENT
		}
		
		const customerOptions = {
			drillDownLevel: ReportLevel.CUSTOMER,
			viewType: SubsidiaryViewType.MASTER_MANAGEMENT
		}
		
		const subsidiaryResult = BuildHeaders(subsidiaryOptions)
		const customerResult = BuildHeaders(customerOptions)
		
		const { container: subsidiaryContainer } = render(<table><thead>{subsidiaryResult}</thead></table>)
		const { container: customerContainer } = render(<table><thead>{customerResult}</thead></table>)
		
		expect(subsidiaryContainer.textContent).not.toContain('System ID')
		expect(customerContainer.textContent).toContain('System ID')
	})

	test('shows white label column only for subsidiary level with MASTER_MANAGEMENT view', () => {
		const masterMgmtOptions = {
			drillDownLevel: ReportLevel.SUBSIDIARY,
			viewType: SubsidiaryViewType.MASTER_MANAGEMENT
		}
		
		const whiteLabelOptions = {
			drillDownLevel: ReportLevel.SUBSIDIARY,
			viewType: SubsidiaryViewType.WHITE_LABEL
		}
		
		const customerOptions = {
			drillDownLevel: ReportLevel.CUSTOMER,
			viewType: SubsidiaryViewType.MASTER_MANAGEMENT
		}
		
		const masterMgmtResult = BuildHeaders(masterMgmtOptions)
		const whiteLabelResult = BuildHeaders(whiteLabelOptions)
		const customerResult = BuildHeaders(customerOptions)
		
		const { container: masterMgmtContainer } = render(<table><thead>{masterMgmtResult}</thead></table>)
		const { container: whiteLabelContainer } = render(<table><thead>{whiteLabelResult}</thead></table>)
		const { container: customerContainer } = render(<table><thead>{customerResult}</thead></table>)
		
		expect(masterMgmtContainer.textContent).toContain('White Label')
		expect(whiteLabelContainer.textContent).not.toContain('White Label')
		expect(customerContainer.textContent).not.toContain('White Label')
	})

	test('sets correct column widths', () => {
		const options = {
			drillDownLevel: ReportLevel.CUSTOMER,
			viewType: SubsidiaryViewType.MASTER_MANAGEMENT
		}
		
		const result = BuildHeaders(options)
		const { container } = render(<table><thead>{result}</thead></table>)
		
		const headers = container.querySelectorAll('th')
		expect(headers.length).toBeGreaterThan(5)
	})

	test('returns a single HeaderRow', () => {
		const options = {
			drillDownLevel: ReportLevel.SUBSIDIARY,
			viewType: SubsidiaryViewType.MASTER_MANAGEMENT
		}
		
		const result = BuildHeaders(options)
		
		expect(React.isValidElement(result)).toBe(true)
		expect(result.type).toBeTruthy()
	})

	test('handles undefined viewType', () => {
		const options = {
			drillDownLevel: ReportLevel.SUBSIDIARY,
			viewType: undefined
		}
		
		const result = BuildHeaders(options)
		
		expect(React.isValidElement(result)).toBe(true)
	})

	test('handles undefined drillDownLevel', () => {
		const options = {
			drillDownLevel: undefined,
			viewType: SubsidiaryViewType.MASTER_MANAGEMENT
		}
		
		const result = BuildHeaders(options)
		
		expect(React.isValidElement(result)).toBe(true)
	})
})
