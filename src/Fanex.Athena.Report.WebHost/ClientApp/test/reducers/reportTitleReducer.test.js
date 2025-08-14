import { reportTitle } from '@/reducers/reportTitleReducer'
import * as types from '@/actions/types'

describe('reportTitleReducer', () => {
	test('initial state is null', () => {
		expect(reportTitle(undefined, { type: '@@INIT' })).toBeNull()
	})

	test('sets from action.data', () => {
		expect(reportTitle(null, { type: types.SET_REPORT_TITLE, data: 'T' })).toBe('T')
	})
})


