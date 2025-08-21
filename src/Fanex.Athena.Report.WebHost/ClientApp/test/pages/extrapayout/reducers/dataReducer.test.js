import dataReducer from '@/pages/extrapayout/reducers/dataReducer'
import { SET_REPORT_DATA, SET_RELOAD_REPORT } from '@/pages/extrapayout/actions/types'

describe('extrapayout dataReducer', () => {
	test('should export an object with reportData and reloadReport', () => {
		expect(dataReducer).toHaveProperty('reportData')
		expect(dataReducer).toHaveProperty('reloadReport')
		expect(typeof dataReducer.reportData).toBe('function')
		expect(typeof dataReducer.reloadReport).toBe('function')
	})

	describe('reportData reducer', () => {
		test('should return initial state of empty object', () => {
			expect(dataReducer.reportData(undefined, { type: '@@INIT' })).toEqual({})
		})

		test('should handle SET_REPORT_DATA action', () => {
			const reportData = {
				summary: { total: 100 },
				details: [{ id: 1, amount: 50 }]
			}
			const action = {
				type: SET_REPORT_DATA,
				data: reportData
			}
			expect(dataReducer.reportData({}, action)).toEqual(reportData)
		})

		test('should return current state for unhandled actions', () => {
			const currentState = { existing: 'data' }
			expect(dataReducer.reportData(currentState, { type: 'UNKNOWN_ACTION' })).toEqual(currentState)
		})
	})

	describe('reloadReport reducer', () => {
		test('should return initial state of empty object', () => {
			expect(dataReducer.reloadReport(undefined, { type: '@@INIT' })).toEqual({})
		})

		test('should handle SET_RELOAD_REPORT action', () => {
			const reloadData = { shouldReload: true, timestamp: Date.now() }
			const action = {
				type: SET_RELOAD_REPORT,
				data: reloadData
			}
			expect(dataReducer.reloadReport({}, action)).toEqual(reloadData)
		})

		test('should return current state for unhandled actions', () => {
			const currentState = { shouldReload: false }
			expect(dataReducer.reloadReport(currentState, { type: 'UNKNOWN_ACTION' })).toEqual(currentState)
		})
	})
})

