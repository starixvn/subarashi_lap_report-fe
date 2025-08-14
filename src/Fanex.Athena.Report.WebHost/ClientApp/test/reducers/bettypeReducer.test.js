import { selectedBettype, bettypeList } from '@/reducers/bettypeReducer'
import * as types from '@/actions/types'

describe('bettypeReducer', () => {
	test('selectedBettype initial state is null', () => {
		expect(selectedBettype(undefined, { type: '@@INIT' })).toBeNull()
	})

	test('selectedBettype sets from action.data', () => {
		expect(selectedBettype(null, { type: types.SET_SELECTED_BETTYPE, data: [1,2] })).toEqual([1,2])
	})

	test('bettypeList initial state is []', () => {
		expect(bettypeList(undefined, { type: '@@INIT' })).toEqual([])
	})

	test('bettypeList sets from action.data', () => {
		const list = ['a']
		expect(bettypeList([], { type: types.SET_BETTYPE_LIST, data: list })).toBe(list)
	})
})


