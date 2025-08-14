describe('constants/config', () => {
    beforeEach(() => {
        jest.resetModules()
    })

    test('isDebugging true when NODE_ENV=development', () => {
        process.env.NODE_ENV = 'development'
        const cfg = require('@/constants/config')
        expect(cfg.isDebugging).toBe(true)
    })

    test('isDebugging true when window debug flag set', () => {
        process.env.NODE_ENV = 'production'
        const { debuggingConfig } = require('@/constants/config')
        window[debuggingConfig.name] = { env: debuggingConfig.env }
        jest.resetModules()
        const cfg = require('@/constants/config')
        expect(cfg.isDebugging).toBe(true)
    })

    test('MAX_WIDTH_PAGE is min(body.clientWidth, 1920)', () => {
        Object.defineProperty(document.body, 'clientWidth', { value: 1500, configurable: true })
        const cfg = require('@/constants/config')
        expect(cfg.MAX_WIDTH_PAGE).toBe(1500)
        Object.defineProperty(document.body, 'clientWidth', { value: 2500, configurable: true })
        jest.resetModules()
        const cfg2 = require('@/constants/config')
        expect(cfg2.MAX_WIDTH_PAGE).toBe(1920)
    })
})

