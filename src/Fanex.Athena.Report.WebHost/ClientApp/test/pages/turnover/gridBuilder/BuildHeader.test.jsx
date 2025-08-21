import React from 'react'
import { render } from '@testing-library/react'
import { BuildHeader } from '@/pages/turnover/gridBuilder/BuildHeader'

jest.mock('@/helpers/langHelper', () => ({
	getSingleResource: jest.fn((key) => {
		const translations = {
			'Date': 'Date',
			'OpeningBalance': 'Opening Balance',
			'Deposit': 'Deposit',
			'Withdrawal': 'Withdrawal',
			'Bonus': 'Bonus',
			'Adjustment': 'Adjustment',
			'ExtraPayout': 'Extra Payout',
			'Turnover': 'Turnover',
			'DrawGame': 'Draw Game',
			'NetTurnOver': 'Net Turnover',
			'PendingFunds': 'Pending Funds',
			'CustomerW_L': 'Customer W/L',
			'WinLoss': 'Win/Loss',
			'ClosingBalance': 'Closing Balance',
			'AffiliateTransfer': 'Affiliate Transfer',
			'CasinoTransfer': 'Casino Transfer',
			'Comm': 'Commission',
			'Total': 'Total'
		}
		return translations[key] || key
	})
}))

describe('BuildHeader', () => {
	test('builds header with all default columns', () => {
		const options = {
			hasCasinoTransfer: false,
			isEnableSingleWallet: false,
			isHidePlayerWL: false,
			hasCustomerComm: false
		}
		
		const result = BuildHeader(options)
		
		expect(result).toBeDefined()
		expect(Array.isArray(result)).toBe(true)
		expect(result.length).toBe(1)
		
		const { container } = render(<table><thead>{result}</thead></table>)
		
		expect(container.textContent).toContain('Date')
		expect(container.textContent).toContain('Opening Balance')
		expect(container.textContent).toContain('Deposit')
		expect(container.textContent).toContain('Withdrawal')
		expect(container.textContent).toContain('Bonus')
		expect(container.textContent).toContain('Adjustment')
		expect(container.textContent).toContain('Extra Payout')
		expect(container.textContent).toContain('Turnover')
		expect(container.textContent).toContain('Win/Loss')
		expect(container.textContent).toContain('Closing Balance')
		expect(container.textContent).toContain('Affiliate Transfer')
	})

	test('hides single wallet related columns when isEnableSingleWallet is true', () => {
		const options = {
			hasCasinoTransfer: false,
			isEnableSingleWallet: true,
			isHidePlayerWL: false,
			hasCustomerComm: false
		}
		
		const result = BuildHeader(options)
		const { container } = render(<table><thead>{result}</thead></table>)
		
		expect(container.textContent).not.toContain('Opening Balance')
		expect(container.textContent).not.toContain('Deposit')
		expect(container.textContent).not.toContain('Withdrawal')
		expect(container.textContent).not.toContain('Closing Balance')
	})

	test('shows casino transfer column when hasCasinoTransfer is true', () => {
		const options = {
			hasCasinoTransfer: true,
			isEnableSingleWallet: false,
			isHidePlayerWL: false,
			hasCustomerComm: false
		}
		
		const result = BuildHeader(options)
		const { container } = render(<table><thead>{result}</thead></table>)
		
		expect(container.textContent).toContain('Casino Transfer')
	})

	test('hides player win/loss column when isHidePlayerWL is true', () => {
		const options = {
			hasCasinoTransfer: false,
			isEnableSingleWallet: false,
			isHidePlayerWL: true,
			hasCustomerComm: false
		}
		
		const result = BuildHeader(options)
		const { container } = render(<table><thead>{result}</thead></table>)
		
		expect(container.textContent).not.toContain('Win/Loss')
		expect(container.textContent).not.toContain('Customer W/L')
	})

	test('builds second row when hasCustomerComm is true and isHidePlayerWL is false', () => {
		const options = {
			hasCasinoTransfer: false,
			isEnableSingleWallet: false,
			isHidePlayerWL: false,
			hasCustomerComm: true
		}
		
		const result = BuildHeader(options)
		
		expect(result.length).toBe(2)
		
		const { container } = render(<table><thead>{result}</thead></table>)
		
		expect(container.textContent).toContain('Customer W/L')
		expect(container.textContent).toContain('Commission')
		expect(container.textContent).toContain('Total')
	})

	test('does not build second row when hasCustomerComm is false', () => {
		const options = {
			hasCasinoTransfer: false,
			isEnableSingleWallet: false,
			isHidePlayerWL: false,
			hasCustomerComm: false
		}
		
		const result = BuildHeader(options)
		
		expect(result.length).toBe(1)
	})

	test('does not build second row when isHidePlayerWL is true', () => {
		const options = {
			hasCasinoTransfer: false,
			isEnableSingleWallet: false,
			isHidePlayerWL: true,
			hasCustomerComm: true
		}
		
		const result = BuildHeader(options)
		
		expect(result.length).toBe(1)
	})

	test('sets correct rowSpan for customer win/loss when hasCustomerComm is true', () => {
		const options = {
			hasCasinoTransfer: false,
			isEnableSingleWallet: false,
			isHidePlayerWL: false,
			hasCustomerComm: true
		}
		
		const result = BuildHeader(options)
		const { container } = render(<table><thead>{result}</thead></table>)
		
		const customerWLHeader = container.querySelector('th[rowspan="1"]')
		expect(customerWLHeader).toBeInTheDocument()
	})

	test('sets correct rowSpan for customer win/loss when hasCustomerComm is false', () => {
		const options = {
			hasCasinoTransfer: false,
			isEnableSingleWallet: false,
			isHidePlayerWL: false,
			hasCustomerComm: false
		}
		
		const result = BuildHeader(options)
		const { container } = render(<table><thead>{result}</thead></table>)
		
		const rowSpan2Headers = container.querySelectorAll('th[rowspan="2"]')
		expect(rowSpan2Headers.length).toBeGreaterThan(0)
	})

	test('handles all options being true', () => {
		const options = {
			hasCasinoTransfer: true,
			isEnableSingleWallet: true,
			isHidePlayerWL: true,
			hasCustomerComm: true
		}
		
		const result = BuildHeader(options)
		
		expect(result).toBeDefined()
		expect(Array.isArray(result)).toBe(true)
		expect(result.length).toBe(1)
	})

	test('handles all options being false', () => {
		const options = {
			hasCasinoTransfer: false,
			isEnableSingleWallet: false,
			isHidePlayerWL: false,
			hasCustomerComm: false
		}
		
		const result = BuildHeader(options)
		
		expect(result).toBeDefined()
		expect(Array.isArray(result)).toBe(true)
		expect(result.length).toBe(1)
	})
})
