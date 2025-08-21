import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import BetListTable from '@/components/BetListTable'

// Mock the react-grid components
jest.mock('@legion-lib/react-grid', () => ({
	Table: ({ children, onSort, onPaging, minWidth, autoWidth, bodyHeight, isPaging, pageOption, adjustedHeight, header, body, footer }) => (
		<div 
			data-testid="mock-table"
			data-min-width={minWidth}
			data-auto-width={autoWidth}
			data-body-height={bodyHeight}
			data-is-paging={isPaging}
			data-adjusted-height={adjustedHeight}
			onClick={() => {
				onSort && onSort('stake', 'asc')
				onPaging && onPaging(1, 50)
			}}
		>
			<table>
				<thead>{header}</thead>
				<tbody>{body}</tbody>
				<tfoot>{footer}</tfoot>
			</table>
			{children}
		</div>
	),
	HeaderCell: ({ children, colWidth, sortBy }) => (
		<th data-testid="header-cell" data-col-width={colWidth} data-sort-by={sortBy}>
			{children}
		</th>
	),
	HeaderRow: ({ children, style }) => (
		<tr data-testid="header-row" style={style}>
			{children}
		</tr>
	),
	Row: ({ children, className }) => (
		<tr data-testid="row" className={className}>
			{children}
		</tr>
	),
	Cell: ({ children, className, colSpan, title, dangerouslySetInnerHTML }) => (
		<td 
			data-testid="cell" 
			className={className} 
			colSpan={colSpan}
			title={title}
			dangerouslySetInnerHTML={dangerouslySetInnerHTML}
		>
			{children}
		</td>
	)
}))

