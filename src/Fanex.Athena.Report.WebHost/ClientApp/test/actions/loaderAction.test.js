import * as types from '@/actions/types'
import { toggleLoader, toggleLoaderAction } from '@/actions/loaderAction'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: jest.fn(() => 'Error') } }))

describe('loaderAction', () => {
    beforeEach(() => {
        window.alert = jest.fn()
        jest.spyOn(console, 'error').mockImplementation(() => {})
    })

    afterEach(() => {
        console.error.mockRestore()
    })

    test('toggleLoader returns action', () => {
        expect(toggleLoader(true)).toEqual({ type: types.TOGGLE_LOADER, data: true })
    })

    test('toggleLoaderAction resolves and dispatches start/stop and callback', async () => {
        const dispatch = jest.fn()
        const requestFunc = jest.fn(() => Promise.resolve({ ok: true }))
        const callback = jest.fn()
        const thunk = toggleLoaderAction(requestFunc, callback)
        try { thunk(dispatch) } catch (e) {}
        expect(dispatch).toHaveBeenCalledWith({ type: types.TOGGLE_LOADER, data: true })
        await new Promise((r) => setTimeout(r, 0))
        expect(callback).toHaveBeenCalled()
        expect(dispatch).toHaveBeenLastCalledWith({ type: types.TOGGLE_LOADER, data: false })
    })

    test('toggleLoaderAction rejects and alerts, logs, and stops loader', async () => {
        const dispatch = jest.fn()
        const requestFunc = jest.fn(() => Promise.reject(new Error('x')))
        const thunk = toggleLoaderAction(requestFunc)
        try { thunk(dispatch) } catch (e) {}
        await new Promise((r) => setTimeout(r, 0))
        expect(window.alert).toHaveBeenCalled()
        expect(dispatch).toHaveBeenLastCalledWith({ type: types.TOGGLE_LOADER, data: false })
    })
})

