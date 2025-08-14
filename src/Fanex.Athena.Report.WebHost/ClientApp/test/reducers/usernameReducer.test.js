import { username } from '@/reducers/usernameReducer'
import * as types from '@/actions/types'

describe('usernameReducer', () => {
	test('initial state is empty string', () => {
		expect(username(undefined, { type: '@@INIT' })).toBe('')
	})

	test('sets from action.data', () => {
		expect(username('', { type: types.SET_USERNAME, data: 'john' })).toBe('john')
	})
})


