import * as permission from '../constants/permission';
import * as pages from '../constants/pages';
import * as pageName from '../constants/pageName';
import * as paths from '../constants/path';

import AppLayout from '../layouts/AppLayout';

import SettledMatchCountRoute from './SettledMatchCountRoute';
import WeeklyLiveMatchRoute from './WeeklyLiveMatchRoute';
import CustomerBalanceRoute from './CustomerBalanceRoute';
import CustomerSupportTaskRoute from './CustomerSupportTasksRoute';
import ExtraPayoutRoute from './ExtraPayoutRoute';
import LeagueWinLossRoute from './LeagueWinLoss';
import WinLossAnalysisRoute from './WinLossAnalysis';
import MatchWinLossRoute from './MatchWinLossRoute';
import BetListRoute from './BetListRoute';
import LiveReportRoute from './LiveReportRoute';
import CustomerTurnoverRoute from './CustomerTurnoverRoute';
import TurnoverRoute from './TurnoverRoute';
import LicenseeWinLossByTimeZoneRoute from './WinLossByTimeZone';
import SubsidiaryPerformanceRoute from './SubsidiaryPerformanceRoute';

export default [
    {
        Id: pages.SETTLED_MATCH_COUNT,
        Path: 'SettledMatchCountReport/*',
        Permissions: [permission.SETTLED_MATCH_COUNT],
        Layout: AppLayout,
        Component: SettledMatchCountRoute,
    },
    {
        Id: pages.WEEKLY_LIVE_MATCHES,
        Path: 'WeeklyLiveMatchReport/*',
        Permissions: [permission.WEEKLY_LIVE_MATCHES],
        Layout: AppLayout,
        Component: WeeklyLiveMatchRoute,
    },
    {
        Id: pages.CUSTOMER_BALANCE,
        Path: 'CustomerBalanceReport/*',
        Permissions: [permission.CUSTOMER_BALANCE],
        Layout: AppLayout,
        Component: CustomerBalanceRoute,
    },
    {
        Id: pages.CUSTOMER_SUPPORT_TASK,
        Path: 'CustomerSupportTaskReport/*',
        Permissions: [permission.CUSTOMER_SUPPORT_TASK],
        Layout: AppLayout,
        Component: CustomerSupportTaskRoute,
    },
    {
        Id: pages.EXTRA_PAYOUT,
        Path: 'ExtraPayoutReport/*',
        Permissions: [permission.EXTRA_PAYOUT],
        Layout: AppLayout,
        Component: ExtraPayoutRoute,
    },
    {
        Id: pages.LEAGUE_WL,
        Path: 'LeagueWinLossReport/*',
        Permissions: [permission.LEAGUE_WL],
        Layout: AppLayout,
        Component: LeagueWinLossRoute,
    },
    {
        Id: pages.WL_BY_TIME_ZONE,
        PageName: pageName.LICENSEE_WIN_LOSS,
        Path: 'LicenseeWinLossByTimeZoneReport/*',
        Permissions: [permission.WL_BY_TIME_ZONE],
        Layout: AppLayout,
        Component: LicenseeWinLossByTimeZoneRoute,
    },
    {
        Id: pages.WL_ANALYSIS,
        Path: 'WinlossAnalysisReport/*',
        Permissions: [permission.WL_ANALYSIS],
        Layout: null,
        Component: WinLossAnalysisRoute,
    },
    {
    },
    {
        Id: pages.SUBSIDIARY_PERFORMANCE,
        Path: 'SubsidiaryPerformanceReport/*',
        Permissions: [permission.SUBSIDIARY_PERFORMANCE],
        Layout: AppLayout,
        Component: SubsidiaryPerformanceRoute,
        Id: pages.MATCH_WL,
        Path: 'MatchWinLossReport/*',
        Permissions: [permission.MATCH_WL],
        Layout: AppLayout,
        Component: MatchWinLossRoute,
    },
    {
        Id: pages.LIVE_REPORT,
        Path: 'LiveReport/*',
        Permissions: [permission.LIVE_REPORT],
        Layout: AppLayout,
        Component: LiveReportRoute,
    },
    {
        Id: pages.CUSTOMER_TURNOVER,
        Path: 'CustomerTurnoverReport/*',
        Permissions: [permission.CUSTOMER_TURNOVER],
        Layout: AppLayout,
        Component: CustomerTurnoverRoute,
    },
    {
        Id: pages.TURNOVER,
        Path: 'TurnoverReport/*',
        Permissions: [permission.TURNOVER],
        Layout: AppLayout,
        Component: TurnoverRoute,
    },
    {
        Id: pages.BETLIST,
        Path: `${paths.BETLIST}/:controller/*`,
        Layout: AppLayout,
        Component: BetListRoute,
    },
];
