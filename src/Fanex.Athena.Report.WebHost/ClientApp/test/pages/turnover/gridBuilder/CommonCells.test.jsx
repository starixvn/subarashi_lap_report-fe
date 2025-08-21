import React from 'react'
import { render } from '@testing-library/react'
import CommonCells from '@/pages/turnover/gridBuilder/CommonCells'

jest.mock('@legion-lib/react-grid', () => ({
	Cell: ({ children, className, title }) => (
		<td className={className} title={title}>
			{children}
		</td>
	)
}))

jest.mock('@/lib/numberFormat', () => ({
	formatDecimal: jest.fn((value) => value ? value.toFixed(2) : '0.00'),
	format: jest.fn((value) => value ? value.toString() : '0')
}))

describe('CommonCells', () => {
	const mockData = {
		openingBalance: 1000.50,
		deposit: 500.25,
		withdrawal: -200.75,
		bonus: 100.00,
		adjustment: 50.50,
		promotion: 25.25,
		turnover: 2000.00,
		drawGame: 150.00,
		netTurnover: 1850.00,
		pendingFunds: 75.00,
		winLoss: -300.00,
		winLossComm: -250.00,
		playerComm: 45.00,
		closingBalance: 1200.75,
		affiliateTransfer: 30.00,
		transfer3rd: 15.00
	}

	const defaultOptions = {
		hasCustomerComm: false,
		hasCasinoTransfer: false,
		isEnableSingleWallet: false,
		isHidePlayerWL: false
	}

	test('renders all default columns when no special options are set', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells 
							data={mockData} 
							options={defaultOptions}
							hideClosingBalance={false}
							hideOpeningBalance={false}
						/>
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td')
		expect(cells.length).toBeGreaterThan(10)
		
		expect(container.textContent).toContain('1000.50')
		expect(container.textContent).toContain('500.25')
		expect(container.textContent).toContain('-200.75')
		expect(container.textContent).toContain('100.00')
		expect(container.textContent).toContain('2000.00')
		expect(container.textContent).toContain('-300.00')
		expect(container.textContent).toContain('1200.75')
	})

	test('hides single wallet columns when isEnableSingleWallet is true', () => {
		const options = { ...defaultOptions, isEnableSingleWallet: true }
		
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells 
							data={mockData} 
							options={options}
							hideClosingBalance={false}
							hideOpeningBalance={false}
						/>
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td')
		expect(cells.length).toBeLessThan(15)
	})

	test('shows customer commission columns when hasCustomerComm is true', () => {
		const options = { ...defaultOptions, hasCustomerComm: true }
		
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells 
							data={mockData} 
							options={options}
							hideClosingBalance={false}
							hideOpeningBalance={false}
						/>
					</tr>
				</tbody>
			</table>
		)
		
		expect(container.textContent).toContain('45.00')
		expect(container.textContent).toContain('-250.00')
	})

	test('shows casino transfer column when hasCasinoTransfer is true', () => {
		const options = { ...defaultOptions, hasCasinoTransfer: true }
		
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells 
							data={mockData} 
							options={options}
							hideClosingBalance={false}
							hideOpeningBalance={false}
						/>
					</tr>
				</tbody>
			</table>
		)
		
		expect(container.textContent).toContain('15.00')
	})

	test('hides player win/loss when isHidePlayerWL is true', () => {
		const options = { ...defaultOptions, isHidePlayerWL: true }
		
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells 
							data={mockData} 
							options={options}
							hideClosingBalance={false}
							hideOpeningBalance={false}
						/>
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td')
		const winLossCells = Array.from(cells).filter(cell => 
			cell.textContent === '-300.00' && cell.title === '-300.00'
		)
		expect(winLossCells.length).toBe(0)
	})

	test('shows dashes for hidden balance columns', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells 
							data={mockData} 
							options={defaultOptions}
							hideClosingBalance={true}
							hideOpeningBalance={true}
						/>
					</tr>
				</tbody>
			</table>
		)
		
		const dashCells = Array.from(container.querySelectorAll('td')).filter(cell => 
			cell.textContent === '-'
		)
		expect(dashCells.length).toBe(2)
	})

	test('applies correct CSS classes for alignment', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells 
							data={mockData} 
							options={defaultOptions}
							hideClosingBalance={false}
							hideOpeningBalance={false}
						/>
					</tr>
				</tbody>
			</table>
		)
		
		const rightAlignCells = container.querySelectorAll('.right-align')
		const centerAlignCells = container.querySelectorAll('.center-align')
		
		expect(rightAlignCells.length).toBeGreaterThan(5)
		expect(centerAlignCells.length).toBe(0)
	})

	test('applies center-align class for hidden data', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells 
							data={mockData} 
							options={defaultOptions}
							hideClosingBalance={true}
							hideOpeningBalance={true}
						/>
					</tr>
				</tbody>
			</table>
		)
		
		const centerAlignCells = container.querySelectorAll('.center-align')
		expect(centerAlignCells.length).toBe(2)
	})

	test('sets correct titles for cells', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells 
							data={mockData} 
							options={defaultOptions}
							hideClosingBalance={false}
							hideOpeningBalance={false}
						/>
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td[title]')
		expect(cells.length).toBeGreaterThan(10)
		
		cells.forEach(cell => {
			expect(cell.getAttribute('title')).toBe(cell.textContent)
		})
	})

	test('handles all options enabled', () => {
		const allEnabledOptions = {
			hasCustomerComm: true,
			hasCasinoTransfer: true,
			isEnableSingleWallet: true,
			isHidePlayerWL: true
		}
		
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells 
							data={mockData} 
							options={allEnabledOptions}
							hideClosingBalance={false}
							hideOpeningBalance={false}
						/>
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td')
		expect(cells.length).toBeGreaterThan(5)
	})

	test('handles missing data properties', () => {
		const incompleteData = {
			bonus: 100.00,
			turnover: 2000.00
		}
		
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells 
							data={incompleteData} 
							options={defaultOptions}
							hideClosingBalance={false}
							hideOpeningBalance={false}
						/>
					</tr>
				</tbody>
			</table>
		)
		
		expect(container.textContent).toContain('100.00')
		expect(container.textContent).toContain('2000.00')
		expect(container.textContent).toContain('0.00')
	})

	test('renders without crashing when data is empty', () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<CommonCells 
							data={{}} 
							options={defaultOptions}
							hideClosingBalance={false}
							hideOpeningBalance={false}
						/>
					</tr>
				</tbody>
			</table>
		)
		
		expect(container.querySelector('tr')).toBeInTheDocument()
	})
})
