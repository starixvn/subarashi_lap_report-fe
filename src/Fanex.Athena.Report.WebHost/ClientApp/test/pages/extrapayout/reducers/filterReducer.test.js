import filterReducer from '@/pages/extrapayout/reducers/filterReducer'
import { SET_REPORT_FILTER, SET_DETAIL_PARAMS, SET_CONVERT_ALL_TO_BASE_CURRENCY } from '@/pages/extrapayout/actions/types'

describe('extrapayout filterReducer', () => {
	test('should export an object with reportFilter, detailParams, and isConvertAllToBaseCurrency', () => {
		expect(filterReducer).toHaveProperty('reportFilter')
		expect(filterReducer).toHaveProperty('detailParams')
		expect(filterReducer).toHaveProperty('isConvertAllToBaseCurrency')
		expect(typeof filterReducer.reportFilter).toBe('function')
		expect(typeof filterReducer.detailParams).toBe('function')
		expect(typeof filterReducer.isConvertAllToBaseCurrency).toBe('function')
	})

	describe('reportFilter reducer', () => {
		test('should return initial state of null', () => {
			expect(filterReducer.reportFilter(undefined, { type: '@@INIT' })).toBeNull()
		})

		test('should handle SET_REPORT_FILTER action', () => {
			const filterData = {
				dateRange: { start: '2023-01-01', end: '2023-01-31' },
				promotionTypes: ['bonus', 'rebate']
			}
			const action = {
				type: SET_REPORT_FILTER,
				data: filterData
			}
			expect(filterReducer.reportFilter(null, action)).toEqual(filterData)
		})

		test('should return current state for unhandled actions', () => {
			const currentState = { existing: 'filter' }
			expect(filterReducer.reportFilter(currentState, { type: 'UNKNOWN_ACTION' })).toEqual(currentState)
		})
	})

	describe('detailParams reducer', () => {
		test('should return initial state of null', () => {
			expect(filterReducer.detailParams(undefined, { type: '@@INIT' })).toBeNull()
		})

		test('should handle SET_DETAIL_PARAMS action', () => {
			const detailParams = {
				page: 1,
				pageSize: 50,
				sortBy: 'date',
				sortOrder: 'desc'
			}
			const action = {
				type: SET_DETAIL_PARAMS,
				data: detailParams
			}
			expect(filterReducer.detailParams(null, action)).toEqual(detailParams)
		})

		test('should return current state for unhandled actions', () => {
			const currentState = { page: 2 }
			expect(filterReducer.detailParams(currentState, { type: 'UNKNOWN_ACTION' })).toEqual(currentState)
		})
	})

	describe('isConvertAllToBaseCurrency reducer', () => {
		test('should return initial state of true', () => {
			expect(filterReducer.isConvertAllToBaseCurrency(undefined, { type: '@@INIT' })).toBe(true)
		})

		test('should handle SET_CONVERT_ALL_TO_BASE_CURRENCY action', () => {
			const action = {
				type: SET_CONVERT_ALL_TO_BASE_CURRENCY,
				data: false
			}
			expect(filterReducer.isConvertAllToBaseCurrency(true, action)).toBe(false)
		})

		test('should return current state for unhandled actions', () => {
			const currentState = false
			expect(filterReducer.isConvertAllToBaseCurrency(currentState, { type: 'UNKNOWN_ACTION' })).toBe(false)
		})
	})
})