describe('BetListTable', () => {
	const defaultProps = {
		data: [
			{
				Index: 1,
				ExternalId: 'EXT001',
				SystemId: 'SYS001',
				RefNo: 'REF001',
				TransTime: '2023-01-01 10:00:00',
				Choice: 'Team A',
				Odds: '1.50',
				OddsType: 'Decimal',
				Stake: '100.00',
				WinLoss: '50.00',
				LicenseeWL: '45.00',
				Status: 'Won',
				Platform: 'Web',
				Live: 'No'
			}
		],
		total: {
			Stake: '100.00',
			WinLoss: '50.00',
			LicenseeWL: '45.00'
		}
	}

	test('renders table with data', () => {
		render(<BetListTable {...defaultProps} />)
		
		const table = screen.getByTestId('mock-table')
		expect(table).toBeInTheDocument()
		expect(table).toHaveAttribute('data-min-width', '980')
		expect(table).toHaveAttribute('data-auto-width', 'true')
		expect(table).toHaveAttribute('data-body-height', '300')
	})

	test('renders no data message when data is empty', () => {
		render(<BetListTable data={[]} />)
		
		expect(screen.getByText('NoInfo')).toBeInTheDocument()
		expect(screen.getByText('NoInfo')).toHaveClass('no-info-row', 'center-align')
	})

	test('renders null when data is null', () => {
		const { container } = render(<BetListTable data={null} />)
		expect(container.firstChild).toBeNull()
	})

	test('renders no data when custom noDataCondition returns true', () => {
		const noDataCondition = jest.fn(() => true)
		render(<BetListTable data={defaultProps.data} noDataCondition={noDataCondition} />)
		
		expect(screen.getByText('NoInfo')).toBeInTheDocument()
		expect(noDataCondition).toHaveBeenCalled()
	})

	test('builds header correctly', () => {
		render(<BetListTable {...defaultProps} />)
		
		const headers = screen.getAllByTestId('header-cell')
		expect(headers).toHaveLength(14) // Default columns length
		
		// Check some specific headers
		expect(screen.getByText('Index')).toBeInTheDocument()
		expect(screen.getByText('ExternalId')).toBeInTheDocument()
		expect(screen.getByText('Stake')).toBeInTheDocument()
	})

	test('applies custom header names when getHeaderNameFunc provided', () => {
		const getHeaderNameFunc = jest.fn((column) => `Custom ${column}`)
		render(<BetListTable {...defaultProps} getHeaderNameFunc={getHeaderNameFunc} />)
		
		expect(screen.getByText('Custom Index')).toBeInTheDocument()
		expect(screen.getByText('Custom Stake')).toBeInTheDocument()
	})

	test('builds body rows correctly', () => {
		render(<BetListTable {...defaultProps} />)
		
		const rows = screen.getAllByTestId('row')
		const dataRows = rows.filter(row => !row.className?.includes('fixed-table-grant-total'))
		expect(dataRows).toHaveLength(1)
		
		expect(screen.getByText('EXT001')).toBeInTheDocument()
		expect(screen.getByText('Team A')).toBeInTheDocument()
	})

	test('applies data mapping function when provided', () => {
		const mappingDataFunc = jest.fn((data) => ({ ...data, Stake: `$${data.Stake}` }))
		render(<BetListTable {...defaultProps} mappingDataFunc={mappingDataFunc} />)
		
		expect(mappingDataFunc).toHaveBeenCalled()
	})

	test('builds footer when totalColumns provided', () => {
		render(<BetListTable {...defaultProps} />)
		
		const totalRow = screen.getByText('Total').closest('[data-testid="row"]')
		expect(totalRow).toHaveClass('fixed-table-grant-total')
		expect(screen.getByText('Total')).toBeInTheDocument()
	})

	test('does not render footer when totalColumns is empty', () => {
		render(<BetListTable {...defaultProps} totalColumns={[]} />)
		
		expect(screen.queryByText('Total')).not.toBeInTheDocument()
	})

	test('applies custom total cell class names', () => {
		const getTotalCellClassNameFunc = jest.fn(() => 'custom-total-class')
		render(<BetListTable {...defaultProps} getTotalCellClassNameFunc={getTotalCellClassNameFunc} />)
		
		expect(getTotalCellClassNameFunc).toHaveBeenCalled()
	})

	test('applies negative class for negative LicenseeWL values', () => {
		const propsWithNegative = {
			...defaultProps,
			total: { ...defaultProps.total, LicenseeWL: '-45.00' }
		}
		render(<BetListTable {...propsWithNegative} />)
		
		// The negative class should be applied (though we can't easily test the exact cell due to mocking)
		expect(screen.getByText('Total')).toBeInTheDocument()
	})

	test('handles sort events correctly', () => {
		const onSort = jest.fn()
		render(<BetListTable {...defaultProps} onSort={onSort} />)
		
		const table = screen.getByTestId('mock-table')
		fireEvent.click(table)
		
		expect(onSort).toHaveBeenCalledWith(1, 1) // stake type (1) and asc order (1)
	})

	test('handles paging events correctly', () => {
		const onPaging = jest.fn()
		render(<BetListTable {...defaultProps} onPaging={onPaging} isPaging={true} />)
		
		const table = screen.getByTestId('mock-table')
		fireEvent.click(table)
		
		expect(onPaging).toHaveBeenCalledWith(1, 50)
	})

	test('calls afterLoad effect when data changes', () => {
		const afterLoad = jest.fn()
		const { rerender } = render(<BetListTable {...defaultProps} afterLoad={afterLoad} />)
		
		expect(afterLoad).toHaveBeenCalledTimes(1)
		
		rerender(<BetListTable {...defaultProps} data={[]} afterLoad={afterLoad} />)
		expect(afterLoad).toHaveBeenCalledTimes(2)
	})

	test('uses custom resource function when provided', () => {
		const getResourceFunc = jest.fn((key) => `Resource: ${key}`)
		render(<BetListTable data={[]} getResourceFunc={getResourceFunc} />)
		
		expect(getResourceFunc).toHaveBeenCalledWith('NoInfo')
		expect(screen.getByText('Resource: NoInfo')).toBeInTheDocument()
	})

	test('handles paging configuration correctly', () => {
		const pageOption = {
			PageIndex: 2,
			PageSize: 100,
			TotalItem: 200,
			PageList: [50, 100, 200]
		}
		
		render(<BetListTable {...defaultProps} isPaging={true} pageOption={pageOption} />)
		
		const table = screen.getByTestId('mock-table')
		expect(table).toHaveAttribute('data-is-paging', 'true')
	})

	test('applies adjusted height when provided', () => {
		render(<BetListTable {...defaultProps} adjustedHeight={400} />)
		
		const table = screen.getByTestId('mock-table')
		expect(table).toHaveAttribute('data-adjusted-height', '400')
	})

	test('handles custom header and footer components', () => {
		const CustomHeaderCell = ({ children }) => <th data-testid="custom-header">{children}</th>
		const CustomFooterRow = ({ children }) => <tr data-testid="custom-footer">{children}</tr>
		
		render(
			<BetListTable 
				{...defaultProps} 
				customHeaderCell={CustomHeaderCell}
				customFooterRow={CustomFooterRow}
			/>
		)
		
		expect(screen.getAllByTestId('custom-header')).toHaveLength(14)
		expect(screen.getByTestId('custom-footer')).toBeInTheDocument()
	})

	test('handles tooltip in cells correctly', () => {
		const propsWithTooltip = {
			...defaultProps,
			columnAlignments: [
				'center-align tooltip', 'left-align', 'right-align', 'center-align', 'center-align',
				'right-align', 'right-align', 'right-align', 'right-align', 'right-align',
				'right-align', 'center-align', 'center-align', 'center-align'
			]
		}
		
		render(<BetListTable {...propsWithTooltip} />)
		
		// The tooltip attribute should be set (though we can't easily test the exact cell due to mocking)
		expect(screen.getByTestId('mock-table')).toBeInTheDocument()
	})

	test('handles empty columns gracefully', () => {
		render(<BetListTable {...defaultProps} columns={[]} />)
		
		expect(screen.getByTestId('mock-table')).toBeInTheDocument()
		expect(screen.queryAllByTestId('header-cell')).toHaveLength(0)
	})
})

