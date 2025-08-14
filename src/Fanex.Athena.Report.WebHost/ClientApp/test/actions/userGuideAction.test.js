import * as types from '@/actions/types'
import { getUserGuideContent, setUserGuideContent } from '@/actions/userGuideAction'

jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { getReportData: jest.fn() } }))

describe('userGuideAction', () => {
    test('setUserGuideContent returns action', () => {
        expect(setUserGuideContent('x')).toEqual({ type: types.USER_GUIDE_CONTENT, data: 'x' })
    })

    test('getUserGuideContent dispatches content', async () => {
        const DataService = require('@/lib/dataService').default
        DataService.getReportData.mockResolvedValue({ data: 'content' })
        const dispatch = jest.fn()
        const thunk = getUserGuideContent('res')
        await thunk(dispatch)
        expect(DataService.getReportData).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith({ type: types.USER_GUIDE_CONTENT, data: 'content' })
    })
})

