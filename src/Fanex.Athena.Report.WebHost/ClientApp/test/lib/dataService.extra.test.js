import DataService from '@/lib/dataService'

const cancelToken = { source: () => ({ token: {}, cancel: jest.fn() }) }
jest.mock('axios', () => ({ __esModule: true, default: { get: jest.fn(() => Promise.resolve({ data: 1 })), post: jest.fn(() => Promise.resolve({ data: 2 })), CancelToken: { source: () => ({ token: {}, cancel: jest.fn() }) }, isCancel: () => false } }))
jest.mock('@/lib/axios', () => ({ __esModule: true, default: { get: jest.fn(() => Promise.resolve({ data: 1 })), post: jest.fn(() => Promise.resolve({ data: 2 })), CancelToken: { source: () => ({ token: {}, cancel: jest.fn() }) }, isCancel: () => false } }))

describe('DataService integration', () => {
	test('getReportData delegates to axios GET', async () => {
		const res = await DataService.getReportData('url')
		expect(res.data).toBeDefined()
	})

	test('postReportData delegates to axios POST', async () => {
		const res = await DataService.postReportData('url', { a: 1 })
		expect(res.data).toBeDefined()
	})
})


