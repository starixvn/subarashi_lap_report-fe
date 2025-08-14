import { formData } from '@/reducers/formDataReducer'
import * as types from '@/actions/types'

describe('formDataReducer', () => {
	test('initial state is null', () => {
		expect(formData(undefined, { type: '@@INIT' })).toBeNull()
	})

	test('sets from action.data', () => {
		const v = { x: 1 }
		expect(formData(null, { type: types.SET_FORM_DATA, data: v })).toBe(v)
	})
})


