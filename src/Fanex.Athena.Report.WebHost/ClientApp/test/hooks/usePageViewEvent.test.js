import React from 'react'
import { render } from '@testing-library/react'
import { usePageViewEvent } from '@/hooks/gtagEvents'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: jest.fn((k) => k) } }))
jest.mock('@/helpers/gtagHelper', () => ({ __esModule: true, default: { logPageView: jest.fn() } }))

describe('usePageViewEvent', () => {
	test('sets document.title and logs page view', () => {
        const GtagHelper = require('@/helpers/gtagHelper').default
        const Comp = () => { usePageViewEvent('Report'); return null }
        render(<Comp />)
        expect(document.title).toContain('LAP - Report - Report')
        expect(GtagHelper.logPageView).toHaveBeenCalled()
	})
})


