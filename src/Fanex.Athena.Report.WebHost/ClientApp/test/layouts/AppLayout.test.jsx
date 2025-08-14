import React from 'react'
import { render, screen } from '@testing-library/react'
import AppLayout from '@/layouts/AppLayout'

describe('AppLayout', () => {
	test('renders container and children', () => {
		render(<AppLayout><div>child</div></AppLayout>)
		const container = document.getElementById('container')
		expect(container).toBeInTheDocument()
		expect(container).toHaveClass('container-fluid')
		expect(screen.getByText('child')).toBeInTheDocument()
	})
})


