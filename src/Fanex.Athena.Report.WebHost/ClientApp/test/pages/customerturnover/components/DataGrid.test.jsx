import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import DataGrid from '@/pages/customerturnover/components/DataGrid'

jest.mock('@/hooks/useToggleRequest')
jest.mock('@/lib/dataService')
jest.mock('@/components/ReportTitle')
jest.mock('@/components/NoDataTitle')
jest.mock('@/pages/customerturnover/common')
jest.mock('@/pages/customerturnover/gridBuilder')
jest.mock('@/pages/customerturnover/actions')

// Mock useDispatch to return a shared dispatch function and use real useSelector
const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
	useSelector: jest.requireActual('react-redux').useSelector
}))

const mockUseToggleRequest = require('@/hooks/useToggleRequest')
const mockDataService = require('@/lib/dataService')
const mockCommon = require('@/pages/customerturnover/common')
const mockGridBuilder = require('@/pages/customerturnover/gridBuilder')
const mockActions = require('@/pages/customerturnover/actions')

jest.mock('@/components/ReportTitle', () => ({ content }) => (
	<div data-testid="report-title">{content}</div>
))

jest.mock('@/components/NoDataTitle', () => () => (
	<div data-testid="no-data-title">No Data Available</div>
))

jest.mock('@legion-lib/react-grid', () => ({
	Table: ({ header, body, footer, onPaging, pageOption, ...props }) => (
		<div 
			data-testid="table" 
			data-min-width={props.minWidth}
			data-is-paging={props.isPaging}
		>
			<div data-testid="table-header">{header}</div>
			<div data-testid="table-body">{body}</div>
			<div data-testid="table-footer">{footer}</div>
			<button 
				data-testid="paging-button" 
				onClick={() => onPaging && onPaging(2, 25)}
				data-page-index={pageOption?.PageIndex}
				data-page-size={pageOption?.PageSize}
				data-total-item={pageOption?.TotalItem}
			>
				Next Page
			</button>
		</div>
	)
}))

