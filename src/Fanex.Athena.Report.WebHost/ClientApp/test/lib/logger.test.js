import Logger from '@/lib/logger'

jest.mock('redux-logger', () => ({ createLogger: jest.fn(() => 'LOGGER') }))

describe('Logger', () => {
    beforeEach(() => {
        jest.resetModules()
        delete window.__lrfConfig__
        process.env.NODE_ENV = 'production'
    })

    test('getLoggerMiddleware returns logger instance', () => {
        const logger = Logger.getLoggerMiddleware()
        expect(logger).toBe('LOGGER')
    })
})

