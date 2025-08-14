import React from 'react'
import { render } from '@testing-library/react'
import useSessionStore from '@/hooks/useSessionStore'
import * as config from '@/constants/config'

jest.mock('@/lib/site', () => ({ __esModule: true, default: { getLrfSavedSessionKey: (p) => `k:${p}` } }))

describe('useSessionStore', () => {
	beforeEach(() => {
		sessionStorage.clear()
		history.replaceState('', '', 'http://localhost/test')
		Object.defineProperty(window, 'location', { value: new URL('http://localhost/test'), configurable: true })
	})

    test('creates store with default state and persists on subscribe', () => {
        const onReady = jest.fn()
        const reducer = (s = { a: 1 }, a) => s
        const Comp = (props) => { const store = useSessionStore(reducer, { a: 1 }, {}); props.onReady(store); return null }
        render(<Comp onReady={onReady} />)
        const store = onReady.mock.calls[0][0]
        store.dispatch({ type: 'X' })
        const saved = JSON.parse(sessionStorage.getItem('k:/test'))
        expect(saved).toEqual({ a: 1 })
    })

    test('restores and merges reset state, converts dates', () => {
        const onReady = jest.fn()
        const pathKey = 'k:/test'
        sessionStorage.setItem(pathKey, JSON.stringify({ dateRange: { fromDate: '2020-01-01', toDate: '2020-01-02' }, x: 1 }))
        Object.defineProperty(window, 'location', { value: new URL('http://localhost/test#/Index'), configurable: true })
        const Comp = (props) => { const store = useSessionStore((s = {}) => s, {}, { y: 2 }); props.onReady(store); return null }
        render(<Comp onReady={onReady} />)
        const store = onReady.mock.calls[0][0]
        const state = store.getState()
        expect(state.x).toBe(1)
        expect(state.y).toBe(2)
        expect(state.dateRange.fromDate).toHaveProperty('_isAMomentObject', true)
        expect(state.dateRange.toDate).toHaveProperty('_isAMomentObject', true)
    })

    test('tryAddPageToSession writes saved page and clears old keys', () => {
        Object.defineProperty(window, 'location', { value: new URL('http://localhost/test#/Index'), configurable: true })
        const reducer = (s = {}) => s
        const Comp = () => { useSessionStore(reducer, {}, {}); return null }
        render(<Comp />)
        const map = JSON.parse(sessionStorage.getItem(config.LRF_SAVED_PAGE_SESSION_KEY))
        expect(map).toEqual({ 'k:/test': true })
    })
})


