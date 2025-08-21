import React from 'react'
import { render } from '@testing-library/react'
import RouteErrorBoundary from '@/components/RouteErrorBoundary'
import { INVALID_REQUEST_URL, LRF_SAVED_PAGE_SESSION_KEY } from '@/constants/config'

jest.mock('@sentry/react', () => ({ captureException: jest.fn() }))
jest.mock('react-router-dom', () => ({ useRouteError: jest.fn(() => new Error('boom')) }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { assignToUrl: jest.fn() } }))

describe('RouteErrorBoundary', () => {
    beforeEach(() => {
        sessionStorage.clear()
        jest.clearAllMocks()
    })

    test('captures error and redirects to invalid request url', () => {
        const { captureException } = require('@sentry/react')
        const Site = require('@/lib/site').default

        sessionStorage.setItem('k1', '1')
        sessionStorage.setItem('k2', '1')
        sessionStorage.setItem(LRF_SAVED_PAGE_SESSION_KEY, JSON.stringify({ k1: true, k2: false, other: true }))

        render(<RouteErrorBoundary />)

        expect(captureException).toHaveBeenCalled()
        expect(Site.assignToUrl).toHaveBeenCalledWith(INVALID_REQUEST_URL)
        expect(sessionStorage.getItem('k1')).toBeNull()
        expect(sessionStorage.getItem('k2')).toBe('1')
        expect(sessionStorage.getItem('other')).toBeNull()
        expect(sessionStorage.getItem(LRF_SAVED_PAGE_SESSION_KEY)).toBeNull()
    })
})


