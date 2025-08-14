import { isExcludeTest } from '@/reducers/excludeTestReducer'
import * as types from '@/actions/types'

describe('excludeTestReducer', () => {
    test('initial state is {}', () => {
        expect(isExcludeTest(undefined, { type: '@@INIT' })).toEqual({})
    })

    test('changes excludeTest from action.data', () => {
        const payload = { x: 1 }
        expect(isExcludeTest({}, { type: types.CHANGE_IS_EXCLUDE_TEST, data: payload })).toEqual(payload)
    })
})

