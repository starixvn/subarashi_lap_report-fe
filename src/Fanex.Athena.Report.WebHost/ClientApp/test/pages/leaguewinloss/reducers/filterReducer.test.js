import filterReducer from '@/pages/leaguewinloss/reducers/filterReducer'
import { SET_REPORT_FILTER, SET_BREADCRUMB_PARAMS } from '@/pages/leaguewinloss/actions/types'

describe('leaguewinloss filterReducer', () => {
	test('should export an object with reportFilter and breadcrumbParams', () => {
		expect(filterReducer).toHaveProperty('reportFilter')
		expect(filterReducer).toHaveProperty('breadcrumbParams')
		expect(typeof filterReducer.reportFilter).toBe('function')
		expect(typeof filterReducer.breadcrumbParams).toBe('function')
	})

	describe('reportFilter reducer', () => {
		test('should return initial state of null', () => {
			expect(filterReducer.reportFilter(undefined, { type: '@@INIT' })).toBeNull()
		})

		test('should handle SET_REPORT_FILTER action', () => {
			const filterData = {
				dateRange: { start: '2023-01-01', end: '2023-01-31' },
				selectedLeagues: [1, 2, 3],
				selectedSports: ['football', 'basketball'],
				selectedBettypes: [1, 2]
			}
			const action = {
				type: SET_REPORT_FILTER,
				data: filterData
			}
			expect(filterReducer.reportFilter(null, action)).toEqual(filterData)
		})

		test('should return current state for unhandled actions', () => {
			const currentState = { dateRange: { start: '2023-01-01', end: '2023-01-31' } }
			expect(filterReducer.reportFilter(currentState, { type: 'UNKNOWN_ACTION' })).toEqual(currentState)
		})
	})

	describe('breadcrumbParams reducer', () => {
		test('should return initial state of null', () => {
			expect(filterReducer.breadcrumbParams(undefined, { type: '@@INIT' })).toBeNull()
		})

		test('should handle SET_BREADCRUMB_PARAMS action', () => {
			const breadcrumbParams = {
				currentPath: '/leaguewinloss/detail',
				parentPath: '/leaguewinloss',
				leagueId: 1,
				leagueName: 'Premier League',
				params: { sport: 'football', bettype: 'single' }
			}
			const action = {
				type: SET_BREADCRUMB_PARAMS,
				data: breadcrumbParams
			}
			expect(filterReducer.breadcrumbParams(null, action)).toEqual(breadcrumbParams)
		})

		test('should return current state for unhandled actions', () => {
			const currentState = { currentPath: '/leaguewinloss' }
			expect(filterReducer.breadcrumbParams(currentState, { type: 'UNKNOWN_ACTION' })).toEqual(currentState)
		})
	})
})

