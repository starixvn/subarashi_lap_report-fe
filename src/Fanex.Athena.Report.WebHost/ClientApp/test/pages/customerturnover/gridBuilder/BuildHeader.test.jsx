import React from 'react'
import { render, screen } from '@testing-library/react'
import { BuildHeaders } from '@/pages/customerturnover/gridBuilder/BuildHeader'

jest.mock('@legion-lib/react-grid', () => ({
    HeaderRow: function MockHeaderRow({ style, children, ...props }) {
        return (
            <div data-testid="header-row" style={style} {...props}>
                {children}
            </div>
        )
    },
    HeaderCell: function MockHeaderCell({ 
        rowSpan, colWidth, className, colSpan, children, ...props 
    }) {
        return (
            <div 
                data-testid="header-cell" 
                data-rowspan={rowSpan}
                data-colwidth={colWidth}
                data-colspan={colSpan}
                className={className}
                {...props}
            >
                {children}
            </div>
        )
    }
}))

jest.mock('@/helpers/langHelper', () => ({
    __esModule: true,
    default: {
        getSingleResource: jest.fn((key) => `Mock_${key}`)
    }
}))

describe('BuildHeaders', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('returns only first row when customer commission is not allowed', () => {
        const options = { isAllowedCustomerCommission: false }
        const result = BuildHeaders(options)
        
        expect(result).toHaveLength(1)
        
        render(<div>{result}</div>)
        
        const headerRows = screen.getAllByTestId('header-row')
        expect(headerRows).toHaveLength(1)
        expect(headerRows[0]).toBeInTheDocument()
    })

    test('returns both rows when customer commission is allowed', () => {
        const options = { isAllowedCustomerCommission: true }
        const result = BuildHeaders(options)
        
        expect(result).toHaveLength(2)
        
        render(<div>{result}</div>)
        
        const headerRows = screen.getAllByTestId('header-row')
        expect(headerRows).toHaveLength(2)
        expect(headerRows[0]).toBeInTheDocument()
        expect(headerRows[1]).toBeInTheDocument()
    })

    test('first row has correct structure and styling', () => {
        const options = { isAllowedCustomerCommission: false }
        const result = BuildHeaders(options)
        
        render(<div>{result}</div>)
        
        const firstRow = screen.getByTestId('header-row')
        expect(firstRow).toHaveStyle({ height: '23px' })
        expect(firstRow).toBeInTheDocument()
    })

    test('renders all expected header cells in first row without commission', () => {
        const options = { isAllowedCustomerCommission: false }
        const result = BuildHeaders(options)
        
        render(<div>{result}</div>)
        
        const headerCells = screen.getAllByTestId('header-cell')
        
        expect(screen.getByText('#')).toBeInTheDocument()
        expect(screen.getByText('Mock_Date')).toBeInTheDocument()
        expect(screen.getByText('Mock_ExternalId')).toBeInTheDocument()
        expect(screen.getByText('Mock_SystemId')).toBeInTheDocument()
        expect(screen.getByText('Mock_Currency')).toBeInTheDocument()
        expect(screen.getByText('Mock_Sport')).toBeInTheDocument()
        expect(screen.getByText('Mock_BetType')).toBeInTheDocument()
        expect(screen.getByText('Mock_EffectiveBettingValue')).toBeInTheDocument()
        expect(screen.getByText('Mock_TotalTransaction')).toBeInTheDocument()
        expect(screen.getByText('Mock_Turnover')).toBeInTheDocument()
        expect(screen.getByText('Mock_TotalTurnover')).toBeInTheDocument()
        expect(screen.getByText('Mock_CustomerW_L')).toBeInTheDocument()
    })

    test('customer win/loss cell has correct props without commission', () => {
        const options = { isAllowedCustomerCommission: false }
        const result = BuildHeaders(options)
        
        render(<div>{result}</div>)
        
        const customerWLCell = screen.getByText('Mock_CustomerW_L').closest('[data-testid="header-cell"]')
        expect(customerWLCell).toHaveAttribute('data-rowspan', '2')
        expect(customerWLCell).toHaveAttribute('data-colwidth', '400')
        expect(customerWLCell).toHaveAttribute('data-colspan', '1')
    })

    test('customer win/loss cell has correct props with commission', () => {
        const options = { isAllowedCustomerCommission: true }
        const result = BuildHeaders(options)
        
        render(<div>{result}</div>)
        
        const customerWLCell = screen.getByText('Mock_CustomerW_L').closest('[data-testid="header-cell"]')
        expect(customerWLCell).toHaveAttribute('data-rowspan', '1')
        expect(customerWLCell).toHaveAttribute('data-colwidth', '400')
        expect(customerWLCell).toHaveAttribute('data-colspan', '3')
    })

    test('second row appears only with commission enabled', () => {
        const options = { isAllowedCustomerCommission: true }
        const result = BuildHeaders(options)
        
        render(<div>{result}</div>)
        
        expect(screen.getByText('Mock_WinLoss')).toBeInTheDocument()
        expect(screen.getByText('Mock_Comm')).toBeInTheDocument()
        expect(screen.getByText('Mock_Total')).toBeInTheDocument()
    })

    test('second row has correct structure', () => {
        const options = { isAllowedCustomerCommission: true }
        const result = BuildHeaders(options)
        
        render(<div>{result}</div>)
        
        const headerRows = screen.getAllByTestId('header-row')
        const secondRow = headerRows[1]
        expect(secondRow).toHaveStyle({ height: '23px' })
        expect(secondRow).toBeInTheDocument()
    })

    test('second row header cells have correct widths', () => {
        const options = { isAllowedCustomerCommission: true }
        const result = BuildHeaders(options)
        
        render(<div>{result}</div>)
        
        const winLossCell = screen.getByText('Mock_WinLoss').closest('[data-testid="header-cell"]')
        const commissionCell = screen.getByText('Mock_Comm').closest('[data-testid="header-cell"]')
        const totalCell = screen.getByText('Mock_Total').closest('[data-testid="header-cell"]')
        
        expect(winLossCell).toHaveAttribute('data-colwidth', '400')
        expect(commissionCell).toHaveAttribute('data-colwidth', '300')
        expect(totalCell).toHaveAttribute('data-colwidth', '400')
    })

    test('first column has first-header-cell class', () => {
        const options = { isAllowedCustomerCommission: false }
        const result = BuildHeaders(options)
        
        render(<div>{result}</div>)
        
        const firstCell = screen.getByText('#').closest('[data-testid="header-cell"]')
        expect(firstCell).toHaveClass('first-header-cell')
        expect(firstCell).toHaveAttribute('data-rowspan', '2')
        expect(firstCell).toHaveAttribute('data-colwidth', '200')
    })

    test('all language resource calls are made correctly', () => {
        const langHelper = require('@/helpers/langHelper').default
        const options = { isAllowedCustomerCommission: true }
        
        BuildHeaders(options)
        
        expect(langHelper.getSingleResource).toHaveBeenCalledWith('Date')
        expect(langHelper.getSingleResource).toHaveBeenCalledWith('ExternalId')
        expect(langHelper.getSingleResource).toHaveBeenCalledWith('SystemId')
        expect(langHelper.getSingleResource).toHaveBeenCalledWith('Currency')
        expect(langHelper.getSingleResource).toHaveBeenCalledWith('Sport')
        expect(langHelper.getSingleResource).toHaveBeenCalledWith('BetType')
        expect(langHelper.getSingleResource).toHaveBeenCalledWith('EffectiveBettingValue')
        expect(langHelper.getSingleResource).toHaveBeenCalledWith('TotalTransaction')
        expect(langHelper.getSingleResource).toHaveBeenCalledWith('Turnover')
        expect(langHelper.getSingleResource).toHaveBeenCalledWith('TotalTurnover')
        expect(langHelper.getSingleResource).toHaveBeenCalledWith('CustomerW_L')
        expect(langHelper.getSingleResource).toHaveBeenCalledWith('WinLoss')
        expect(langHelper.getSingleResource).toHaveBeenCalledWith('Comm')
        expect(langHelper.getSingleResource).toHaveBeenCalledWith('Total')
    })

    test('handles undefined options gracefully', () => {
        expect(() => {
            BuildHeaders(undefined)
        }).toThrow()
    })

    test('handles null options gracefully', () => {
        expect(() => {
            BuildHeaders(null)
        }).toThrow()
    })

    test('handles options without isAllowedCustomerCommission property', () => {
        const options = {}
        const result = BuildHeaders(options)
        
        expect(result).toHaveLength(1)
        
        render(<div>{result}</div>)
        
        const customerWLCell = screen.getByText('Mock_CustomerW_L').closest('[data-testid="header-cell"]')
        expect(customerWLCell).toHaveAttribute('data-rowspan', '2')
        expect(customerWLCell).toHaveAttribute('data-colspan', '1')
    })
})
