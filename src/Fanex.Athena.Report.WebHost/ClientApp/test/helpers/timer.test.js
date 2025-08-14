import Timer from '@/helpers/timer'

jest.useFakeTimers()

describe('Timer.debounce', () => {
    test('debounces function calls', () => {
        const fn = jest.fn()
        const debounced = Timer.debounce(fn, 200)

        debounced()
        debounced()
        debounced()

        expect(fn).not.toHaveBeenCalled()
        jest.advanceTimersByTime(199)
        expect(fn).not.toHaveBeenCalled()
        jest.advanceTimersByTime(1)
        expect(fn).toHaveBeenCalledTimes(1)
    })
})

