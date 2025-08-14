import { dateRange } from '@/reducers/dateRangeReducer'
import * as types from '@/actions/types'

describe('dateRangeReducer', () => {
	test('initial state is null', () => {
		expect(dateRange(undefined, { type: '@@INIT' })).toBeNull()
	})

	test('sets from action.data', () => {
		const v = { fromDate: 'a', toDate: 'b' }
		expect(dateRange(null, { type: types.SET_DATE_RANGE, data: v })).toBe(v)
	})
})


