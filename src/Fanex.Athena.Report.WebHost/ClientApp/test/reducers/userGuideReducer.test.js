import { userGuideContent } from '@/reducers/userGuideReducer'
import * as types from '@/actions/types'

describe('userGuideReducer', () => {
	test('initial state is null', () => {
		expect(userGuideContent(undefined, { type: '@@INIT' })).toBeNull()
	})

	test('sets from action.data', () => {
		expect(userGuideContent(null, { type: types.USER_GUIDE_CONTENT, data: 'c' })).toBe('c')
	})
})


