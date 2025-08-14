import Report from '@/lib/report'
import axios from 'axios'

jest.mock('axios', () => ({ post: jest.fn(() => Promise.resolve({ ok: true })) }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { resolveClientUrl: (rel) => '/api/' + rel, getXsrfToken: () => 'xsrf' } }))

describe('Report extra', () => {
    beforeEach(() => {
        jest.resetModules()
        delete window.rootUrl
        window.location = { replace: jest.fn(), assign: jest.fn() }
    })

    test('fetchGridData posts to resolved client URL', async () => {
        await Report.fetchGridData('path', { data: { a: 1 } })
        expect(axios.post).toHaveBeenCalledWith('/api/path', { a: 1 }, expect.any(Object))
    })
})

