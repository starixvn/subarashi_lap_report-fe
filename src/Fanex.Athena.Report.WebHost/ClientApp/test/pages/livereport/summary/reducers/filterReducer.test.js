import { selectedProductCode } from '@/pages/livereport/summary/reducers/filterReducer'
import { SET_PRODUCT_CODE } from '@/pages/livereport/summary/actions/types'

describe('livereport summary filterReducer', () => {
	describe('selectedProductCode reducer', () => {
		test('should return initial state of false', () => {
			expect(selectedProductCode(undefined, { type: '@@INIT' })).toBe(false)
		})

		test('should handle SET_PRODUCT_CODE action with boolean value', () => {
			const action = {
				type: SET_PRODUCT_CODE,
				data: true
			}
			expect(selectedProductCode(false, action)).toBe(true)
		})

		test('should handle SET_PRODUCT_CODE action with string value', () => {
			const action = {
				type: SET_PRODUCT_CODE,
				data: 'SB001'
			}
			expect(selectedProductCode(false, action)).toBe('SB001')
		})

		test('should handle SET_PRODUCT_CODE action with object value', () => {
			const productCode = { id: 1, code: 'SB001', name: 'Sportsbook' }
			const action = {
				type: SET_PRODUCT_CODE,
				data: productCode
			}
			expect(selectedProductCode(false, action)).toEqual(productCode)
		})

		test('should return current state for unhandled actions', () => {
			const currentState = 'SB001'
			expect(selectedProductCode(currentState, { type: 'UNKNOWN_ACTION' })).toBe('SB001')
		})

		test('should handle null data', () => {
			const action = {
				type: SET_PRODUCT_CODE,
				data: null
			}
			expect(selectedProductCode('SB001', action)).toBeNull()
		})
	})
})

