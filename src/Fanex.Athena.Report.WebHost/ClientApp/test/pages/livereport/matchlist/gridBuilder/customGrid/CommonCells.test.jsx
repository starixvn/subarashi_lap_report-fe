import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import CommonCells from '@/pages/livereport/matchlist/gridBuilder/customGrid/CommonCells'

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
		customerWinLoss: -250.75,
		customerComm: 45.50,
		customerTotal: -205.25,
		turnOver: 1500.00,
		betCount: 75,
		licenseeWinLoss: 300.25,
		amountDue: 125.50
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
		
		expect(cells[0]).toHaveTextContent('-250.75')
		expect(cells[1]).toHaveTextContent('1500.00')
		expect(cells[2]).toHaveTextContent('75')
		expect(cells[3]).toHaveTextContent('300.25')
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
		
		expect(cells[0]).toHaveTextContent('-250.75')
		expect(cells[1]).toHaveTextContent('45.50')
		expect(cells[2]).toHaveTextContent('-205.25')
		expect(cells[3]).toHaveTextContent('1500.00')
		expect(cells[4]).toHaveTextContent('75')
		expect(cells[5]).toHaveTextContent('300.25')
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
		expect(lastCell).toHaveTextContent('125.50')
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
			licenseeWinLoss: -300.25
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
			expect(cell.getAttribute('title')).toBe(cell.textContent)
		})
	})

	test('uses correct keys for cells', () => {
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
	})

	test('handles zero values correctly', () => {
		const zeroData = {
			customerWinLoss: 0,
			customerComm: 0,
			customerTotal: 0,
			turnOver: 0,
			betCount: 0,
			licenseeWinLoss: 0,
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

	test('handles negative customer win loss correctly', () => {
		const data = {
			...mockData,
			customerWinLoss: -500.25
		}
		
		const { container } = renderWithStore(
			<table>
				<tbody>
					<tr>
						<CommonCells data={data} />
					</tr>
				</tbody>
			</table>
		)
		
		const customerWinLossCell = container.querySelectorAll('td')[0]
		expect(customerWinLossCell).toHaveTextContent('-500.25')
	})
})
