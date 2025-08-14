jest.mock('@/lib/axios', () => ({
    __esModule: true,
    default: {
        get: jest.fn((url, cfg) => Promise.resolve({ url, cfg })),
        post: jest.fn((url, data, cfg) => Promise.resolve({ url, data, cfg })),
        CancelToken: { source: jest.fn(() => ({ token: 'tok' })) },
        isCancel: jest.fn((x) => x && x.__cancel === true)
    }
}))

describe('DataService', () => {
    beforeEach(() => {
        jest.resetModules()
    })

    test('buildProxyUrl encodes slashes to underscores', () => {
        const DataService = require('@/lib/dataService').default
        expect(DataService.buildProxyUrl('Report', 'Api/Path/To')).toBe('Proxy/Report/Api_Path_To')
    })

    test('getProxyData and postProxyData call axios with proxy url', async () => {
        const DataService = require('@/lib/dataService').default
        const axios = require('@/lib/axios').default
        await DataService.getProxyData('Report', 'Api/Url', { a: 1 })
        expect(axios.get).toHaveBeenCalledWith('Proxy/Report/Api_Url', expect.any(Object))
        await DataService.postProxyData('Report', 'Api/Url', { a: 1 })
        expect(axios.post).toHaveBeenCalledWith('Proxy/Report/Api_Url', { a: 1 }, expect.any(Object))
    })

    test('getData uses cancellation token', async () => {
        const DataService = require('@/lib/dataService').default
        const axios = require('@/lib/axios').default
        await DataService.getData('u', { q: 1 })
        expect(axios.CancelToken.source).toHaveBeenCalled()
        expect(axios.get).toHaveBeenCalledWith('u', expect.objectContaining({ params: { q: 1 }, cancelToken: 'tok' }))
    })

    test('getFile sets responseType and uses post; shallow merges headers', async () => {
        const DataService = require('@/lib/dataService').default
        const axios = require('@/lib/axios').default
        await DataService.getFile('file', { p: 1 }, { headers: { X: '1' } })
        expect(axios.post).toHaveBeenCalledWith('file', { p: 1 }, expect.objectContaining({ responseType: 'blob', headers: { X: '1' } }))
    })

    test('isCancel proxies axios.isCancel', () => {
        const DataService = require('@/lib/dataService').default
        const axios = require('@/lib/axios').default
        expect(DataService.isCancel({ __cancel: true })).toBe(true)
        expect(axios.isCancel).toHaveBeenCalled()
    })
})

