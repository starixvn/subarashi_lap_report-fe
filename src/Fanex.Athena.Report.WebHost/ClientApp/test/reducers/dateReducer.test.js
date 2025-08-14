import { selectedDate } from '@/reducers/dateReducer'
import * as types from '@/actions/types'

describe('dateReducer', () => {
    test('initial state is null', () => {
        expect(selectedDate(undefined, { type: '@@INIT' })).toBeNull()
    })

    test('sets date from action.data', () => {
        const date = '2023-10-10'
        expect(selectedDate(null, { type: types.SET_DATE, data: date })).toBe(date)
    })
})

