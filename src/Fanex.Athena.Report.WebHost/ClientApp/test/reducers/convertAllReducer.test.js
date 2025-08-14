import { isConvertAll } from '@/reducers/convertAllReducer'
import * as types from '@/actions/types'

describe('convertAllReducer', () => {
	test('initial state is null', () => {
		expect(isConvertAll(undefined, { type: '@@INIT' })).toBeNull()
	})

	test('sets from action.data', () => {
		expect(isConvertAll(null, { type: types.CHANGE_IS_CONVERT_ALL, data: true })).toBe(true)
	})
})


