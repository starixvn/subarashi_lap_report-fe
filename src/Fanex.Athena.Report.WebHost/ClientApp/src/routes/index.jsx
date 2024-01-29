import SettledMatchCountRoute from './SettledMatchCountRoute';
import WeeklyLiveMatchRoute from './WeeklyLiveMatchRoute';
import CustomerBalanceRoute from './CustomerBalanceRoute';
import CustomerSupportTaskRoute from './CustomerSupportTasksRoute';
import ExtraPayoutRoute from './ExtraPayoutRoute';

import * as permission from '../constants/permission';
import * as pages from '../constants/pages';
import LeagueWinLossRoute from './LeagueWinLoss';

export default [
    {
        Id: pages.SETTLED_MATCH_COUNT,
        Path: 'SettledMatchCountReport/*',
        Permissions: [permission.SETTLED_MATCH_COUNT],
        Component: SettledMatchCountRoute,
    },
    {
        Id: pages.WEEKLY_LIVE_MATCHES,
        Path: 'WeeklyLiveMatchReport/*',
        Permissions: [permission.WEEKLY_LIVE_MATCHES],
        Component: WeeklyLiveMatchRoute,
    },
    {
        Id: pages.CUSTOMER_BALANCE,
        Path: 'CustomerBalanceReport/*',
        Permissions: [permission.CUSTOMER_BALANCE],
        Component: CustomerBalanceRoute,
    },
    {
        Id: pages.CUSTOMER_SUPPORT_TASK,
        Path: 'CustomerSupportTaskReport/*',
        Permissions: [permission.CUSTOMER_SUPPORT_TASK],
        Component: CustomerSupportTaskRoute,
    },
    {
        Id: pages.EXTRA_PAYOUT,
        Path: 'ExtraPayoutReport/*',
        Permissions: [permission.EXTRA_PAYOUT],
        Component: ExtraPayoutRoute,
    },
    {
        Id: pages.LEAGUE_WL,
        Path: 'LeagueWinLossReport/*',
        Permissions: [permission.LEAGUE_WL],
        Component: LeagueWinLossRoute,
    },
];
