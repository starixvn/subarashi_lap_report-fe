import { selectedTabKey, tabKeys } from '@/reducers/tabHandlerReducers'
import { SET_SELECTED_TAB, SET_TAB_KEYS } from '@/actions/types'

describe('tabHandlerReducers', () => {
	test('selectedTabKey initial state is null', () => {
		expect(selectedTabKey(undefined, { type: '@@INIT' })).toBeNull()
	})

	test('selectedTabKey sets from action.data', () => {
		expect(selectedTabKey(null, { type: SET_SELECTED_TAB, data: 'tab1' })).toBe('tab1')
	})

	test('tabKeys initial state is []', () => {
		expect(tabKeys(undefined, { type: '@@INIT' })).toEqual([])
	})

	test('tabKeys sets from action.data', () => {
		expect(tabKeys([], { type: SET_TAB_KEYS, data: ['a','b'] })).toEqual(['a','b'])
	})
})


