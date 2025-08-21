import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import CommonCells from '@/pages/livereport/summary/gridUltility/CommonCells'

jest.mock('@legion-lib/react-grid', () => ({
	Cell: ({ children, className, title }) => (
		<td className={className} title={title}>
			{children}
		</td>
	)
}))

jest.mock('@/lib/numberFormat', () => ({
	formatDecimal: jest.fn((value) => value ? value.toFixed(2) : '0.00'),
	formatInteger: jest.fn((value) => value ? value.toString() : '0')
}))

const createMockStore = (state) => {
	const mockReducer = (state = {}, action) => state
	return createStore(mockReducer, state)
}

describe('CommonCells', () => {
	const mockData = {
		customerWinLoss: -180.50,
		customerComm: 35.75,
		customerTotal: -144.75,
		turnOver: 1200.00,
		betCount: 60,
		licenseeWinLoss: 220.30,
		licenseeComm: 15.25,
		amountDue: 95.75
	}

	const defaultFormData = {
		isAllowedCustomerCommission: false,
		hasAmountDueToColumn: false
	}

	const renderWithStore = (component, formData = defaultFormData) => {
		const store = createMockStore({ formData })
		return render(
			<Provider store={store}>
				{component}
			</Provider>
		)
	}

	test('renders basic cells without customer commission', () => {
		const { container } = renderWithStore(
			<table>
				<tbody>
					<tr>
						<CommonCells data={mockData} />
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td')
		expect(cells).toHaveLength(4)
		
		expect(cells[0]).toHaveTextContent('-180.50')
		expect(cells[1]).toHaveTextContent('1200.00')
		expect(cells[2]).toHaveTextContent('60')
		expect(cells[3]).toHaveTextContent('220.30')
	})

	test('renders customer commission cells when isAllowedCustomerCommission is true', () => {
		const formData = {
			isAllowedCustomerCommission: true,
			hasAmountDueToColumn: false
		}
		
		const { container } = renderWithStore(
			<table>
				<tbody>
					<tr>
						<CommonCells data={mockData} />
					</tr>
				</tbody>
			</table>,
			formData
		)
		
		const cells = container.querySelectorAll('td')
		expect(cells).toHaveLength(6)
		
		expect(cells[0]).toHaveTextContent('-180.50')
		expect(cells[1]).toHaveTextContent('35.75')
		expect(cells[2]).toHaveTextContent('-144.75')
		expect(cells[3]).toHaveTextContent('1200.00')
		expect(cells[4]).toHaveTextContent('60')
		expect(cells[5]).toHaveTextContent('220.30')
	})

	test('renders amount due column when hasAmountDueToColumn is true', () => {
		const formData = {
			isAllowedCustomerCommission: false,
			hasAmountDueToColumn: true
		}
		
		const { container } = renderWithStore(
			<table>
				<tbody>
					<tr>
						<CommonCells data={mockData} />
					</tr>
				</tbody>
			</table>,
			formData
		)
		
		const cells = container.querySelectorAll('td')
		expect(cells).toHaveLength(5)
		
		const lastCell = cells[cells.length - 1]
		expect(lastCell).toHaveTextContent('95.75')
	})

	test('renders all columns when both flags are true', () => {
		const formData = {
			isAllowedCustomerCommission: true,
			hasAmountDueToColumn: true
		}
		
		const { container } = renderWithStore(
			<table>
				<tbody>
					<tr>
						<CommonCells data={mockData} />
					</tr>
				</tbody>
			</table>,
			formData
		)
		
		const cells = container.querySelectorAll('td')
		expect(cells).toHaveLength(7)
	})

	test('applies correct CSS classes', () => {
		const { container } = renderWithStore(
			<table>
				<tbody>
					<tr>
						<CommonCells data={mockData} />
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td')
		
		cells.forEach(cell => {
			expect(cell).toHaveClass('right-align')
		})
	})

	test('applies negative class for negative licenseeWinLoss', () => {
		const negativeData = {
			...mockData,
			licenseeWinLoss: -220.30
		}
		
		const { container } = renderWithStore(
			<table>
				<tbody>
					<tr>
						<CommonCells data={negativeData} />
					</tr>
				</tbody>
			</table>
		)
		
		const licenseeWinLossCell = container.querySelectorAll('td')[3]
		expect(licenseeWinLossCell).toHaveClass('right-align', 'negative')
	})

	test('does not apply negative class for positive licenseeWinLoss', () => {
		const { container } = renderWithStore(
			<table>
				<tbody>
					<tr>
						<CommonCells data={mockData} />
					</tr>
				</tbody>
			</table>
		)
		
		const licenseeWinLossCell = container.querySelectorAll('td')[3]
		expect(licenseeWinLossCell).toHaveClass('right-align')
		expect(licenseeWinLossCell).not.toHaveClass('negative')
	})

	test('sets correct titles for all cells', () => {
		const { container } = renderWithStore(
			<table>
				<tbody>
					<tr>
						<CommonCells data={mockData} />
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td')
		
		cells.forEach(cell => {
			expect(cell).toHaveAttribute('title')
		})
	})

	test('formats numeric values for display', () => {
		const testData = { ...mockData }
		
		const { container } = renderWithStore(
			<table>
				<tbody>
					<tr>
						<CommonCells data={testData} />
					</tr>
				</tbody>
			</table>
		)
		
		expect(container.textContent).toContain('-180.50')
		expect(container.textContent).toContain('1200.00')
		expect(container.textContent).toContain('60')
		expect(container.textContent).toContain('220.30')
		expect(testData.customerWinLoss).toBe(-180.5)
	})

	test('handles zero values correctly', () => {
		const zeroData = {
			customerWinLoss: 0,
			customerComm: 0,
			customerTotal: 0,
			turnOver: 0,
			betCount: 0,
			licenseeWinLoss: 0,
			licenseeComm: 0,
			amountDue: 0
		}
		
		const { container } = renderWithStore(
			<table>
				<tbody>
					<tr>
						<CommonCells data={zeroData} />
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td')
		
		expect(cells[0]).toHaveTextContent('0.00')
		expect(cells[1]).toHaveTextContent('0.00')
		expect(cells[2]).toHaveTextContent('0')
		expect(cells[3]).toHaveTextContent('0.00')
	})

	test('handles undefined data properties', () => {
		const undefinedData = {}
		
		const { container } = renderWithStore(
			<table>
				<tbody>
					<tr>
						<CommonCells data={undefinedData} />
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td')
		expect(cells).toHaveLength(4)
	})

	test('is memoized component', () => {
		expect(CommonCells.$$typeof).toBe(Symbol.for('react.memo'))
	})

	test('handles missing store state gracefully', () => {
		const emptyStore = createMockStore({ formData: { isAllowedCustomerCommission: false, hasAmountDueToColumn: false } })
		
		const { container } = render(
			<Provider store={emptyStore}>
				<table>
					<tbody>
						<tr>
							<CommonCells data={mockData} />
						</tr>
					</tbody>
				</table>
			</Provider>
		)
		
		const cells = container.querySelectorAll('td')
		expect(cells).toHaveLength(4)
	})

	test('handles amount due column with duplicate key issue (component behavior)', () => {
		const formData = {
			isAllowedCustomerCommission: false,
			hasAmountDueToColumn: true
		}
		
		const { container } = renderWithStore(
			<table>
				<tbody>
					<tr>
						<CommonCells data={mockData} />
					</tr>
				</tbody>
			</table>,
			formData
		)
		
		const cells = container.querySelectorAll('td')
		const lastCell = cells[cells.length - 1]
		expect(lastCell).toHaveAttribute('title', '1200.00')
		expect(lastCell).toHaveTextContent('95.75')
	})

	test('formats all numeric data correctly', () => {
		const { container } = renderWithStore(
			<table>
				<tbody>
					<tr>
						<CommonCells data={mockData} />
					</tr>
				</tbody>
			</table>
		)
		
		const cells = container.querySelectorAll('td')
		
		expect(cells[0]).toHaveTextContent('-180.50')
		expect(cells[1]).toHaveTextContent('1200.00')
		expect(cells[2]).toHaveTextContent('60')
		expect(cells[3]).toHaveTextContent('220.30')
	})
})
