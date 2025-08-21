import React from 'react'
import { render } from '@testing-library/react'
import { BreakdownRow } from '@/pages/winlossanalysis/common/grid/BreakdownRow'

jest.mock('@legion-lib/react-grid', () => ({
	Row: ({ children, className, ...props }) => <div className={className} {...props}>{children}</div>,
	Cell: ({ children, className, colSpan, ...props }) => (
		<div className={className} data-colspan={colSpan} {...props}>{children}</div>
	)
}))

jest.mock('@/lib/numberFormat', () => ({
	format: jest.fn((value) => value?.toLocaleString() || '0'),
	formatDecimal: jest.fn((value) => value?.toFixed(2) || '0.00')
}))

describe('BreakdownRow', () => {
	const mockData = {
		betCount: 100,
		turnover: 1000.50,
		netTurnover: 950.25,
		playerWinloss: -50.75,
		playerComm: 25.00,
		betEffective: 900.00,
		licWinloss: 45.25,
		licComm: 5.50,
		margin: 0.045,
		breakBy: 'SOCCER',
		groupBy: 'SPORT',
		breakDownFieldText: 'Soccer Breakdown',
		externalId: 'EXT123'
	}

	const defaultOptions = {
		isGroupByPlayerMode: false,
		isBreakDownPlayerMode: false
	}

	test('renders with basic data', () => {
		const { container } = render(
			<BreakdownRow data={mockData} option={defaultOptions} />
		)

		expect(container.querySelector('.detail-row')).toBeInTheDocument()
		expect(container.textContent).toContain('Soccer Breakdown')
		expect(container.textContent).toContain('100')
		expect(container.textContent).toContain('1000.50')
	})

	test('applies negative class for negative licWinloss', () => {
		const dataWithNegativeLicWinloss = {
			...mockData,
			licWinloss: -25.75
		}

		const { container } = render(
			<BreakdownRow data={dataWithNegativeLicWinloss} option={defaultOptions} />
		)

		const negativeCell = container.querySelector('.negative')
		expect(negativeCell).toBeInTheDocument()
		expect(negativeCell).toHaveTextContent('-25.75')
	})

	test('applies negative class for negative margin', () => {
		const dataWithNegativeMargin = {
			...mockData,
			margin: -0.025
		}

		const { container } = render(
			<BreakdownRow data={dataWithNegativeMargin} option={defaultOptions} />
		)

		const negativeCells = container.querySelectorAll('.negative')
		expect(negativeCells.length).toBeGreaterThan(0)
		
		const marginCell = Array.from(negativeCells).find(cell => 
			cell.textContent.includes('%')
		)
		expect(marginCell).toHaveTextContent('-2.50%')
	})

	test('renders with GroupByPlayerMode enabled', () => {
		const playerModeOptions = {
			isGroupByPlayerMode: true,
			isBreakDownPlayerMode: false
		}

		const { container } = render(
			<BreakdownRow data={mockData} option={playerModeOptions} />
		)

		const breakByCells = container.querySelectorAll('[data-colspan="2"]')
		expect(breakByCells.length).toBeGreaterThan(0)

		expect(container.textContent).toContain('900.00')
	})

	test('renders with BreakDownPlayerMode enabled', () => {
		const playerBreakdownOptions = {
			isGroupByPlayerMode: false,
			isBreakDownPlayerMode: true
		}

		const { container } = render(
			<BreakdownRow data={mockData} option={playerBreakdownOptions} />
		)

		expect(container.textContent).toContain('EXT123')
	})

	test('renders with both player modes enabled', () => {
		const bothModesOptions = {
			isGroupByPlayerMode: true,
			isBreakDownPlayerMode: true
		}

		const { container } = render(
			<BreakdownRow data={mockData} option={bothModesOptions} />
		)

		expect(container.textContent).toContain('EXT123')
		expect(container.textContent).toContain('900.00')
		
		const breakByCells = container.querySelectorAll('[data-colspan="2"]')
		expect(breakByCells.length).toBeGreaterThan(0)
	})

	test('formats numbers correctly', () => {
		const NumberFormat = require('@/lib/numberFormat')

		render(<BreakdownRow data={mockData} option={defaultOptions} />)

		expect(NumberFormat.format).toHaveBeenCalledWith(100)
		expect(NumberFormat.formatDecimal).toHaveBeenCalledWith(1000.50)
		expect(NumberFormat.formatDecimal).toHaveBeenCalledWith(950.25)
		expect(NumberFormat.formatDecimal).toHaveBeenCalledWith(-50.75)
	})

	test('handles zero and undefined values', () => {
		const dataWithZeros = {
			...mockData,
			betCount: 0,
			turnover: undefined,
			margin: 0
		}

		const { container } = render(
			<BreakdownRow data={dataWithZeros} option={defaultOptions} />
		)

		expect(container.querySelector('.detail-row')).toBeInTheDocument()
		expect(container.textContent).toContain('0.00%')
	})

	test('generates correct row key', () => {
		const { container } = render(
			<BreakdownRow data={mockData} option={defaultOptions} />
		)

		const row = container.querySelector('.detail-row')
		expect(row).toBeInTheDocument()
	})

	test('applies correct cell alignments', () => {
		const { container } = render(
			<BreakdownRow data={mockData} option={defaultOptions} />
		)

		expect(container.querySelector('.left-align.break-by-cell')).toBeInTheDocument()
		expect(container.querySelectorAll('.right-align').length).toBeGreaterThan(0)
	})

	test('displays margin as percentage', () => {
		const { container } = render(
			<BreakdownRow data={mockData} option={defaultOptions} />
		)

		expect(container.textContent).toContain('4.50%')
	})

	test('handles missing option properties', () => {
		const incompleteOptions = {}

		const { container } = render(
			<BreakdownRow data={mockData} option={incompleteOptions} />
		)

		expect(container.querySelector('.detail-row')).toBeInTheDocument()
		expect(container.textContent).toContain('Soccer Breakdown')
	})
})
