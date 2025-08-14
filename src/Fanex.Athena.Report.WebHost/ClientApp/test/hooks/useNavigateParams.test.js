import React from 'react'
import { render } from '@testing-library/react'
import useNavigateParams from '@/hooks/useNavigateParams'

jest.mock('react-router-dom/dist', () => ({
	__esModule: true,
	useNavigate: jest.fn(),
	createSearchParams: (params) => new URLSearchParams(params)
}))

describe('useNavigateParams', () => {
	test('navigates without params', () => {
		const rr = require('react-router-dom/dist')
		const navigate = jest.fn()
		rr.useNavigate.mockReturnValue(navigate)
		const onReady = jest.fn()
		const Comp = (props) => {
			const go = useNavigateParams()
			props.onReady(go)
			return null
		}
		render(<Comp onReady={onReady} />)
		const go = onReady.mock.calls[0][0]
		go('/home')
		expect(navigate).toHaveBeenCalledWith('/home')
	})

	test('navigates with params', () => {
		const rr = require('react-router-dom/dist')
		const navigate = jest.fn()
		rr.useNavigate.mockReturnValue(navigate)
		const onReady = jest.fn()
		const Comp = (props) => {
			const go = useNavigateParams()
			props.onReady(go)
			return null
		}
		render(<Comp onReady={onReady} />)
		const go = onReady.mock.calls[0][0]
		go('/home', { a: '1', b: '2' })
		expect(navigate).toHaveBeenCalledWith({ pathname: '/home', search: 'a=1&b=2' })
	})
})


