import { selectedBaseCurrency, baseCurrencyList } from '@/reducers/baseCurrencyReducer'
import * as types from '@/actions/types'

describe('baseCurrencyReducer', () => {
	test('selectedBaseCurrency initial state is null', () => {
		expect(selectedBaseCurrency(undefined, { type: '@@INIT' })).toBeNull()
	})

	test('selectedBaseCurrency sets from action.data', () => {
		expect(selectedBaseCurrency(null, { type: types.SET_SELECTED_BASECURRENCY, data: 1 })).toBe(1)
	})

	test('baseCurrencyList initial state is {}', () => {
		expect(baseCurrencyList(undefined, { type: '@@INIT' })).toEqual({})
	})

	test('baseCurrencyList sets from action.data', () => {
		const list = { a: 1 }
		expect(baseCurrencyList({}, { type: types.SET_BASECURRENCY_LIST, data: list })).toBe(list)
	})
})


