import Cache from '@/lib/cache'

jest.useFakeTimers()

describe('Cache', () => {
    beforeEach(() => {
        Cache.clear()
        jest.clearAllTimers()
    })

    test('set/get/size', () => {
        expect(Cache.size()).toBe(0)
        Cache.set('a', 1, 1)
        expect(Cache.size()).toBe(1)
        expect(Cache.get('a')).toBe(1)
        expect(Cache.get('unknown', 'x')).toBe('x')
    })

    test('overwrites existing key without growing size', () => {
        Cache.set('k', 1, 1)
        Cache.set('k', 2, 1)
        expect(Cache.size()).toBe(1)
        expect(Cache.get('k')).toBe(2)
    })

    test('expires after time (minutes)', () => {
        Cache.set('t', 'v', 1/60)
        expect(Cache.get('t')).toBe('v')
        jest.advanceTimersByTime(1000)
        expect(Cache.get('t')).toBeNull()
        expect(Cache.size()).toBe(0)
    })

    test('clear removes all keys and timers', () => {
        Cache.set('a', 1, 10)
        Cache.set('b', 2, 10)
        expect(Cache.size()).toBe(2)
        Cache.clear()
        expect(Cache.size()).toBe(0)
        expect(Cache.get('a')).toBeNull()
        expect(Cache.get('b')).toBeNull()
    })
})

