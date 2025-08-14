let originalLocation

describe('Site', () => {
    beforeAll(() => {
        originalLocation = window.location
    })
    beforeEach(() => {
        jest.resetModules()
        delete window.rootUrl
        delete window.location
        window.location = { replace: jest.fn(), assign: jest.fn(), pathname: '/' }
        Object.defineProperty(window, 'URL', {
            value: { createObjectURL: jest.fn(() => 'blob://url'), revokeObjectURL: jest.fn() },
            writable: true
        })
        document.body.innerHTML = ''
    })
    afterAll(() => {
        window.location = originalLocation
    })

    test('resolveClientUrl joins with rootUrl', () => {
        window.rootUrl = '/root/'
        const Site = require('@/lib/site').default
        expect(Site.resolveClientUrl('path')).toBe('/root/path')
    })

    test('isEmptyObject returns true for empty object', () => {
        const Site = require('@/lib/site').default
        expect(Site.isEmptyObject({})).toBe(true)
        expect(Site.isEmptyObject({ a: 1 })).toBe(false)
    })

    test('asNull trims and converts empty to null', () => {
        const Site = require('@/lib/site').default
        expect(Site.asNull('  ')).toBeNull()
        expect(Site.asNull(' a ')).toBe('a')
        expect(Site.asNull(null)).toBeNull()
    })

    test('getCookie and setCookie', () => {
        document.cookie = ''
        const Site = require('@/lib/site').default
        Site.setCookie('x', '1', 1)
        expect(Site.getCookie('x')).toBe('1')
    })

    test('redirectToUrl and assignToUrl use location methods', () => {
        window.rootUrl = '/'
        const Site = require('@/lib/site').default
        Site.redirectToUrl('abc')
        expect(window.location.replace).toHaveBeenCalledWith('/abc')
        Site.assignToUrl('def')
        expect(window.location.assign).toHaveBeenCalledWith('/def')
    })
})

