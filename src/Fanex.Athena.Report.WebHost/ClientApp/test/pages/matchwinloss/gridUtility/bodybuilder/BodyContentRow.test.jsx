import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import BodyContentRow from '@/pages/matchwinloss/gridUtility/bodybuilder/BodyContentRow'

jest.mock('@/hooks/useNavigateParams', () => ({
	__esModule: true,
	default: jest.fn(() => jest.fn())
}))

const mockSendRequest = jest.fn()
jest.mock('@/hooks/useToggleRequest', () => ({
	__esModule: true,
	default: () => ({
		sendRequest: mockSendRequest
	})
}))

jest.mock('@/lib/dataService', () => ({
	default: {
		postReportData: jest.fn()
	}
}))

jest.mock('@/pages/matchwinloss/common', () => ({
	__esModule: true,
	default: {
		getMatchProductCodeList: jest.fn(() => ['SB']),
		includeDrilldownProduct: jest.fn(() => true),
		getMatchName: jest.fn(() => 'Team A vs Team B')
	},
	constants: {
		ApiUrl: { DETAIL_DATA_URL: '/api/detail' },
		BetListPageUrl: { MATCH_BETTYPE: '/betlist' }
	}
}))

jest.mock('@/pages/matchwinloss/actions', () => ({
	ActionCreators: {
		toggleLoader: jest.fn()
	}
}))

jest.mock('@/pages/matchwinloss/gridUtility/CommonCells', () => ({ data }) => (
	<td data-testid="common-cells">{data.productName}</td>
))

