import React from 'react'
import { render } from '@testing-library/react'
import { getBetListPageWithPageName } from '@/pages/betlist/components/Pages'

jest.mock('@/constants/pages', () => ({
	MATCH_WL: 'MatchWinLoss',
	LIVE_REPORT: 'LiveReport'
}))

jest.mock('@/constants/config', () => ({
	NOT_FOUND_URL: '/not-found'
}))

jest.mock('@/lib/site', () => ({
	redirectToUrl: jest.fn()
}))

jest.mock('@/pages/betlist/components/Pages/MatchWinLoss', () => ({
	__esModule: true,
	default: {
		component: 'MatchWinLoss',
		name: 'Match Win Loss'
	}
}))

jest.mock('@/pages/betlist/components/Pages/LiveReport', () => ({
	__esModule: true,
	default: {
		component: 'LiveReport',
		name: 'Live Report'
	}
}))

describe('getBetListPageWithPageName', () => {
	let mockSite

	beforeEach(() => {
		mockSite = require('@/lib/site')
		jest.clearAllMocks()
	})

	test('returns MatchWinLoss component for "MatchWinLoss" page name', () => {
		const result = getBetListPageWithPageName('MatchWinLoss')
		
		expect(result).toEqual({
			component: 'MatchWinLoss',
			name: 'Match Win Loss'
		})
		expect(mockSite.redirectToUrl).not.toHaveBeenCalled()
	})

	test('returns LiveReport component for "LiveReport" page name', () => {
		const result = getBetListPageWithPageName('LiveReport')
		
		expect(result).toEqual({
			component: 'LiveReport',
			name: 'Live Report'
		})
		expect(mockSite.redirectToUrl).not.toHaveBeenCalled()
	})

	test('handles case insensitive matching for MatchWinLoss', () => {
		const result = getBetListPageWithPageName('matchwinloss')
		
		expect(result).toEqual({
			component: 'MatchWinLoss',
			name: 'Match Win Loss'
		})
		expect(mockSite.redirectToUrl).not.toHaveBeenCalled()
	})

	test('handles case insensitive matching for LiveReport', () => {
		const result = getBetListPageWithPageName('livereport')
		
		expect(result).toEqual({
			component: 'LiveReport',
			name: 'Live Report'
		})
		expect(mockSite.redirectToUrl).not.toHaveBeenCalled()
	})

	test('handles mixed case for MatchWinLoss', () => {
		const result = getBetListPageWithPageName('MaTcHwInLoSs')
		
		expect(result).toEqual({
			component: 'MatchWinLoss',
			name: 'Match Win Loss'
		})
		expect(mockSite.redirectToUrl).not.toHaveBeenCalled()
	})

	test('handles mixed case for LiveReport', () => {
		const result = getBetListPageWithPageName('LiVeRePoRt')
		
		expect(result).toEqual({
			component: 'LiveReport',
			name: 'Live Report'
		})
		expect(mockSite.redirectToUrl).not.toHaveBeenCalled()
	})

	test('redirects to not found for unknown page name', () => {
		const result = getBetListPageWithPageName('UnknownPage')
		
		expect(result).toEqual({})
		expect(mockSite.redirectToUrl).toHaveBeenCalledWith('/not-found')
	})

	test('redirects to not found for empty string', () => {
		const result = getBetListPageWithPageName('')
		
		expect(result).toEqual({})
		expect(mockSite.redirectToUrl).toHaveBeenCalledWith('/not-found')
	})

	test('redirects to not found for null page name', () => {
		expect(() => {
			getBetListPageWithPageName(null)
		}).toThrow(TypeError)
	})

	test('redirects to not found for undefined page name', () => {
		expect(() => {
			getBetListPageWithPageName(undefined)
		}).toThrow(TypeError)
	})

	test('redirects to not found for numeric page name', () => {
		expect(() => {
			getBetListPageWithPageName(123)
		}).toThrow(TypeError)
	})

	test('redirects to not found for boolean page name', () => {
		expect(() => {
			getBetListPageWithPageName(true)
		}).toThrow(TypeError)
	})

	test('handles partial matches correctly', () => {
		const result = getBetListPageWithPageName('Match')
		
		expect(result).toEqual({})
		expect(mockSite.redirectToUrl).toHaveBeenCalledWith('/not-found')
	})

	test('handles extra characters in page name', () => {
		const result = getBetListPageWithPageName('MatchWinLoss123')
		
		expect(result).toEqual({})
		expect(mockSite.redirectToUrl).toHaveBeenCalledWith('/not-found')
	})

	test('handles whitespace in page name', () => {
		const result = getBetListPageWithPageName(' MatchWinLoss ')
		
		expect(result).toEqual({})
		expect(mockSite.redirectToUrl).toHaveBeenCalledWith('/not-found')
	})
})
