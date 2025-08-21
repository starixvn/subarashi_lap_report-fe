import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import BetListFormFilter from '@/pages/betlist/components/BetListFormFilter'

jest.mock('@/pages/betlist/components/Pages')
jest.mock('@/hooks/useToggleRequest')
jest.mock('@/helpers/langHelper')
jest.mock('@/lib/dataService')
jest.mock('@/pages/betlist/common')

const mockGetBetListPageWithPageName = require('@/pages/betlist/components/Pages')
const mockUseToggleRequest = require('@/hooks/useToggleRequest')
const mockLangHelper = require('@/helpers/langHelper')
const mockDataService = require('@/lib/dataService')
const mockService = require('@/pages/betlist/common')

const MockFormFilter = ({ processExcel, isValidExcel }) => (
	<div data-testid="mock-form-filter">
		<button 
			data-testid="process-excel-btn" 
			onClick={() => processExcel('/test-url', { param: 'test' }, 'test.xlsx')}
		>
			Process Excel
		</button>
		<button 
			data-testid="is-valid-excel-btn" 
			onClick={() => isValidExcel()}
		>
			Check Valid Excel
		</button>
	</div>
)

describe('BetListFormFilter', () => {
	let store
	let mockDispatch
	let mockSendRequest

	const createMockStore = (initialState = {}) => {
		const defaultReducers = {
			formData: (state = null) => state,
			gridData: (state = { totalRows: 0 }) => state,
			...initialState
		}
		return createStore(combineReducers(defaultReducers))
	}

	beforeEach(() => {
		mockDispatch = jest.fn()
		mockSendRequest = jest.fn()
		
		mockUseToggleRequest.default = jest.fn(() => ({
			sendRequest: mockSendRequest
		}))

		mockGetBetListPageWithPageName.getBetListPageWithPageName = jest.fn((pageName) => ({
			FormFilter: MockFormFilter
		}))

		mockLangHelper.default = {
			getSingleResource: jest.fn((key) => `Translated: ${key}`)
		}

		mockDataService.default = {
			getBetListFile: jest.fn()
		}

		mockService.default = {
			downloadExcelFile: jest.fn()
		}

		mockService.constants = {
			MAXIMUM_EXCEL_ROWS: 1000
		}

		global.alert = jest.fn()

		store = createMockStore()
		store.dispatch = mockDispatch
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	const renderWithProviders = (component) => {
		return render(
			<Provider store={store}>
				{component}
			</Provider>
		)
	}

	test('renders FormFilter when formData exists', () => {
		store = createMockStore({
			formData: (state = { pageName: 'testPage' }) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<BetListFormFilter />)
		
		expect(screen.getByTestId('mock-form-filter')).toBeInTheDocument()
		expect(mockGetBetListPageWithPageName.getBetListPageWithPageName).toHaveBeenCalledWith('testPage')
	})

	test('processExcel function works correctly', () => {
		store = createMockStore({
			formData: (state = { pageName: 'testPage' }) => state,
			gridData: (state = { totalRows: 500 }) => state
		})
		store.dispatch = mockDispatch
		
		const mockResponse = { data: 'excel-data' }
		mockSendRequest.mockImplementation((apiCall, callback) => {
			callback(mockResponse)
		})
		
		renderWithProviders(<BetListFormFilter />)
		
		const processExcelBtn = screen.getByTestId('process-excel-btn')
		processExcelBtn.click()
		
		expect(mockSendRequest).toHaveBeenCalledWith(
			expect.any(Function),
			expect.any(Function)
		)
	})

	test('isValidExcel returns true when totalRows is within limit', () => {
		store = createMockStore({
			formData: (state = { pageName: 'testPage' }) => state,
			gridData: (state = { totalRows: 500 }) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<BetListFormFilter />)
		
		const isValidExcelBtn = screen.getByTestId('is-valid-excel-btn')
		isValidExcelBtn.click()
		
		expect(global.alert).not.toHaveBeenCalled()
	})

	test('isValidExcel returns false and shows alert when totalRows exceeds limit', () => {
		store = createMockStore({
			formData: (state = { pageName: 'testPage' }) => state,
			gridData: (state = { totalRows: 1500 }) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<BetListFormFilter />)
		
		const isValidExcelBtn = screen.getByTestId('is-valid-excel-btn')
		isValidExcelBtn.click()
		
		expect(global.alert).toHaveBeenCalledWith('Translated: ExcelExceedRowsMsg')
	})

	test('processExcel calls DataService.getBetListFile with correct parameters', async () => {
		store = createMockStore({
			formData: (state = { pageName: 'testPage' }) => state
		})
		store.dispatch = mockDispatch
		
		const mockResponse = { data: 'excel-data' }
		mockDataService.default.getBetListFile.mockResolvedValue(mockResponse)
		
		let capturedApiCall
		mockSendRequest.mockImplementation((apiCall, callback) => {
			capturedApiCall = apiCall
			callback(mockResponse)
		})
		
		renderWithProviders(<BetListFormFilter />)
		
		const processExcelBtn = screen.getByTestId('process-excel-btn')
		processExcelBtn.click()
		
		await capturedApiCall()
		
		expect(mockDataService.default.getBetListFile).toHaveBeenCalledWith('/test-url', { param: 'test' })
	})

	test('processExcel calls downloadExcelFile on success', () => {
		store = createMockStore({
			formData: (state = { pageName: 'testPage' }) => state
		})
		store.dispatch = mockDispatch
		
		const mockResponse = { data: 'excel-data' }
		mockSendRequest.mockImplementation((apiCall, callback) => {
			callback(mockResponse)
		})
		
		renderWithProviders(<BetListFormFilter />)
		
		const processExcelBtn = screen.getByTestId('process-excel-btn')
		processExcelBtn.click()
		
		expect(mockService.default.downloadExcelFile).toHaveBeenCalledWith(mockResponse, 'test.xlsx')
	})

	test('handles formData selector correctly', () => {
		const formData = { pageName: 'customPage' }
		store = createMockStore({
			formData: (state = formData) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<BetListFormFilter />)
		
		expect(mockGetBetListPageWithPageName.getBetListPageWithPageName).toHaveBeenCalledWith('customPage')
	})

	test('handles gridData selector correctly', () => {
		store = createMockStore({
			formData: (state = { pageName: 'testPage' }) => state,
			gridData: (state = { totalRows: 750 }) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<BetListFormFilter />)
		
		const isValidExcelBtn = screen.getByTestId('is-valid-excel-btn')
		isValidExcelBtn.click()
		
		expect(global.alert).not.toHaveBeenCalled()
	})

	test('passes processExcel and isValidExcel props to FormFilter', () => {
		store = createMockStore({
			formData: (state = { pageName: 'testPage' }) => state
		})
		store.dispatch = mockDispatch
		
		renderWithProviders(<BetListFormFilter />)
		
		expect(screen.getByTestId('process-excel-btn')).toBeInTheDocument()
		expect(screen.getByTestId('is-valid-excel-btn')).toBeInTheDocument()
	})
})
