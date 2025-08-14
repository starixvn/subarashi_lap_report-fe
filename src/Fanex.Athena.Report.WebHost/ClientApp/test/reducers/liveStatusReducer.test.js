import { selectedLiveStatus } from '@/reducers/liveStatusReducer'
import * as types from '@/actions/types'

describe('liveStatusReducer', () => {
	test('initial state is null', () => {
		expect(selectedLiveStatus(undefined, { type: '@@INIT' })).toBeNull()
	})

	test('sets from action.data', () => {
		expect(selectedLiveStatus(null, { type: types.SET_SELECTED_LIVESTATUS, data: 'L' })).toBe('L')
	})
})


