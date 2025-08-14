import Store from '@/lib/store'

jest.mock('redux-logger', () => ({ createLogger: jest.fn(() => () => (next) => (action) => next(action)) }))

describe('Store', () => {
    test('createStore composes middleware', () => {
        const reducer = (state = { c: 0 }, action) => (action.type === 'INC' ? { c: state.c + 1 } : state)
        const store = Store.createStore(reducer, undefined)
        store.dispatch({ type: 'INC' })
        expect(store.getState().c).toBe(1)
    })
})

