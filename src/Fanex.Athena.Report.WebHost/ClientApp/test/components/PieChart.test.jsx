import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import PieChart from '@/components/PieChart'

describe('PieChart', () => {
    test('renders slices and percentage labels, shows tooltip on hover', () => {
        const data = [
            { name: 'A', value: 30 },
            { name: 'B', value: 70 }
        ]
        const { container, getByText } = render(<PieChart data={data} size={100} colors={["#111111", "#222222"]} />)
        expect(getByText('30.00%')).toBeInTheDocument()
        expect(getByText('70.00%')).toBeInTheDocument()
        const slice = container.querySelector('path, circle')
        fireEvent.mouseEnter(slice, { clientX: 10, clientY: 10 })
        expect(document.body.querySelector('.piechart-tooltip')).toBeInTheDocument()
        expect(document.body).toHaveTextContent('A')
        expect(document.body).toHaveTextContent('30.00')
    })

    test('handles zero values and empty data', () => {
        const dataWithZero = [
            { name: 'A', value: 0 },
            { name: 'B', value: 50 }
        ]
        const { container } = render(<PieChart data={dataWithZero} size={100} />)
        
        const emptyData = []
        const { container: emptyContainer } = render(<PieChart data={emptyData} size={100} />)
        expect(emptyContainer.querySelector('svg')).toBeInTheDocument()
    })

    test('handles total zero value', () => {
        const zeroData = [
            { name: 'A', value: 0 },
            { name: 'B', value: 0 }
        ]
        const { container } = render(<PieChart data={zeroData} size={100} />)
        expect(container.querySelector('svg')).toBeInTheDocument()
    })

    test('renders full circle when single value equals total', () => {
        const singleValueData = [
            { name: 'Full', value: 100 }
        ]
        const { container } = render(<PieChart data={singleValueData} size={100} />)
        const circle = container.querySelector('circle')
        expect(circle).toBeInTheDocument()
    })

    test('handles mouse move and mouse leave events', () => {
        const data = [
            { name: 'Test', value: 100 }
        ]
        const { container } = render(<PieChart data={data} size={100} />)
        const slice = container.querySelector('circle')
        
        fireEvent.mouseEnter(slice, { clientX: 10, clientY: 10 })
        fireEvent.mouseMove(slice, { clientX: 20, clientY: 20 })
        
        const tooltip = document.body.querySelector('.piechart-tooltip')
        expect(tooltip).toBeInTheDocument()
        
        fireEvent.mouseLeave(slice)
        
        setTimeout(() => {
            expect(document.body.querySelector('.piechart-tooltip')).not.toBeInTheDocument()
        }, 0)
    })

    test('handles string values', () => {
        const dataWithStringValues = [
            { name: 'A', value: '30' },
            { name: 'B', value: '70' }
        ]
        const { getByText } = render(<PieChart data={dataWithStringValues} size={100} />)
        expect(getByText('30.00%')).toBeInTheDocument()
        expect(getByText('70.00%')).toBeInTheDocument()
    })
})



