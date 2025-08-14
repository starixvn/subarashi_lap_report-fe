describe('Site extra', () => {
    beforeEach(() => {
        jest.resetModules()
        delete window.rootUrl
        delete window.location
        window.location = { replace: jest.fn(), assign: jest.fn(), pathname: '/' }
        Object.defineProperty(window, 'URL', { value: { createObjectURL: jest.fn(() => 'blob://'), revokeObjectURL: jest.fn() }, writable: true })
        document.body.innerHTML = ''
    })

    test('downloadFile creates an anchor and triggers click', () => {
        const Site = require('@/lib/site').default
        const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})
        Site.downloadFile('data', 'file.csv')
        expect(clickSpy).toHaveBeenCalled()
        clickSpy.mockRestore()
    })

    test('readAsJson parses blob text', (done) => {
        const Site = require('@/lib/site').default
        class FR {
            constructor() { this.onload = null }
            readAsText() { this.result = JSON.stringify({ a: 1 }); this.onload() }
        }
        global.FileReader = FR
        Site.readAsJson(new Blob(['x']), (json) => {
            expect(json).toEqual({ a: 1 })
            done()
        })
    })
})

