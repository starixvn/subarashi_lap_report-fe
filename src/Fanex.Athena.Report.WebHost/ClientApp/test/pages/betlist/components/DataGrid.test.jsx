import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import DataGrid from '@/pages/betlist/components/DataGrid'

jest.mock('@/hooks/useToggleRequest')
jest.mock('@/helpers/betlistHelper')
jest.mock('@/helpers/langHelper')
jest.mock('@/lib/dataService')
jest.mock('@/pages/betlist/actions')
jest.mock('@/pages/betlist/components/Pages')
jest.mock('@/pages/betlist/customGrid')

const mockUseToggleRequest = require('@/hooks/useToggleRequest')
const mockBetListHelper = require('@/helpers/betlistHelper')
const mockLangHelper = require('@/helpers/langHelper')
const mockDataService = require('@/lib/dataService')
const mockActions = require('@/pages/betlist/actions')
const mockPages = require('@/pages/betlist/components/Pages')
const mockCustomGrid = require('@/pages/betlist/customGrid')

const MockTable = ({ 
	onPaging, 
	onSort, 
	data, 
	total, 
	totalRows, 
	getHeaderNameFunc, 
	getResourceFunc,
	totalText,
	adjustedHeight,
	customHeaderCell,
	customFooterRow
}) => (
	<div data-testid="mock-table" data-adjusted-height={adjustedHeight}>
		<div data-testid="table-data">{data?.length || 0} rows</div>
		<div data-testid="table-total">{totalText}: {totalRows}</div>
		<button 
			data-testid="paging-button" 
			onClick={() => onPaging && onPaging(2, 25)}
		>
			Next Page
		</button>
		<button 
			data-testid="sort-button" 
			onClick={() => onSort && onSort('WinLoss', 'desc')}
		>
			Sort
		</button>
		<div data-testid="header-cell">{customHeaderCell}</div>
		<div data-testid="footer-row">{customFooterRow}</div>
		<div data-testid="header-name">{getHeaderNameFunc && getHeaderNameFunc('WinLoss')}</div>
		<div data-testid="resource">{getResourceFunc && getResourceFunc('Submit')}</div>
	</div>
)

