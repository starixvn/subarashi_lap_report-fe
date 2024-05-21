import SettledMatchCountRoute from './SettledMatchCountRoute';
import WeeklyLiveMatchRoute from './WeeklyLiveMatchRoute';
import CustomerBalanceRoute from './CustomerBalanceRoute';
import CustomerSupportTaskRoute from './CustomerSupportTasksRoute';

import * as permission from '../constants/permission';
import * as pages from '../constants/pages';

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
];
