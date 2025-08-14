import React from 'react'
import { renderHook } from '@testing-library/react'
global.__IS_DESKTOP__ = true
jest.mock('react-device-detect', () => ({ get isDesktop() { return global.__IS_DESKTOP__ } }))
import { useIsFirstRender } from 'usehooks-ts'
import useMobileVersion from '@/hooks/useMobileVersion'

jest.mock('usehooks-ts', () => ({ useIsFirstRender: jest.fn(() => true) }))

describe('useMobileVersion', () => {
    test('returns false on desktop', () => {
		Object.defineProperty(window, 'innerWidth', { value: 500, configurable: true })
		const { result } = renderHook(() => useMobileVersion())
		expect(result.current).toBe(false)
	})

    test('returns width<1024 on mobile', () => {
        global.__IS_DESKTOP__ = false
        Object.defineProperty(window, 'innerWidth', { value: 1200, configurable: true })
        let r = renderHook(() => useMobileVersion()).result
		expect(r.current).toBe(false)
        Object.defineProperty(window, 'innerWidth', { value: 800, configurable: true })
        r = renderHook(() => useMobileVersion()).result
		expect(r.current).toBe(true)
	})
})


