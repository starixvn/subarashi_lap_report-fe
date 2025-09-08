import { lastFetchTime } from '@/pages/matchmonitoringcenter/reducers/dataReducer'
import { SET_LAST_FETCH_TIME } from '@/pages/matchmonitoringcenter/actions/types'

describe('matchmonitoringcenter dataReducer', () => {
	describe('lastFetchTime reducer', () => {
		test('should return initial state of null', () => {
			expect(lastFetchTime(undefined, { type: '@@INIT' })).toBeNull()
		})

		test('should handle SET_LAST_FETCH_TIME action with timestamp', () => {
			const timestamp = Date.now()
			const action = {
				type: SET_LAST_FETCH_TIME,
				data: timestamp
			}
			expect(lastFetchTime(null, action)).toBe(timestamp)
		})

		test('should handle SET_LAST_FETCH_TIME action with date string', () => {
			const dateString = '2023-01-01T10:00:00Z'
			const action = {
				type: SET_LAST_FETCH_TIME,
				data: dateString
			}
			expect(lastFetchTime(null, action)).toBe(dateString)
		})

		test('should handle SET_LAST_FETCH_TIME action with Date object', () => {
			const dateObject = new Date('2023-01-01T10:00:00Z')
			const action = {
				type: SET_LAST_FETCH_TIME,
				data: dateObject
			}
			expect(lastFetchTime(null, action)).toEqual(dateObject)
		})

		test('should return current state for unhandled actions', () => {
			const currentState = Date.now()
			expect(lastFetchTime(currentState, { type: 'UNKNOWN_ACTION' })).toBe(currentState)
		})

		test('should handle null data', () => {
			const action = {
				type: SET_LAST_FETCH_TIME,
				data: null
			}
			expect(lastFetchTime(123456789, action)).toBeNull()
		})

		test('should overwrite existing timestamp', () => {
			const oldTimestamp = 123456789
			const newTimestamp = 987654321
			const action = {
				type: SET_LAST_FETCH_TIME,
				data: newTimestamp
			}
			expect(lastFetchTime(oldTimestamp, action)).toBe(newTimestamp)
		})
	})
})













