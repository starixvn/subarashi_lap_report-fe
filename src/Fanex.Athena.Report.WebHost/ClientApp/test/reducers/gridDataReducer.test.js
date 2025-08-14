import { gridData, sweetAlertOption } from '@/reducers/gridDataReducer'
import * as types from '@/actions/types'

describe('gridDataReducer', () => {
	test('gridData initial state is null', () => {
		expect(gridData(undefined, { type: '@@INIT' })).toBeNull()
	})

	test('gridData sets from action.data', () => {
		const v = { rows: [] }
		expect(gridData(null, { type: types.SET_GRID_DATA, data: v })).toBe(v)
	})

	test('sweetAlertOption initial state is null', () => {
		expect(sweetAlertOption(undefined, { type: '@@INIT' })).toBeNull()
	})

	test('sweetAlertOption clones object', () => {
		const v = { show: true }
		const result = sweetAlertOption(null, { type: types.SET_SWEET_ALERT_OPTION, data: v })
		expect(result).toEqual(v)
		expect(result).not.toBe(v)
	})
})


