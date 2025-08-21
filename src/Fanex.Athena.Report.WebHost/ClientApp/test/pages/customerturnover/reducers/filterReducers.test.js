import { reportBy, minimumOdds, selectedTickets } from '@/pages/customerturnover/reducers/filterReducers'
import { SET_REPORT_BY, SET_MINIMUM_ODDS, SET_SELECTED_TICKET } from '@/pages/customerturnover/actions/types'

describe('customerturnover filterReducers', () => {
	describe('reportBy reducer', () => {
		test('should return initial state of null', () => {
			expect(reportBy(undefined, { type: '@@INIT' })).toBeNull()
		})

		test('should handle SET_REPORT_BY action', () => {
			const action = {
				type: SET_REPORT_BY,
				data: 'customer'
			}
			expect(reportBy(null, action)).toBe('customer')
		})

		test('should return current state for unhandled actions', () => {
			const currentState = 'member'
			expect(reportBy(currentState, { type: 'UNKNOWN_ACTION' })).toBe('member')
		})
	})

	describe('minimumOdds reducer', () => {
		test('should return initial state of null', () => {
			expect(minimumOdds(undefined, { type: '@@INIT' })).toBeNull()
		})

		test('should handle SET_MINIMUM_ODDS action', () => {
			const action = {
				type: SET_MINIMUM_ODDS,
				data: 1.5
			}
			expect(minimumOdds(null, action)).toBe(1.5)
		})

		test('should return current state for unhandled actions', () => {
			const currentState = 2.0
			expect(minimumOdds(currentState, { type: 'UNKNOWN_ACTION' })).toBe(2.0)
		})
	})

	describe('selectedTickets reducer', () => {
		test('should return initial state of empty array', () => {
			expect(selectedTickets(undefined, { type: '@@INIT' })).toEqual([])
		})

		test('should handle SET_SELECTED_TICKET action', () => {
			const tickets = [{ id: 1, name: 'ticket1' }, { id: 2, name: 'ticket2' }]
			const action = {
				type: SET_SELECTED_TICKET,
				data: tickets
			}
			expect(selectedTickets([], action)).toEqual(tickets)
		})

		test('should return current state for unhandled actions', () => {
			const currentState = [{ id: 1, name: 'ticket1' }]
			expect(selectedTickets(currentState, { type: 'UNKNOWN_ACTION' })).toEqual(currentState)
		})
	})
})