describe('CustomerTurnover DataGrid', () => {
	let store
	let mockSendRequest

	const createMockStore = (initialState = {}) => {
		const defaultReducers = {
			formData: (state = null) => state,
			requestParam: (state = null) => state,
			gridData: (state = null) => state,
			...initialState
		}
		return createStore(combineReducers(defaultReducers))
	}

	const mockFormData = {
		isAllowedCustomerCommission: true,
		productOptions: [
			{ id: 1, name: 'Sportsbook' },
			{ id: 2, name: 'Casino' }
		]
	}

	const mockRequestParam = {
		FromDate: '2023-12-01',
		ToDate: '2023-12-31',
		CurrencyName: 'USD',
		Odds: 'all',
		UserName: 'testuser',
		ReportBy: 'customer',
		PageIndex: 1,
		PageSize: 50
	}

	const mockGridData = {
		data: [
			{
				customerId: 1,
				customerName: 'Customer A',
				turnover: 10000,
				winLoss: 500
			},
			{
				customerId: 2,
				customerName: 'Customer B',
				turnover: 15000,
				winLoss: -200
			}
		],
		totalData: {
			totalTurnover: 25000,
			totalWinLoss: 300
		},
		totalRow: 150
	}

	beforeEach(() => {
		mockDispatch.mockClear()
		mockSendRequest = jest.fn()

		mockUseToggleRequest.default = jest.fn(() => ({
			sendRequest: mockSendRequest
		}))

		mockDataService.default = {
			postReportData: jest.fn()
		}

		mockCommon.default = {
			generateReportTitle: jest.fn(() => 'Customer Turnover Report (USD)')
		}

		mockCommon.constants = {
			TableSettings: {
				MinWidth: 800
			}
		}

		mockCommon.DefaultPagingOption = {
			PageList: [10, 25, 50, 100]
		}

		mockCommon.ApiUrl = {
			DATA_URL: 'Api/CustomerTurnover/GetData'
		}

		mockGridBuilder.BuildHeaders = jest.fn(() => <div data-testid="mock-headers">Headers</div>)
		mockGridBuilder.BuildBody = jest.fn(() => <div data-testid="mock-body">Body</div>)
		mockGridBuilder.BuildFooter = jest.fn(() => <div data-testid="mock-footer">Footer</div>)

		mockActions.default = {
			setGridData: jest.fn(),
			setRequestParam: jest.fn()
		}

		store = createMockStore({
			formData: (state = mockFormData) => state,
			requestParam: (state = mockRequestParam) => state,
			gridData: (state = mockGridData) => state
		})
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

	test('returns null when gridData is null', () => {
		store = createMockStore({
			formData: (state = mockFormData) => state,
			requestParam: (state = mockRequestParam) => state,
			gridData: (state = null) => state
		})
		store.dispatch = mockDispatch

		const { container } = renderWithProviders(<DataGrid />)
		expect(container.firstChild).toBeNull()
	})

	test('returns null when requestParam is null', () => {
		store = createMockStore({
			formData: (state = mockFormData) => state,
			requestParam: (state = null) => state,
			gridData: (state = mockGridData) => state
		})
		store.dispatch = mockDispatch

		const { container } = renderWithProviders(<DataGrid />)
		expect(container.firstChild).toBeNull()
	})

	test('renders NoDataTitle when gridData has no data', () => {
		store = createMockStore({
			formData: (state = mockFormData) => state,
			requestParam: (state = mockRequestParam) => state,
			gridData: (state = { data: [], totalData: null, totalRow: 0 }) => state
		})
		store.dispatch = mockDispatch

		renderWithProviders(<DataGrid />)

		expect(screen.getByTestId('report-title')).toBeInTheDocument()
		expect(screen.getByTestId('no-data-title')).toBeInTheDocument()
		expect(screen.getByText('Customer Turnover Report (USD)')).toBeInTheDocument()
	})

	test('renders DataGrid with data', () => {
		renderWithProviders(<DataGrid />)

		expect(screen.getByTestId('report-title')).toBeInTheDocument()
		expect(screen.getByTestId('table')).toBeInTheDocument()
		expect(screen.getByTestId('mock-headers')).toBeInTheDocument()
		expect(screen.getByTestId('mock-body')).toBeInTheDocument()
		expect(screen.getByTestId('mock-footer')).toBeInTheDocument()
	})

	test('generates report title with correct parameters', () => {
		renderWithProviders(<DataGrid />)

		expect(mockCommon.default.generateReportTitle).toHaveBeenCalledWith(
			'2023-12-01',
			'2023-12-31',
			'USD',
			'all',
			'testuser'
		)
	})

	test('configures table with correct properties', () => {
		renderWithProviders(<DataGrid />)

		const table = screen.getByTestId('table')
		expect(table).toHaveAttribute('data-min-width', '800')
		expect(table).toHaveAttribute('data-is-paging', 'true')

		const pagingButton = screen.getByTestId('paging-button')
		expect(pagingButton).toHaveAttribute('data-page-index', '1')
		expect(pagingButton).toHaveAttribute('data-page-size', '50')
		expect(pagingButton).toHaveAttribute('data-total-item', '150')
	})

	test('calls BuildHeaders with correct options', () => {
		renderWithProviders(<DataGrid />)

		expect(mockGridBuilder.BuildHeaders).toHaveBeenCalledWith({
			isAllowedCustomerCommission: true,
			reportBy: 'customer'
		})
	})

	test('calls BuildBody with correct parameters', () => {
		renderWithProviders(<DataGrid />)

		expect(mockGridBuilder.BuildBody).toHaveBeenCalledWith(
			mockGridData.data,
			{
				isAllowedCustomerCommission: true,
				reportBy: 'customer'
			}
		)
	})

	test('calls BuildFooter with correct parameters', () => {
		renderWithProviders(<DataGrid />)

		expect(mockGridBuilder.BuildFooter).toHaveBeenCalledWith(
			mockGridData.totalData,
			{
				isAllowedCustomerCommission: true,
				reportBy: 'customer'
			}
		)
	})

	test('handles paging correctly', () => {
		renderWithProviders(<DataGrid />)

		const pagingButton = screen.getByTestId('paging-button')
		fireEvent.click(pagingButton)

		expect(mockSendRequest).toHaveBeenCalledWith(
			expect.any(Function),
			expect.any(Function)
		)

		expect(mockDispatch).toHaveBeenCalledWith(
			mockActions.default.setRequestParam({
				...mockRequestParam,
				PageSize: 25,
				PageIndex: 2
			})
		)
	})

	test('handles successful paging API response', () => {
		renderWithProviders(<DataGrid />)

		const pagingButton = screen.getByTestId('paging-button')
		fireEvent.click(pagingButton)

		const responseHandler = mockSendRequest.mock.calls[0][1]
		const mockResponse = {
			data: {
				data: [{ id: 1, name: 'new data' }],
				totalData: { total: 1000 },
				totalRow: 200
			}
		}

		responseHandler(mockResponse)

		expect(mockDispatch).toHaveBeenCalledWith(
			mockActions.default.setGridData(mockResponse.data)
		)
	})

	test('handles null paging API response', () => {
		renderWithProviders(<DataGrid />)

		const pagingButton = screen.getByTestId('paging-button')
		fireEvent.click(pagingButton)

		const responseHandler = mockSendRequest.mock.calls[0][1]
		responseHandler(null)

		expect(mockDispatch).toHaveBeenCalledWith(
			mockActions.default.setGridData(null)
		)
	})

	test('handles paging API response without data', () => {
		renderWithProviders(<DataGrid />)

		const pagingButton = screen.getByTestId('paging-button')
		fireEvent.click(pagingButton)

		const responseHandler = mockSendRequest.mock.calls[0][1]
		const mockResponse = { someOtherProperty: 'value' }

		responseHandler(mockResponse)

		expect(mockDispatch).toHaveBeenCalledWith(
			mockActions.default.setGridData(null)
		)
	})

	test('creates correct paging option', () => {
		renderWithProviders(<DataGrid />)

		const pagingButton = screen.getByTestId('paging-button')
		expect(pagingButton).toHaveAttribute('data-page-index', '1')
		expect(pagingButton).toHaveAttribute('data-page-size', '50')
		expect(pagingButton).toHaveAttribute('data-total-item', '150')
	})

	test('calls API with correct parameters during paging', async () => {
		const mockApiResponse = { data: { data: [], totalData: null, totalRow: 0 } }
		mockDataService.default.postReportData.mockResolvedValue(mockApiResponse)

		renderWithProviders(<DataGrid />)

		const pagingButton = screen.getByTestId('paging-button')
		fireEvent.click(pagingButton)

		const apiCall = mockSendRequest.mock.calls[0][0]
		await apiCall()

		expect(mockDataService.default.postReportData).toHaveBeenCalledWith(
			'Api/CustomerTurnover/GetData',
			{
				...mockRequestParam,
				PageSize: 25,
				PageIndex: 2
			}
		)
	})

	test('handles missing gridData.data gracefully', () => {
		store = createMockStore({
			formData: (state = mockFormData) => state,
			requestParam: (state = mockRequestParam) => state,
			gridData: (state = { totalData: null, totalRow: 0 }) => state
		})
		store.dispatch = mockDispatch

		renderWithProviders(<DataGrid />)

		expect(screen.getByTestId('report-title')).toBeInTheDocument()
		expect(screen.getByTestId('no-data-title')).toBeInTheDocument()
	})

	test('handles undefined gridData.data.length', () => {
		store = createMockStore({
			formData: (state = mockFormData) => state,
			requestParam: (state = mockRequestParam) => state,
			gridData: (state = { data: null, totalData: null, totalRow: 0 }) => state
		})
		store.dispatch = mockDispatch

		renderWithProviders(<DataGrid />)

		expect(screen.getByTestId('report-title')).toBeInTheDocument()
		expect(screen.getByTestId('no-data-title')).toBeInTheDocument()
	})

	test('handles different report by option', () => {
		const differentRequestParam = {
			...mockRequestParam,
			ReportBy: 'date'
		}

		store = createMockStore({
			formData: (state = { ...mockFormData, isAllowedCustomerCommission: false }) => state,
			requestParam: (state = differentRequestParam) => state,
			gridData: (state = mockGridData) => state
		})
		store.dispatch = mockDispatch

		renderWithProviders(<DataGrid />)

		expect(mockGridBuilder.BuildHeaders).toHaveBeenCalledWith({
			isAllowedCustomerCommission: false,
			reportBy: 'date'
		})
	})
})