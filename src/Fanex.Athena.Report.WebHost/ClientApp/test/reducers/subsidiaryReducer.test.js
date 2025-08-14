import { selectedSubsidiary, subsidiarySearch, whiteLabelTreeList } from '@/reducers/subsidiaryReducer'
import { SET_SUBSIDIARY_LIST, SET_SUBSIDIARY_SEARCH, SET_WHITELABEL_TREE_LIST } from '@/actions/types'

describe('subsidiaryReducer', () => {
	test('selectedSubsidiary initial state is null', () => {
		expect(selectedSubsidiary(undefined, { type: '@@INIT' })).toBeNull()
	})

	test('selectedSubsidiary sets from action.data', () => {
		expect(selectedSubsidiary(null, { type: SET_SUBSIDIARY_LIST, data: [1] })).toEqual([1])
	})

	test('subsidiarySearch initial state is false', () => {
		expect(subsidiarySearch(undefined, { type: '@@INIT' })).toBe(false)
	})

	test('subsidiarySearch sets from action.data', () => {
		expect(subsidiarySearch(false, { type: SET_SUBSIDIARY_SEARCH, data: 'k' })).toBe('k')
	})

	test('whiteLabelTreeList initial state is false', () => {
		expect(whiteLabelTreeList(undefined, { type: '@@INIT' })).toBe(false)
	})

	test('whiteLabelTreeList sets from action.data', () => {
		expect(whiteLabelTreeList(false, { type: SET_WHITELABEL_TREE_LIST, data: ['w'] })).toEqual(['w'])
	})
})


