import { selectedProduct } from '@/reducers/productReducer'
import * as types from '@/actions/types'

describe('productReducer', () => {
	test('initial state is null', () => {
		expect(selectedProduct(undefined, { type: '@@INIT' })).toBeNull()
	})

	test('sets from action.data', () => {
		expect(selectedProduct(null, { type: types.SET_SELECTED_PRODUCT, data: [1,2] })).toEqual([1,2])
	})
})


