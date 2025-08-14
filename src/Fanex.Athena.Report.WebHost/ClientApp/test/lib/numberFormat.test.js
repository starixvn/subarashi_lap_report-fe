import NumberFormat from '@/lib/numberFormat'

describe('NumberFormat', () => {
    test('formatInteger formats with thousand separators', () => {
        expect(NumberFormat.formatInteger(0)).toBe('0')
        expect(NumberFormat.formatInteger(1000)).toBe('1,000')
        expect(NumberFormat.formatInteger(1234567)).toBe('1,234,567')
        expect(NumberFormat.formatInteger(NaN)).toBe('')
        expect(NumberFormat.formatInteger('100')).toBe('')
    })

    test('round and format', () => {
        expect(NumberFormat.format(1234.567, 2)).toBe('1,234.57')
        expect(NumberFormat.format(-1234.561, 2)).toBe('-1,234.56')
    })

    test('roundDown and roundDownFormat', () => {
        expect(NumberFormat.roundDown(1234.567, 2)).toBe(1234.56)
        expect(NumberFormat.roundDownFormat(1234.567, 2)).toBe('1,234.56')
        expect(NumberFormat.roundDownFormatDecimal(1234.567)).toBe('1,234.56')
    })

    test('formatHalfDown behaves like round half up with formatting', () => {
        expect(NumberFormat.formatHalfDown(1.234, 2)).toBe('1.23')
        expect(NumberFormat.formatHalfDown(1.235, 2)).toBe('1.24')
    })

    test('formatDecimal and formatDecimalHalfDown', () => {
        expect(NumberFormat.formatDecimal(1234.5)).toBe('1,234.50')
        expect(NumberFormat.formatDecimalHalfDown(1234.5)).toBe('1,234.50')
    })

    test('parseToString adds grouping', () => {
        expect(NumberFormat.parseToString(1234)).toBe('1,234')
        expect(NumberFormat.parseToString(1234.56)).toBe('1,234.56')
    })
})

