import sportReducer from '@/pages/leaguewinloss/reducers/sportReducer'
import { SET_SELECTED_SPORT, SET_SPORT_LIST } from '@/pages/leaguewinloss/actions/types'

describe('leaguewinloss sportReducer', () => {
	test('should export an object with sportList and selectedSport', () => {
		expect(sportReducer).toHaveProperty('sportList')
		expect(sportReducer).toHaveProperty('selectedSport')
		expect(typeof sportReducer.sportList).toBe('function')
		expect(typeof sportReducer.selectedSport).toBe('function')
	})

	describe('selectedSport reducer', () => {
		test('should return initial state of empty object', () => {
			expect(sportReducer.selectedSport(undefined, { type: '@@INIT' })).toEqual({})
		})

		test('should handle SET_SELECTED_SPORT action', () => {
			const selectedSport = {
				1: true,   // football
				2: false,  // basketball
				3: true    // tennis
			}
			const action = {
				type: SET_SELECTED_SPORT,
				data: selectedSport
			}
			expect(sportReducer.selectedSport({}, action)).toEqual(selectedSport)
		})

		test('should return current state for unhandled actions', () => {
			const currentState = { 1: true, 2: false }
			expect(sportReducer.selectedSport(currentState, { type: 'UNKNOWN_ACTION' })).toEqual(currentState)
		})
	})

	describe('sportList reducer', () => {
		test('should return initial state of empty object', () => {
			expect(sportReducer.sportList(undefined, { type: '@@INIT' })).toEqual({})
		})

		test('should handle SET_SPORT_LIST action', () => {
			const sportList = {
				1: { id: 1, name: 'Football', code: 'FB' },
				2: { id: 2, name: 'Basketball', code: 'BB' },
				3: { id: 3, name: 'Tennis', code: 'TN' }
			}
			const action = {
				type: SET_SPORT_LIST,
				data: sportList
			}
			expect(sportReducer.sportList({}, action)).toEqual(sportList)
		})

		test('should return current state for unhandled actions', () => {
			const currentState = { 1: { id: 1, name: 'Football' } }
			expect(sportReducer.sportList(currentState, { type: 'UNKNOWN_ACTION' })).toEqual(currentState)
		})
	})
})

