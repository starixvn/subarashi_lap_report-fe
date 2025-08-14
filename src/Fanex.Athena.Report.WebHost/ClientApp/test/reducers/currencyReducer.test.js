import { selectedCurrency } from '@/reducers/currencyReducer'
import * as types from '@/actions/types'

describe('currencyReducer', () => {
	test('initial state is null', () => {
		expect(selectedCurrency(undefined, { type: '@@INIT' })).toBeNull()
	})

	test('sets from action.data', () => {
		expect(selectedCurrency(null, { type: types.SET_SELECTED_CURRENCY, data: 'USD' })).toBe('USD')
	})
})


