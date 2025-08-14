import StringHelper from '@/lib/stringHelper'

describe('StringHelper', () => {
    test('isEmptyOrWhiteSpace returns true for empty or whitespace', () => {
        expect(StringHelper.isEmptyOrWhiteSpace('')).toBe(true)
        expect(StringHelper.isEmptyOrWhiteSpace('   ')).toBe(true)
        expect(StringHelper.isEmptyOrWhiteSpace(null)).toBe(true)
        expect(StringHelper.isEmptyOrWhiteSpace(undefined)).toBe(true)
    })

    test('isEmptyOrWhiteSpace returns false for non-empty', () => {
        expect(StringHelper.isEmptyOrWhiteSpace('abc')).toBe(false)
        expect(StringHelper.isEmptyOrWhiteSpace(' a ')).toBe(false)
    })

    test('addSpaceAfterComma inserts spaces after commas', () => {
        expect(StringHelper.addSpaceAfterComma('a,b,c')).toBe('a, b, c')
        expect(StringHelper.addSpaceAfterComma('a, b,c')).toBe('a,  b, c')
        expect(StringHelper.addSpaceAfterComma('abc')).toBe('abc')
        expect(StringHelper.addSpaceAfterComma('')).toBe('')
    })
})

