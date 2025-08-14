import Excel from '@/lib/excel'

describe('Excel.getCellType', () => {
    test('maps typeof to excel type codes', () => {
        expect(Excel.getCellType(1)).toBe('n')
        expect(Excel.getCellType('a')).toBe('s')
        expect(Excel.getCellType(true)).toBe('b')
        expect(Excel.getCellType({})).toBe('d')
    })
})

describe('Excel.sheetToArrayBuffer', () => {
    test('converts string to ArrayBuffer', () => {
        const buf = Excel.sheetToArrayBuffer('ABC')
        expect(buf instanceof ArrayBuffer).toBe(true)
        const arr = new Uint8Array(buf)
        expect(Array.from(arr)).toEqual([65, 66, 67])
    })
})

