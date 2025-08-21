import React from 'react'
import { render } from '@testing-library/react'
import Loader from '@/components/Loader'

describe('Loader', () => {
	test('renders loader structure', () => {
		const { container } = render(<Loader isLoading={false} />)
		
		const loadingProcess = container.querySelector('.loading-process')
		const iconLoading = container.querySelector('.icon-loading')
		const loaderInner = container.querySelector('.loader-inner')
		const ballDivs = container.querySelectorAll('.loader-inner div')
		
		expect(loadingProcess).toBeInTheDocument()
		expect(iconLoading).toBeInTheDocument()
		expect(loaderInner).toBeInTheDocument()
		expect(ballDivs).toHaveLength(3)
	})

	test('applies default classes when not loading', () => {
		const { container } = render(<Loader isLoading={false} />)
		
		const loadingProcess = container.querySelector('.loading-process')
		expect(loadingProcess).toHaveClass('loading-process', 'default')
		expect(loadingProcess).not.toHaveClass('loading')
	})

	test('applies loading class when isLoading is true', () => {
		const { container } = render(<Loader isLoading={true} />)
		
		const loadingProcess = container.querySelector('.loading-process')
		expect(loadingProcess).toHaveClass('loading-process', 'default', 'loading')
	})

	test('does not apply loading class when isLoading is false', () => {
		const { container } = render(<Loader isLoading={false} />)
		
		const loadingProcess = container.querySelector('.loading-process')
		expect(loadingProcess).not.toHaveClass('loading')
	})

	test('has correct loader structure with ball-beat animation', () => {
		const { container } = render(<Loader isLoading={true} />)
		
		const loaderInner = container.querySelector('.loader-inner')
		expect(loaderInner).toHaveClass('ball-beat')
		
		const balls = container.querySelectorAll('.loader-inner div')
		expect(balls).toHaveLength(3)
		balls.forEach(ball => {
			expect(ball).toBeInTheDocument()
		})
	})

	test('handles undefined isLoading prop', () => {
		const { container } = render(<Loader />)
		
		const loadingProcess = container.querySelector('.loading-process')
		expect(loadingProcess).toHaveClass('loading-process', 'default')
		expect(loadingProcess).not.toHaveClass('loading')
	})

	test('handles falsy values for isLoading', () => {
		const falsyValues = [false, 0, '', null, undefined]
		
		falsyValues.forEach(value => {
			const { container } = render(<Loader isLoading={value} />)
			const loadingProcess = container.querySelector('.loading-process')
			expect(loadingProcess).not.toHaveClass('loading')
		})
	})

	test('handles truthy values for isLoading', () => {
		const truthyValues = [true, 1, 'loading', [], {}]
		
		truthyValues.forEach(value => {
			const { container } = render(<Loader isLoading={value} />)
			const loadingProcess = container.querySelector('.loading-process')
			expect(loadingProcess).toHaveClass('loading')
		})
	})
})