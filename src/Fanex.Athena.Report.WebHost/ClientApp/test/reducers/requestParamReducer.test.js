import { requestParam } from '@/reducers/requestParamReducer'
import * as types from '@/actions/types'

describe('requestParamReducer', () => {
	test('initial state is {}', () => {
		expect(requestParam(undefined, { type: '@@INIT' })).toEqual({})
	})

	test('sets cloned object from action.data', () => {
		const v = { k: 'v' }
		const result = requestParam({}, { type: types.SET_REQUEST_PARAM, data: v })
		expect(result).toEqual(v)
		expect(result).not.toBe(v)
	})
})


