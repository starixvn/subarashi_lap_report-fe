import React from 'react'
import { render, screen } from '@testing-library/react'
import RouteLayout from '@/layouts/RouteLayout'

jest.mock('@/hooks/gtagEvents', () => ({ __esModule: true, usePageViewEvent: jest.fn() }))

const Dummy = () => <div>dummy</div>
const Wrap = ({ children }) => <section data-testid="layout">{children}</section>

describe('RouteLayout', () => {
	test('renders component directly when no layout', () => {
		render(<RouteLayout id="A" pageName="P" component={Dummy} />)
		expect(screen.getByText('dummy')).toBeInTheDocument()
	})

	test('wraps component with provided layout', () => {
		render(<RouteLayout id="A" pageName="P" layout={Wrap} component={Dummy} />)
		expect(screen.getByTestId('layout')).toBeInTheDocument()
		expect(screen.getByText('dummy')).toBeInTheDocument()
	})
})


