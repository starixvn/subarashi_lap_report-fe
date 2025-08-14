import { selectedPlatform } from '@/reducers/platformReducer'
import * as types from '@/actions/types'

describe('platformReducer', () => {
	test('initial state is null', () => {
		expect(selectedPlatform(undefined, { type: '@@INIT' })).toBeNull()
	})

	test('sets from action.data', () => {
		expect(selectedPlatform(null, { type: types.SET_SELECTED_PLATFORM, data: 'web' })).toBe('web')
	})
})


