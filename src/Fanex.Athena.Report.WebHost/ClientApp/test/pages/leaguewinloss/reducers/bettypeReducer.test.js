import bettypeReducer from '@/pages/leaguewinloss/reducers/bettypeReducer'
import { SET_SELECTED_BETTYPE, SET_BETTYPE_LIST } from '@/pages/leaguewinloss/actions/types'

describe('leaguewinloss bettypeReducer', () => {
	test('should export an object with selectedBettype and bettypeList', () => {
		expect(bettypeReducer).toHaveProperty('selectedBettype')
		expect(bettypeReducer).toHaveProperty('bettypeList')
		expect(typeof bettypeReducer.selectedBettype).toBe('function')
		expect(typeof bettypeReducer.bettypeList).toBe('function')
	})

	describe('selectedBettype reducer', () => {
		test('should return initial state of empty object', () => {
			expect(bettypeReducer.selectedBettype(undefined, { type: '@@INIT' })).toEqual({})
		})

		test('should handle SET_SELECTED_BETTYPE action', () => {
			const selectedBettype = {
				1: true,
				2: false,
				3: true
			}
			const action = {
				type: SET_SELECTED_BETTYPE,
				data: selectedBettype
			}
			expect(bettypeReducer.selectedBettype({}, action)).toEqual(selectedBettype)
		})

		test('should return current state for unhandled actions', () => {
			const currentState = { 1: true, 2: false }
			expect(bettypeReducer.selectedBettype(currentState, { type: 'UNKNOWN_ACTION' })).toEqual(currentState)
		})
	})

	describe('bettypeList reducer', () => {
		test('should return initial state of empty object', () => {
			expect(bettypeReducer.bettypeList(undefined, { type: '@@INIT' })).toEqual({})
		})

		test('should handle SET_BETTYPE_LIST action', () => {
			const bettypeList = {
				1: { id: 1, name: 'Single', code: 'S' },
				2: { id: 2, name: 'Parlay', code: 'P' },
				3: { id: 3, name: 'System', code: 'SY' }
			}
			const action = {
				type: SET_BETTYPE_LIST,
				data: bettypeList
			}
			expect(bettypeReducer.bettypeList({}, action)).toEqual(bettypeList)
		})

		test('should return current state for unhandled actions', () => {
			const currentState = { 1: { id: 1, name: 'Single' } }
			expect(bettypeReducer.bettypeList(currentState, { type: 'UNKNOWN_ACTION' })).toEqual(currentState)
		})
	})
})

