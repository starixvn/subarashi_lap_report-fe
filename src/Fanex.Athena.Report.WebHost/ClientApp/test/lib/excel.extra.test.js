import Excel from '@/lib/excel'

jest.mock('xlsx-style-sparta', () => ({
    read: jest.fn(() => ({ SheetNames: ['S1'], Sheets: { S1: {} } })),
    utils: {
        sheet_to_json: jest.fn((ws, opts) => (opts && opts.header === 1 ? [['H1', 'H2']] : [{ A: 1 }])),
        encode_cell: jest.fn((c) => `${c.c}:${c.r}`)
    },
    write: jest.fn(() => 'WB')
}), { virtual: true })

describe('Excel extra', () => {
    beforeEach(() => {
        jest.resetModules()
        delete window.XLSX
        Object.defineProperty(window, 'URL', { value: { createObjectURL: jest.fn(() => 'blob://'), revokeObjectURL: jest.fn() }, writable: true })
        document.body.innerHTML = ''
    })

    test('process loads xlsx-style-sparta and enables getCellAddress', async () => {
        await new Promise((resolve) => Excel.process(resolve))
        expect(Excel.getCellAddress({ c: 1, r: 2 })).toBe('1:2')
    })

    test('export writes workbook and calls download', async () => {
        await new Promise((resolve) => Excel.process(resolve))
        const spy = jest.spyOn(Excel, 'download').mockImplementation(() => {})
        Excel.export({ A1: { v: 1 } }, 'FN')
        expect(spy).toHaveBeenCalledWith('WB', 'FN')
        spy.mockRestore()
    })

    test('read uses FileReader and invokes callback with parsed content', async () => {
        await new Promise((resolve) => Excel.process(resolve))
        class FR {
            constructor() { this.onload = null }
            readAsArrayBuffer() { this.onload({ target: { result: 'BINARY' } }) }
        }
        global.FileReader = FR
        const cb = jest.fn()
        Excel.read(new Blob(['x']), 0, cb)
        expect(cb).toHaveBeenCalledWith({ header: ['H1', 'H2'], content: [{ A: 1 }] })
    })
})

