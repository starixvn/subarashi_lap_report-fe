import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { GroupCell } from '@/pages/leaguewinloss/components/grid/GroupCell'
import { ReportLevel } from '@/pages/leaguewinloss/common/constants'

jest.mock('@legion-lib/react-grid', () => ({
    Cell: ({ children, colSpan, className, style }) => (
        <div data-testid="cell" data-col-span={colSpan} className={className} style={style}>
            {children}
        </div>
    ),
}))

jest.mock('@/lib/dataService', () => ({
    __esModule: true,
    default: {
        apiKeys: { report: 'Report', betlist: 'BetList' },
        buildProxyUrl: (apiKey, apiUrl) => `Proxy/${apiKey}/${apiUrl.replace(/\//g, '_')}`,
        postReportData: jest.fn(() => Promise.resolve({ status: 200, data: { data: [] } })),
    },
}))

describe('GroupCell', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('renders link for non-BETTYPE level', () => {
        const props = {
            rowData: { leagueId: 1, leagueName: 'League', isBreakdown: false },
            level: ReportLevel.MAIN,
            reportData: { data: [{ detail: [{ leagueId: 1 }] }] },
            requestParam: {},
            setReportData: jest.fn(),
            toggleLoader: jest.fn(),
            setReloadReport: jest.fn(),
            setRequestParam: jest.fn(),
            getReportData: jest.fn(),
            setBreadcrumbParams: jest.fn(),
            breadcrumbParams: [],
        }
        render(<GroupCell {...props} />)
        const link = screen.getByText('League')
        expect(link.tagName.toLowerCase()).toBe('a')
    })

    test('handles breakdown toggle click for MATCH level', async () => {
        const props = {
            rowData: { matchId: 5, matchName: 'Match A', isBreakdown: false },
            level: ReportLevel.MATCH,
            reportData: { data: [{ detail: [{ matchId: 5 }] }] },
            requestParam: {},
            setReportData: jest.fn(),
            toggleLoader: jest.fn(),
            setReloadReport: jest.fn(),
            setRequestParam: jest.fn(),
            getReportData: jest.fn(),
            setBreadcrumbParams: jest.fn(),
            breadcrumbParams: [],
        }
        const { container, findByTestId } = render(<GroupCell {...props} />)
        const arrow = container.querySelector('.icon-arrow.right')
        fireEvent.click(arrow)
        await findByTestId('cell')
        expect(props.toggleLoader).toHaveBeenCalled()
        expect(props.setReportData).toHaveBeenCalled()
    })

    test('direct breakdown path updates data', async () => {
        const props = {
            rowData: { sportType: 1, leagueId: 10, sportName: 'Football', isDirectToCurrency: true, isBreakdown: false },
            level: ReportLevel.MAIN,
            reportData: { data: [{ sportType: 1 }] },
            requestParam: {},
            setReportData: jest.fn(),
            toggleLoader: jest.fn(),
            setReloadReport: jest.fn(),
            setRequestParam: jest.fn(),
            getReportData: jest.fn(),
            setBreadcrumbParams: jest.fn(),
            breadcrumbParams: [],
        }
        const { container, findByTestId } = render(<GroupCell {...props} />)
        const arrow = container.querySelector('.icon-strong-arrow.left')
        fireEvent.click(arrow)
        await findByTestId('cell')
        expect(props.setReportData).toHaveBeenCalled()
    })
})


