import promotionTypeReducer from '@/pages/extrapayout/reducers/promotionTypeReducer'
import { SET_SELECTED_PROMOTION_TYPES, SET_PROMOTION_TYPE_LIST } from '@/pages/extrapayout/actions/types'

describe('extrapayout promotionTypeReducer', () => {
	test('should export an object with promotionTypeList and selectedPromotionTypes', () => {
		expect(promotionTypeReducer).toHaveProperty('promotionTypeList')
		expect(promotionTypeReducer).toHaveProperty('selectedPromotionTypes')
		expect(typeof promotionTypeReducer.promotionTypeList).toBe('function')
		expect(typeof promotionTypeReducer.selectedPromotionTypes).toBe('function')
	})

	describe('selectedPromotionTypes reducer', () => {
		test('should return initial state of empty object', () => {
			expect(promotionTypeReducer.selectedPromotionTypes(undefined, { type: '@@INIT' })).toEqual({})
		})

		test('should handle SET_SELECTED_PROMOTION_TYPES action', () => {
			const selectedTypes = {
				bonus: true,
				rebate: false,
				cashback: true
			}
			const action = {
				type: SET_SELECTED_PROMOTION_TYPES,
				data: selectedTypes
			}
			expect(promotionTypeReducer.selectedPromotionTypes({}, action)).toEqual(selectedTypes)
		})

		test('should return current state for unhandled actions', () => {
			const currentState = { bonus: true }
			expect(promotionTypeReducer.selectedPromotionTypes(currentState, { type: 'UNKNOWN_ACTION' })).toEqual(currentState)
		})
	})

	describe('promotionTypeList reducer', () => {
		test('should return initial state of null', () => {
			expect(promotionTypeReducer.promotionTypeList(undefined, { type: '@@INIT' })).toBeNull()
		})

		test('should handle SET_PROMOTION_TYPE_LIST action', () => {
			const promotionList = [
				{ id: 1, name: 'Welcome Bonus', code: 'WB' },
				{ id: 2, name: 'Rebate', code: 'RB' },
				{ id: 3, name: 'Cashback', code: 'CB' }
			]
			const action = {
				type: SET_PROMOTION_TYPE_LIST,
				data: promotionList
			}
			expect(promotionTypeReducer.promotionTypeList(null, action)).toEqual(promotionList)
		})

		test('should return current state for unhandled actions', () => {
			const currentState = [{ id: 1, name: 'Test Promotion' }]
			expect(promotionTypeReducer.promotionTypeList(currentState, { type: 'UNKNOWN_ACTION' })).toEqual(currentState)
		})
	})
})

