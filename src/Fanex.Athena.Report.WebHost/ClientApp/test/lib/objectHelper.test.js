import ObjectHelper from '@/lib/objectHelper'

describe('ObjectHelper.toCamel', () => {
    test('converts object keys to camelCase (first letter lower)', () => {
        const input = { Foo: 1, BarBaz: 2 }
        const output = ObjectHelper.toCamel(input)
        expect(output).toEqual({ foo: 1, barBaz: 2 })
    })

    test('recursively converts nested objects and arrays', () => {
        const input = {
            Foo: { InnerKey: 'v' },
            List: [{ ItemVal: 1 }, { ItemVal: 2 }]
        }
        const output = ObjectHelper.toCamel(input)
        expect(output).toEqual({ foo: { innerKey: 'v' }, list: [{ itemVal: 1 }, { itemVal: 2 }] })
    })
})

