import { isLoading } from '@/reducers/loaderReducer'
import * as types from '@/actions/types'

describe('loaderReducer', () => {
	test('initial state is false', () => {
		expect(isLoading(undefined, { type: '@@INIT' })).toBe(false)
	})

	test('toggles loading state from action.data', () => {
		expect(isLoading(false, { type: types.TOGGLE_LOADER, data: true })).toBe(true)
		expect(isLoading(true, { type: types.TOGGLE_LOADER, data: false })).toBe(false)
	})
})

