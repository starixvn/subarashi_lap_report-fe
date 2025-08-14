import { selectedCustomerClass, selectedRiskLevel } from '@/reducers/customerClassReducer'
import * as types from '@/actions/types'

describe('customerClassReducer', () => {
	test('selectedCustomerClass initial state is null', () => {
		expect(selectedCustomerClass(undefined, { type: '@@INIT' })).toBeNull()
	})

	test('selectedCustomerClass sets from action.data', () => {
		expect(selectedCustomerClass(null, { type: types.SET_SELECTED_CUSTOMERCLASS, data: 'VIP' })).toBe('VIP')
	})

	test('selectedRiskLevel initial state is {}', () => {
		expect(selectedRiskLevel(undefined, { type: '@@INIT' })).toEqual({})
	})

	test('selectedRiskLevel sets from action.data', () => {
		const v = { level: 'H' }
		expect(selectedRiskLevel({}, { type: types.SET_SELECTED_RISKLEVEL, data: v })).toBe(v)
	})
})


