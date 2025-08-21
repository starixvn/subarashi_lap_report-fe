import React from 'react'
import { render, screen } from '@testing-library/react'
import ReportTitle from '@/components/ReportTitle'

describe('ReportTitle', () => {
    test('renders with custom tag, content and extendContent', () => {
        render(<ReportTitle tag="h1" content="Main" extendContent={<span>Ext</span>} data-testid="head" />)
        const container = document.querySelector('.report-title-container')
        expect(container).toBeInTheDocument()
        const head = screen.getByTestId('head')
        expect(head).toHaveClass('report-title')
        expect(head.tagName.toLowerCase()).toBe('h1')
        expect(head).toHaveTextContent('Main')
        expect(head).toHaveTextContent('Ext')
    })
})



