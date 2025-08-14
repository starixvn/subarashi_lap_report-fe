import * as gtag from '@/hooks/gtagEvents'

describe('hooks/gtagEvents index', () => {
	test('exports usePageViewEvent', () => {
		expect(typeof gtag.usePageViewEvent).toBe('function')
	})
})



