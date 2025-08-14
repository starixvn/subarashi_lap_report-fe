import React from 'react'
import { render } from '@testing-library/react'
import usePageSession from '@/hooks/useSessionStore/usePageSession'

jest.mock('@/lib/site', () => ({ __esModule: true, default: { getLrfSavedSessionKey: (p) => `k:${p}` } }))

describe('usePageSession', () => {
	beforeEach(() => {
		jest.restoreAllMocks()
		sessionStorage.clear()
		Object.defineProperty(window, 'location', { value: new URL('http://localhost/test#/Index'), configurable: true })
	})

	test('clears session entries on pagehide with hash', () => {
		const spy = jest.spyOn(Storage.prototype, 'removeItem')
		const Comp = () => { usePageSession(); return null }
		render(<Comp />)
		window.dispatchEvent(new Event('pagehide'))
		expect(spy).toHaveBeenCalledWith('_Lrf_Saved_Page')
		expect(spy).toHaveBeenCalledWith('k:/test')
	})
})


