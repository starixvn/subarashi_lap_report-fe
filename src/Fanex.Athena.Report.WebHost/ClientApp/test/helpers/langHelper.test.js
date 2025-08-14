describe('LangHelper', () => {
    beforeEach(() => {
        jest.resetModules()
        delete window.pageLanguage
        window._language_en_US = { Key: 'Val', May2: 'May', DateRange: 'Date Range' }
        window._language_vi_VN = { Key: 'GiaTri', DateRange: 'Khoang Ngay' }
    })

    test('getSingleResource falls back to default when not found and respects current language', () => {
        window.pageLanguage = 'vi-VN'
        const LangHelper = require('@/helpers/langHelper').default
        expect(LangHelper.getSingleResource('Key')).toBe('GiaTri')
        expect(LangHelper.getSingleResource('Unknown')).toBe('Unknown')
    })

    test('getDateRangeResource maps May to May2 (default en-US)', () => {
        delete window.pageLanguage
        const LangHelper = require('@/helpers/langHelper').default
        expect(LangHelper.getDateRangeResource('May')).toBe('May')
    })

    test('getResources returns array with fallback by language', () => {
        window.pageLanguage = 'vi-VN'
        const LangHelper = require('@/helpers/langHelper').default
        const res = LangHelper.getResources(['Key', 'Unknown'])
        expect(res).toEqual(['GiaTri', 'Unknown'])
    })
})

