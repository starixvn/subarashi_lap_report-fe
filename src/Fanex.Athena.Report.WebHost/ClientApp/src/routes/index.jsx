import {
    SETTLED_MATCH_COUNT,
    WEEKLY_LIVE_MATCHES,
    CUSTOMER_BALANCE,
    CUSTOMER_SUPPORT_TASK,
    EXTRA_PAYOUT,
    LEAGUE_WL,
    WL_BY_TIME_ZONE,
    WL_ANALYSIS,
    SUBSIDIARY_PERFORMANCE,
    MATCH_WL,
    LIVE_REPORT,
    CUSTOMER_TURNOVER,
    TURNOVER,
    MATCH_MONITORING_CENTER,
} from '../constants/permission';
import {
    SETTLED_MATCH_COUNT as SETTLED_MATCH_COUNT_PAGE,
    WEEKLY_LIVE_MATCHES as WEEKLY_LIVE_MATCHES_PAGE,
    CUSTOMER_BALANCE as CUSTOMER_BALANCE_PAGE,
    CUSTOMER_SUPPORT_TASK as CUSTOMER_SUPPORT_TASK_PAGE,
    EXTRA_PAYOUT as EXTRA_PAYOUT_PAGE,
    LEAGUE_WL as LEAGUE_WL_PAGE,
    WL_BY_TIME_ZONE as WL_BY_TIME_ZONE_PAGE,
    WL_ANALYSIS as WL_ANALYSIS_PAGE,
    SUBSIDIARY_PERFORMANCE as SUBSIDIARY_PERFORMANCE_PAGE,
    MATCH_WL as MATCH_WL_PAGE,
    LIVE_REPORT as LIVE_REPORT_PAGE,
    CUSTOMER_TURNOVER as CUSTOMER_TURNOVER_PAGE,
    TURNOVER as TURNOVER_PAGE,
    BETLIST,
    MATCH_MONITORING_CENTER as MATCH_MONITORING_CENTER_PAGE,
} from '../constants/pages';
import { LICENSEE_WIN_LOSS } from '../constants/pageName';
import { BETLIST as BETLIST_PATH } from '../constants/path';

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
import MatchMonitoringCenterRoute from './MatchMonitoringCenterRoute';

export default [
    {
        Id: SETTLED_MATCH_COUNT_PAGE,
        Path: 'SettledMatchCountReport/*',
        Permissions: [SETTLED_MATCH_COUNT],
        Layout: AppLayout,
        Component: SettledMatchCountRoute,
    },
    {
        Id: WEEKLY_LIVE_MATCHES_PAGE,
        Path: 'WeeklyLiveMatchReport/*',
        Permissions: [WEEKLY_LIVE_MATCHES],
        Layout: AppLayout,
        Component: WeeklyLiveMatchRoute,
    },
    {
        Id: CUSTOMER_BALANCE_PAGE,
        Path: 'CustomerBalanceReport/*',
        Permissions: [CUSTOMER_BALANCE],
        Layout: AppLayout,
        Component: CustomerBalanceRoute,
    },
    {
        Id: CUSTOMER_SUPPORT_TASK_PAGE,
        Path: 'CustomerSupportTaskReport/*',
        Permissions: [CUSTOMER_SUPPORT_TASK],
        Layout: AppLayout,
        Component: CustomerSupportTaskRoute,
    },
    {
        Id: EXTRA_PAYOUT_PAGE,
        Path: 'ExtraPayoutReport/*',
        Permissions: [EXTRA_PAYOUT],
        Layout: AppLayout,
        Component: ExtraPayoutRoute,
    },
    {
        Id: LEAGUE_WL_PAGE,
        Path: 'LeagueWinLossReport/*',
        Permissions: [LEAGUE_WL],
        Layout: AppLayout,
        Component: LeagueWinLossRoute,
    },
    {
        Id: WL_BY_TIME_ZONE_PAGE,
        PageName: LICENSEE_WIN_LOSS,
        Path: 'LicenseeWinLossByTimeZoneReport/*',
        Permissions: [WL_BY_TIME_ZONE],
        Layout: AppLayout,
        Component: LicenseeWinLossByTimeZoneRoute,
    },
    {
        Id: WL_ANALYSIS_PAGE,
        Path: 'WinlossAnalysisReport/*',
        Permissions: [WL_ANALYSIS],
        Layout: null,
        Component: WinLossAnalysisRoute,
    },
    {
        Id: SUBSIDIARY_PERFORMANCE_PAGE,
        Path: 'SubsidiaryPerformanceReport/*',
        Permissions: [SUBSIDIARY_PERFORMANCE],
        Layout: AppLayout,
        Component: SubsidiaryPerformanceRoute,
    },
    {
        Id: MATCH_WL_PAGE,
        Path: 'MatchWinLossReport/*',
        Permissions: [MATCH_WL],
        Layout: AppLayout,
        Component: MatchWinLossRoute,
    },
    {
        Id: LIVE_REPORT_PAGE,
        Path: 'LiveReport/*',
        Permissions: [LIVE_REPORT],
        Layout: AppLayout,
        Component: LiveReportRoute,
    },
    {
        Id: CUSTOMER_TURNOVER_PAGE,
        Path: 'CustomerTurnoverReport/*',
        Permissions: [CUSTOMER_TURNOVER],
        Layout: AppLayout,
        Component: CustomerTurnoverRoute,
    },
    {
        Id: TURNOVER_PAGE,
        Path: 'TurnoverReport/*',
        Permissions: [TURNOVER],
        Layout: AppLayout,
        Component: TurnoverRoute,
    },
    {
        Id: BETLIST,
        Path: `${BETLIST_PATH}/:controller/*`,
        Layout: AppLayout,
        Component: BetListRoute,
    },
    {
        Id: MATCH_MONITORING_CENTER_PAGE,
        Path: 'MatchMonitoringCenter/*',
        Permissions: [MATCH_MONITORING_CENTER],
        Layout: AppLayout,
        Component: MatchMonitoringCenterRoute,
    },
];
