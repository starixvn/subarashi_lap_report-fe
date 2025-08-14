import createReducer from '@/lib/createReducer'

describe('createReducer', () => {
    test('returns initial state when action not handled', () => {
        const reducer = createReducer(0, {})
        expect(reducer(undefined, { type: 'UNKNOWN' })).toBe(0)
    })

    test('handles action with provided handler', () => {
        const reducer = createReducer(0, {
            INCR: (state, action) => state + action.amount
        })
        expect(reducer(1, { type: 'INCR', amount: 2 })).toBe(3)
    })
})