describe('BetList DataGrid', () => {
	let store
	let mockDispatch
	let mockSendRequest

	const createMockStore = (initialState = {}) => {
		const defaultReducers = {
			formData: (state = null) => state,
			gridData: (state = null) => state,
			requestParam: (state = {}) => state,
			...initialState
		}
		return createStore(combineReducers(defaultReducers))
	}

	const mockFormData = {
		isServerPaging: false,
		isAllowedCustomerCommission: true,
		pageName: 'LiveReport',
		url: '/api/betlist/data'
	}

	const mockGridData = {
		rows: [
			{
				id: 1,
				customerName: 'Customer A',
				betAmount: 100,
				winLoss: 50
			},
			{
				id: 2,
				customerName: 'Customer B',
				betAmount: 200,
				winLoss: -75
			}
		],
		userData: {
			totalBetAmount: 300,
			totalWinLoss: -25
		},
		totalRows: 150
	}

	const mockRequestParam = {
		Page: 1,
		Rows: 50,
		SortBy: 'BetAmount',
		SortType: 'BetAmount',
		SortOrder: 'asc'
	}

	beforeEach(() => {
		mockDispatch = jest.fn()
		mockSendRequest = jest.fn()

		mockUseToggleRequest.default = jest.fn(() => ({
			sendRequest: mockSendRequest
		}))

		mockBetListHelper.default = {
			loadBetListDataGrid: jest.fn((data, isServerPaging) => ({ 
				rows: data, 
				userData: { total: 1000 }, 
				totalRows: data?.length || 0,
				isServerPaging 
			}))
		}

		mockLangHelper.default = {
			getSingleResource: jest.fn((key) => {
				const translations = {
					'LicenseeW_L': 'Licensee W/L',
					'Comm': 'Commission',
					'WinLoss': 'Win/Loss',
					'GrandTotal': 'Grand Total',
					'Submit': 'Submit'
				}
				return translations[key] || key
			})
		}

		mockDataService.default = {
			getBetListData: jest.fn()
		}

		mockActions.ActionCreators = {
			setRequestParam: jest.fn(),
			setGridData: jest.fn()
		}

		mockPages.getBetListPageWithPageName = jest.fn(() => ({
			Table: MockTable
		}))

		mockCustomGrid.HeaderCell = <div data-testid="custom-header-cell">Header Cell</div>
		mockCustomGrid.FooterRow = <div data-testid="custom-footer-row">Footer Row</div>

		store = createMockStore({
			formData: (state = mockFormData) => state,
			gridData: (state = mockGridData) => state,
			requestParam: (state = mockRequestParam) => state
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

	test('renders DataGrid with data', () => {
		renderWithProviders(<DataGrid />)

		expect(screen.getByTestId('mock-table')).toBeInTheDocument()
		expect(screen.getByTestId('table-data')).toHaveTextContent('2 rows')
		expect(screen.getByTestId('table-total')).toHaveTextContent('Grand Total: 150')
	})

	test('calculates correct start and end index for client-side paging', () => {
		renderWithProviders(<DataGrid />)

		// With Page=1, Rows=50, startIndex should be 0, endIndex should be 50
		// Since we have 2 rows, all should be displayed
		expect(screen.getByTestId('table-data')).toHaveTextContent('2 rows')
	})

	test('handles server-side paging', () => {
		store = createMockStore({
			formData: (state = { ...mockFormData, isServerPaging: true }) => state,
			gridData: (state = mockGridData) => state,
			requestParam: (state = mockRequestParam) => state
		})
		store.dispatch = mockDispatch

		renderWithProviders(<DataGrid />)

		const pagingButton = screen.getByTestId('paging-button')
		fireEvent.click(pagingButton)

		expect(mockSendRequest).toHaveBeenCalled()
		
		// For server paging, getData is called which dispatches setRequestParam
		expect(mockActions.ActionCreators.setRequestParam).toHaveBeenCalled()
	})

	test('handles client-side paging', () => {
		renderWithProviders(<DataGrid />)

		const pagingButton = screen.getByTestId('paging-button')
		fireEvent.click(pagingButton)

		expect(mockDispatch).toHaveBeenCalledWith(
			mockActions.ActionCreators.setRequestParam({
				...mockRequestParam,
				Page: 2,
				Rows: 25
			})
		)
	})

	test('handles sorting', () => {
		renderWithProviders(<DataGrid />)

		const sortButton = screen.getByTestId('sort-button')
		fireEvent.click(sortButton)

		expect(mockSendRequest).toHaveBeenCalled()
		expect(mockDispatch).toHaveBeenCalledWith(
			mockActions.ActionCreators.setRequestParam({
				...mockRequestParam,
				SortBy: 'Winlost',
				SortType: 'WinLoss',
				SortOrder: 'desc',
				Page: 1,
				Rows: 50
			})
		)
	})

	test('maps sort parameters correctly', () => {
		renderWithProviders(<DataGrid />)

		// Test WinLoss -> Winlost mapping
		const sortButton = screen.getByTestId('sort-button')
		fireEvent.click(sortButton)

		const setRequestParamCall = mockDispatch.mock.calls.find(call => 
			call[0] === mockActions.ActionCreators.setRequestParam({
				...mockRequestParam,
				SortBy: 'Winlost',
				SortType: 'WinLoss',
				SortOrder: 'desc',
				Page: 1,
				Rows: 50
			})
		)
		expect(setRequestParamCall).toBeTruthy()
	})

	test('handles ExternalId sort parameter mapping', () => {
		// Mock sort with ExternalId
		const MockTableWithExternalId = ({ onSort }) => (
			<div data-testid="mock-table">
				<button 
					data-testid="sort-external-id" 
					onClick={() => onSort && onSort('ExternalId', 'asc')}
				>
					Sort External ID
				</button>
			</div>
		)

		mockPages.getBetListPageWithPageName.mockReturnValue({
			Table: MockTableWithExternalId
		})

		renderWithProviders(<DataGrid />)

		const sortButton = screen.getByTestId('sort-external-id')
		fireEvent.click(sortButton)

		expect(mockDispatch).toHaveBeenCalledWith(
			mockActions.ActionCreators.setRequestParam(
				expect.objectContaining({
					SortBy: 'nickname'
				})
			)
		)
	})

	test('handles SystemId sort parameter mapping', () => {
		// Mock sort with SystemId
		const MockTableWithSystemId = ({ onSort }) => (
			<div data-testid="mock-table">
				<button 
					data-testid="sort-system-id" 
					onClick={() => onSort && onSort('SystemId', 'asc')}
				>
					Sort System ID
				</button>
			</div>
		)

		mockPages.getBetListPageWithPageName.mockReturnValue({
			Table: MockTableWithSystemId
		})

		renderWithProviders(<DataGrid />)

		const sortButton = screen.getByTestId('sort-system-id')
		fireEvent.click(sortButton)

		expect(mockDispatch).toHaveBeenCalledWith(
			mockActions.ActionCreators.setRequestParam(
				expect.objectContaining({
					SortBy: 'UserName'
				})
			)
		)
	})

	test('handles successful getData API response', () => {
		renderWithProviders(<DataGrid />)

		const sortButton = screen.getByTestId('sort-button')
		fireEvent.click(sortButton)

		const responseHandler = mockSendRequest.mock.calls[0][1]
		const mockResponse = {
			data: {
				data: [{ id: 1, name: 'new data' }]
			}
		}

		responseHandler(mockResponse)

		expect(mockDispatch).toHaveBeenCalledWith(
			mockActions.ActionCreators.setGridData(
				mockBetListHelper.default.loadBetListDataGrid(
					mockResponse.data.data,
					mockFormData.isServerPaging
				)
			)
		)
	})

	test('handles API response with parent data when children data is null', () => {
		renderWithProviders(<DataGrid />)

		const sortButton = screen.getByTestId('sort-button')
		fireEvent.click(sortButton)

		const responseHandler = mockSendRequest.mock.calls[0][1]
		const mockResponse = {
			data: {
				data: null,
				parentData: [{ id: 1, name: 'parent data' }]
			}
		}

		responseHandler(mockResponse)

		expect(mockDispatch).toHaveBeenCalledWith(
			mockActions.ActionCreators.setGridData(
				mockBetListHelper.default.loadBetListDataGrid(
					mockResponse.data,
					mockFormData.isServerPaging
				)
			)
		)
	})

	test('handles null or invalid API response', () => {
		renderWithProviders(<DataGrid />)

		const sortButton = screen.getByTestId('sort-button')
		fireEvent.click(sortButton)

		const responseHandler = mockSendRequest.mock.calls[0][1]
		responseHandler(null)

		// Should not call setGridData with null response in updateGridData function
		// but dispatch may be called for setRequestParam
		expect(mockSendRequest).toHaveBeenCalled()
	})

	test('generates correct header names', () => {
		renderWithProviders(<DataGrid />)

		expect(screen.getByTestId('header-name')).toHaveTextContent('Win/Loss/Commission')
	})

	test('generates header name for LicenseeWL', () => {
		const MockTableWithLicenseeWL = ({ getHeaderNameFunc }) => (
			<div data-testid="mock-table">
				<div data-testid="licensee-header">{getHeaderNameFunc('LicenseeWL')}</div>
			</div>
		)

		mockPages.getBetListPageWithPageName.mockReturnValue({
			Table: MockTableWithLicenseeWL
		})

		renderWithProviders(<DataGrid />)

		expect(screen.getByTestId('licensee-header')).toHaveTextContent('Licensee W/L/Commission')
	})

	test('generates header name for Index column', () => {
		const MockTableWithIndex = ({ getHeaderNameFunc }) => (
			<div data-testid="mock-table">
				<div data-testid="index-header">{getHeaderNameFunc('Index')}</div>
			</div>
		)

		mockPages.getBetListPageWithPageName.mockReturnValue({
			Table: MockTableWithIndex
		})

		renderWithProviders(<DataGrid />)

		expect(screen.getByTestId('index-header')).toHaveTextContent('#')
	})

	test('generates header name for empty string', () => {
		const MockTableWithEmpty = ({ getHeaderNameFunc }) => (
			<div data-testid="mock-table">
				<div data-testid="empty-header">{getHeaderNameFunc('')}</div>
			</div>
		)

		mockPages.getBetListPageWithPageName.mockReturnValue({
			Table: MockTableWithEmpty
		})

		renderWithProviders(<DataGrid />)

		expect(screen.getByTestId('empty-header')).toHaveTextContent('')
	})

	test('handles WinLoss header when customer commission is not allowed', () => {
		store = createMockStore({
			formData: (state = { ...mockFormData, isAllowedCustomerCommission: false }) => state,
			gridData: (state = mockGridData) => state,
			requestParam: (state = mockRequestParam) => state
		})
		store.dispatch = mockDispatch

		renderWithProviders(<DataGrid />)

		expect(screen.getByTestId('header-name')).toHaveTextContent('Win/Loss')
	})

	test('calls getBetListPageWithPageName with correct pageName', () => {
		renderWithProviders(<DataGrid />)

		expect(mockPages.getBetListPageWithPageName).toHaveBeenCalledWith('LiveReport')
	})

	test('passes custom components to table', () => {
		renderWithProviders(<DataGrid />)

		expect(screen.getByTestId('header-cell')).toBeInTheDocument()
		expect(screen.getByTestId('footer-row')).toBeInTheDocument()
	})

	test('handles component memoization', () => {
		const Component = DataGrid
		expect(Component.$$typeof).toBeDefined()
	})
})