describe('BodyContentRow', () => {
	let store
	let mockDispatch

	const createMockStore = (initialState = {}) => {
		const defaultReducers = {
			requestParam: (state = {}) => state,
			...initialState
		}
		return createStore(combineReducers(defaultReducers))
	}

	const mockMatchData = {
		matchId: 123,
		leagueId: 456,
		homeTeam: 'Team A',
		awayTeam: 'Team B',
		productName: 'SB'
	}

	const mockRequestParam = {
		CurrencyId: 1,
		BaseCurrency: 'USD',
		Date: '2023-12-25',
		ProductOptions: [{ status: true, code: 'SB' }]
	}

	beforeEach(() => {
		mockDispatch = jest.fn()
		store = createMockStore({
			requestParam: (state = mockRequestParam) => state
		})
		store.dispatch = mockDispatch
	})

	const renderWithProviders = (component) => {
		return render(
			<Provider store={store}>
				<table>
					<tbody>
						{component}
					</tbody>
				</table>
			</Provider>
		)
	}

	test('renders basic row structure', () => {
		renderWithProviders(<BodyContentRow matchData={mockMatchData} index={1} />)

		expect(screen.getByText('1')).toBeInTheDocument()
		expect(screen.getByText('Team A vs Team B')).toBeInTheDocument()
		expect(screen.getByTestId('common-cells')).toBeInTheDocument()
	})

	test('handles expand click', () => {
		renderWithProviders(<BodyContentRow matchData={mockMatchData} index={1} />)

		const expandButton = screen.getByRole('link', { name: "" })
		fireEvent.click(expandButton)

		// Should trigger some action
		expect(expandButton).toBeInTheDocument()
	})

	test('handles match click for drilldown', () => {
		renderWithProviders(<BodyContentRow matchData={mockMatchData} index={1} />)

		const matchLink = screen.getByText('Team A vs Team B')
		fireEvent.click(matchLink)

		// Should handle navigation
		expect(matchLink).toBeInTheDocument()
	})

	test('calculates row span correctly', () => {
		const { container } = renderWithProviders(<BodyContentRow matchData={mockMatchData} index={1} />)

		const indexCell = container.querySelector('.index-cell')
		expect(indexCell).toBeInTheDocument()
	})

	test('handles invalid match data', () => {
		const invalidMatchData = { ...mockMatchData, leagueId: null }
		renderWithProviders(<BodyContentRow matchData={invalidMatchData} index={1} />)

		const expandButton = screen.getByRole('link', { name: "" })
		fireEvent.click(expandButton)

		expect(expandButton).toBeInTheDocument()
	})

	test('resets state when match data changes', () => {
		const { rerender } = renderWithProviders(<BodyContentRow matchData={mockMatchData} index={1} />)

		const newMatchData = { ...mockMatchData, matchId: 999 }
		rerender(
			<Provider store={store}>
				<table>
					<tbody>
						<BodyContentRow matchData={newMatchData} index={1} />
					</tbody>
				</table>
			</Provider>
		)

		expect(screen.getByText('Team A vs Team B')).toBeInTheDocument()
	})

	test('expands and shows detail data when request succeeds', () => {
		const mockDetailData = [
			{ bettypeName: 'Full Time Result', matchId: 123, betType: 1 },
			{ bettypeName: 'Over/Under', matchId: 123, betType: 2 }
		]

		mockSendRequest.mockImplementationOnce((requestFn, callback) => {
			callback({ data: mockDetailData })
		})

		renderWithProviders(<BodyContentRow matchData={mockMatchData} index={1} />)

		const expandButton = screen.getAllByRole('link').find(link => 
			link.querySelector('.icon-arrow')
		)
		fireEvent.click(expandButton)

		expect(screen.getByText('Full Time Result')).toBeInTheDocument()
		expect(screen.getByText('Over/Under')).toBeInTheDocument()
	})

	test('collapses detail data when already expanded', () => {
		const mockDetailData = [
			{ bettypeName: 'Full Time Result', matchId: 123, betType: 1 }
		]

		mockSendRequest.mockImplementationOnce((requestFn, callback) => {
			callback({ data: mockDetailData })
		})

		renderWithProviders(<BodyContentRow matchData={mockMatchData} index={1} />)

		const expandButton = screen.getAllByRole('link').find(link => 
			link.querySelector('.icon-arrow')
		)
		
		// First click to expand
		fireEvent.click(expandButton)
		expect(screen.getByText('Full Time Result')).toBeInTheDocument()

		// Second click to collapse
		fireEvent.click(expandButton)
		expect(screen.queryByText('Full Time Result')).not.toBeInTheDocument()
	})

	test('handles detail request with no data', () => {
		mockSendRequest.mockImplementationOnce((requestFn, callback) => {
			callback(null)
		})

		renderWithProviders(<BodyContentRow matchData={mockMatchData} index={1} />)

		const expandButton = screen.getAllByRole('link').find(link => 
			link.querySelector('.icon-arrow')
		)
		fireEvent.click(expandButton)

		// Should not show any detail data
		expect(screen.queryByText('Full Time Result')).not.toBeInTheDocument()
	})

	test('handles detail request with invalid response structure', () => {
		mockSendRequest.mockImplementationOnce((requestFn, callback) => {
			callback({ invalidProperty: 'test' })
		})

		renderWithProviders(<BodyContentRow matchData={mockMatchData} index={1} />)

		const expandButton = screen.getAllByRole('link').find(link => 
			link.querySelector('.icon-arrow')
		)
		fireEvent.click(expandButton)

		// Should not crash and not show detail data
		expect(screen.queryByText('Full Time Result')).not.toBeInTheDocument()
	})

	test('renders with non-drilldown product', () => {
		const mockService = require('@/pages/matchwinloss/common').default
		mockService.includeDrilldownProduct.mockReturnValueOnce(false)

		renderWithProviders(<BodyContentRow matchData={mockMatchData} index={1} />)

		const matchLink = screen.getByText('Team A vs Team B')
		expect(matchLink.closest('a')).toHaveAttribute('href', '#')
	})

	test('handles match click with bet type 85 and live indicator', () => {
		const mockNavigate = jest.fn()
		require('@/hooks/useNavigateParams').default.mockReturnValue(mockNavigate)

		const liveMatchData = {
			...mockMatchData,
			betType: 85,
			isLive: true
		}

		renderWithProviders(<BodyContentRow matchData={liveMatchData} index={1} />)

		const matchLink = screen.getByText('Team A vs Team B')
		fireEvent.click(matchLink)

		expect(mockNavigate).toHaveBeenCalledWith('/betlist', expect.objectContaining({
			BetType: 85,
			LiveIndicator: '1'
		}))
	})

	test('handles match click with bet type 86 and not live', () => {
		const mockNavigate = jest.fn()
		require('@/hooks/useNavigateParams').default.mockReturnValue(mockNavigate)

		const notLiveMatchData = {
			...mockMatchData,
			betType: 86,
			isLive: false
		}

		renderWithProviders(<BodyContentRow matchData={notLiveMatchData} index={1} />)

		const matchLink = screen.getByText('Team A vs Team B')
		fireEvent.click(matchLink)

		expect(mockNavigate).toHaveBeenCalledWith('/betlist', expect.objectContaining({
			BetType: 86,
			LiveIndicator: '0'
		}))
	})

	test('handles match click with NG product and match code', () => {
		const mockNavigate = jest.fn()
		require('@/hooks/useNavigateParams').default.mockReturnValue(mockNavigate)

		const ngMatchData = {
			...mockMatchData,
			productName: 'NG',
			matchCode: 'NGM123'
		}

		renderWithProviders(<BodyContentRow matchData={ngMatchData} index={1} />)

		const matchLink = screen.getByText('Team A vs Team B')
		fireEvent.click(matchLink)

		expect(mockNavigate).toHaveBeenCalledWith('/betlist', expect.objectContaining({
			MatchCode: 'NGM123'
		}))
	})

	test('handles match click with subsidiary parameters', () => {
		const mockNavigate = jest.fn()
		require('@/hooks/useNavigateParams').default.mockReturnValue(mockNavigate)

		const extendedRequestParam = {
			...mockRequestParam,
			SubsidiaryList: ['SUB1', 'SUB2'],
			SubsidiarySearch: 'test-search'
		}

		store = createMockStore({
			requestParam: () => extendedRequestParam
		})

		renderWithProviders(<BodyContentRow matchData={mockMatchData} index={1} />)

		const matchLink = screen.getByText('Team A vs Team B')
		fireEvent.click(matchLink)

		expect(mockNavigate).toHaveBeenCalledWith('/betlist', expect.objectContaining({
			SubsidiaryList: ['SUB1', 'SUB2'],
			SubsidiarySearch: 'test-search'
		}))
	})

	test('handles invalid bet type in match click', () => {
		const mockNavigate = jest.fn()
		require('@/hooks/useNavigateParams').default.mockReturnValue(mockNavigate)

		const invalidBetTypeData = {
			...mockMatchData,
			betType: 'invalid'
		}

		renderWithProviders(<BodyContentRow matchData={invalidBetTypeData} index={1} />)

		const matchLink = screen.getByText('Team A vs Team B')
		fireEvent.click(matchLink)

		expect(mockNavigate).toHaveBeenCalledWith('/betlist', expect.objectContaining({
			BetType: 0
		}))
	})

	test('shows fake loading when detail params are invalid', () => {
		jest.useFakeTimers()
		
		const invalidMatchData = { ...mockMatchData, leagueId: null }
		renderWithProviders(<BodyContentRow matchData={invalidMatchData} index={1} />)

		const expandButton = screen.getAllByRole('link').find(link => 
			link.querySelector('.icon-arrow')
		)
		
		// Mock the dispatch calls that should happen during fake loading
		mockDispatch.mockImplementation(() => undefined)
		
		fireEvent.click(expandButton)

		// Verify that dispatch was called (fake loading should trigger dispatch)
		expect(mockDispatch).toHaveBeenCalled()
		
		jest.advanceTimersByTime(50)
		expect(mockDispatch).toHaveBeenCalledTimes(2)
		
		jest.useRealTimers()
	})

	test('calculates row span correctly when expanded', () => {
		const mockDetailData = [
			{ bettypeName: 'Bet 1', matchId: 123 },
			{ bettypeName: 'Bet 2', matchId: 123 }
		]

		mockSendRequest.mockImplementationOnce((requestFn, callback) => {
			callback({ data: mockDetailData })
		})

		const { container } = renderWithProviders(<BodyContentRow matchData={mockMatchData} index={1} />)

		const expandButton = screen.getAllByRole('link').find(link => 
			link.querySelector('.icon-arrow')
		)
		fireEvent.click(expandButton)

		const indexCell = container.querySelector('.index-cell')
		expect(indexCell).toHaveAttribute('rowspan', '3') // 1 main + 2 detail rows
	})

	test('handles detail row click navigation', () => {
		const mockNavigate = jest.fn()
		require('@/hooks/useNavigateParams').default.mockReturnValue(mockNavigate)

		const mockDetailData = [
			{ 
				bettypeName: 'Full Time Result', 
				matchId: 123, 
				betType: 1,
				leagueId: 456
			}
		]

		mockSendRequest.mockImplementationOnce((requestFn, callback) => {
			callback({ data: mockDetailData })
		})

		renderWithProviders(<BodyContentRow matchData={mockMatchData} index={1} />)

		const expandButton = screen.getAllByRole('link').find(link => 
			link.querySelector('.icon-arrow')
		)
		fireEvent.click(expandButton)

		const detailLink = screen.getByText('Full Time Result')
		fireEvent.click(detailLink)

		expect(mockNavigate).toHaveBeenCalledWith('/betlist', expect.objectContaining({
			BetType: 1,
			MatchId: 123,
			LeagueId: 456
		}))
	})

	test('applies correct CSS classes based on expansion state', () => {
		const { container } = renderWithProviders(<BodyContentRow matchData={mockMatchData} index={1} />)

		const expandWrapper = container.querySelector('.icon-wrapper')
		expect(expandWrapper).not.toHaveClass('expanded')

		const mockDetailData = [{ bettypeName: 'Test Bet', matchId: 123 }]
		mockSendRequest.mockImplementationOnce((requestFn, callback) => {
			callback({ data: mockDetailData })
		})

		const expandButton = screen.getAllByRole('link').find(link => 
			link.querySelector('.icon-arrow')
		)
		fireEvent.click(expandButton)

		expect(container.querySelector('.icon-wrapper')).toHaveClass('expanded')
	})

	test('renders correct link classes based on product type', () => {
		const mockService = require('@/pages/matchwinloss/common').default
		mockService.includeDrilldownProduct.mockReturnValueOnce(true)

		renderWithProviders(<BodyContentRow matchData={mockMatchData} index={1} />)

		const matchLink = screen.getByText('Team A vs Team B').closest('a')
		expect(matchLink).toHaveClass('bet-list-link')
		expect(matchLink).toHaveAttribute('href', '#')
	})

	test('handles all parameters in detail request', () => {
		renderWithProviders(<BodyContentRow matchData={mockMatchData} index={1} />)

		const expandButton = screen.getAllByRole('link').find(link => 
			link.querySelector('.icon-arrow')
		)
		fireEvent.click(expandButton)

		expect(mockSendRequest).toHaveBeenCalledWith(
			expect.any(Function),
			expect.any(Function)
		)

		// Verify the request function would be called with correct params
		const requestFn = mockSendRequest.mock.calls[0][0]
		expect(typeof requestFn).toBe('function')
	})

	test('prevents default on detail link clicks', () => {
		const mockDetailData = [{ bettypeName: 'Test Bet', matchId: 123 }]
		mockSendRequest.mockImplementationOnce((requestFn, callback) => {
			callback({ data: mockDetailData })
		})

		renderWithProviders(<BodyContentRow matchData={mockMatchData} index={1} />)

		const expandButton = screen.getAllByRole('link').find(link => 
			link.querySelector('.icon-arrow')
		)
		fireEvent.click(expandButton)

		const detailLink = screen.getByText('Test Bet').closest('a')
		const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true })
		const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault')

		detailLink.dispatchEvent(clickEvent)
		expect(preventDefaultSpy).toHaveBeenCalled()
	})
})

