import React from 'react'
import { render, screen } from '@testing-library/react'
import { BuildFooter } from '@/pages/turnover/gridBuilder/BuildFooter'

jest.mock('@legion-lib/react-grid', () => ({
    Cell: function MockCell({ className, colSpan, children }) {
        return (
            <div data-testid="cell" className={className} data-colspan={colSpan}>
                {children}
            </div>
        )
    },
    Row: function MockRow({ children, ...props }) {
        return (
            <div data-testid="row" {...props}>
                {children}
            </div>
        )
    }
}))

jest.mock('@/pages/turnover/gridBuilder/CommonCells', () => {
    return function MockCommonCells({ data, options, hideClosingBalance, hideOpeningBalance }) {
        return (
            <div data-testid="common-cells">
                <span data-testid="data">{JSON.stringify(data)}</span>
                <span data-testid="options">{JSON.stringify(options)}</span>
                <span data-testid="hide-closing">{String(hideClosingBalance)}</span>
                <span data-testid="hide-opening">{String(hideOpeningBalance)}</span>
            </div>
        )
    }
})

jest.mock('@/helpers/langHelper', () => ({
    __esModule: true,
    default: {
        getSingleResource: jest.fn((key) => `Mock_${key}`)
    }
}))

describe('BuildFooter', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('renders footer row with correct structure', () => {
        const mockData = { total: 1000, count: 5 }
        const mockOptions = { showDetails: true }
        
        render(BuildFooter(mockData, mockOptions))
        
        expect(screen.getByTestId('row')).toBeInTheDocument()
        expect(screen.getByTestId('row')).toBeInTheDocument()
    })

    test('renders total cell with correct props', () => {
        const mockData = { total: 1000, count: 5 }
        const mockOptions = { showDetails: true }
        
        render(BuildFooter(mockData, mockOptions))
        
        const totalCell = screen.getByTestId('cell')
        expect(totalCell).toHaveClass('center-align')
        expect(totalCell).toHaveAttribute('data-colspan', '2')
        expect(totalCell).toHaveTextContent('Mock_Total')
    })

    test('renders CommonCells with correct props', () => {
        const mockData = { total: 1500, transactions: 10 }
        const mockOptions = { enableFeatureX: false, showCommission: true }
        
        render(BuildFooter(mockData, mockOptions))
        
        expect(screen.getByTestId('common-cells')).toBeInTheDocument()
        expect(screen.getByTestId('data')).toHaveTextContent(JSON.stringify(mockData))
        expect(screen.getByTestId('options')).toHaveTextContent(JSON.stringify(mockOptions))
        expect(screen.getByTestId('hide-closing')).toHaveTextContent('true')
        expect(screen.getByTestId('hide-opening')).toHaveTextContent('true')
    })

    test('passes hideClosingBalance and hideOpeningBalance as true', () => {
        const mockData = { total: 2000 }
        const mockOptions = { test: true }
        
        render(BuildFooter(mockData, mockOptions))
        
        expect(screen.getByTestId('hide-closing')).toHaveTextContent('true')
        expect(screen.getByTestId('hide-opening')).toHaveTextContent('true')
    })

    test('handles null data gracefully', () => {
        const mockOptions = { test: true }
        
        render(BuildFooter(null, mockOptions))
        
        expect(screen.getByTestId('data')).toHaveTextContent('null')
        expect(screen.getByTestId('options')).toHaveTextContent(JSON.stringify(mockOptions))
    })

    test('handles empty options gracefully', () => {
        const mockData = { total: 1000 }
        
        render(BuildFooter(mockData, {}))
        
        expect(screen.getByTestId('data')).toHaveTextContent(JSON.stringify(mockData))
        expect(screen.getByTestId('options')).toHaveTextContent('{}')
    })

    test('calls LangHelper.getSingleResource with "Total"', () => {
        const langHelper = require('@/helpers/langHelper').default
        const mockData = { total: 1000 }
        const mockOptions = { test: true }
        
        render(BuildFooter(mockData, mockOptions))
        
        expect(langHelper.getSingleResource).toHaveBeenCalledWith('Total')
    })

    test('handles complex data structures', () => {
        const mockData = {
            totals: {
                deposit: 5000,
                withdrawal: 3000,
                net: 2000
            },
            counts: {
                transactions: 25,
                users: 10
            }
        }
        const mockOptions = {
            features: {
                showAdvanced: true,
                enableSorting: false
            }
        }
        
        render(BuildFooter(mockData, mockOptions))
        
        expect(screen.getByTestId('data')).toHaveTextContent(JSON.stringify(mockData))
        expect(screen.getByTestId('options')).toHaveTextContent(JSON.stringify(mockOptions))
    })
})
