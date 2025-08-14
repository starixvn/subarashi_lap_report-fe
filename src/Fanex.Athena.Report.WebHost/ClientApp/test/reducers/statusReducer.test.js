import { selectedStatus } from '@/reducers/statusReducer'
import * as types from '@/actions/types'

describe('statusReducer', () => {
	test('initial state is null', () => {
		expect(selectedStatus(undefined, { type: '@@INIT' })).toBeNull()
	})

	test('sets from action.data', () => {
		expect(selectedStatus(null, { type: types.SET_SELECTED_STATUS, data: 'S' })).toBe('S')
	})
})


