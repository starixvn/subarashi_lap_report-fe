import axios from '@/lib/axios'

jest.mock('axios', () => {
    const actual = jest.requireActual('axios')
    const mock = {
        interceptors: {
            response: { use: jest.fn((success, error) => { mock._error = error }) }
        },
        post: jest.fn(),
        get: jest.fn()
    }
    return { ...actual, ...mock }
})

describe('axios interceptors', () => {
    beforeEach(() => {
        jest.resetModules()
        delete window.rootUrl
        delete window.location
        window.location = { replace: jest.fn(), assign: jest.fn() }
    })

    test('redirects on 403, 401, 503', async () => {
        const replaceSpy = window.location.replace
        const errorHandler = axios.interceptors.response.use.mock.calls[0][1]

        try { await errorHandler({ response: { status: 403 } }) } catch (e) {}
        expect(replaceSpy).toHaveBeenCalled()

        window.location.replace.mockClear()
        try { await errorHandler({ response: { status: 401 } }) } catch (e) {}
        expect(replaceSpy).toHaveBeenCalled()

        window.location.replace.mockClear()
        try { await errorHandler({ response: { status: 503 } }) } catch (e) {}
        expect(replaceSpy).toHaveBeenCalled()
    })
})

