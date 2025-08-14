describe('settingHelper', () => {
    let originalEnv
    beforeEach(() => {
        jest.resetModules()
        delete window.rootUrl
        originalEnv = process.env
    })
    afterEach(() => {
        process.env = originalEnv
    })

    test('exports BetTicketEventBuilderUrl and TokenScriptLink from APP_SETTING', () => {
        window.rootUrl = '/root/'
        process.env = { ...originalEnv, APP_SETTING: { BetTicketEventBuilderUrl: 'https://bt', HomeToken: 'token.js' } }
        const helper = require('@/helpers/settingHelper')
        expect(helper.BetTicketEventBuilderUrl).toBe('https://bt')
        expect(helper.TokenScriptLink).toBe('/root/token.js')
    })
})

