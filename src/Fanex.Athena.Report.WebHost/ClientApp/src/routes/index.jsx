import SettledMatchCountRoute from './SettledMatchCountRoute';
import WeeklyLiveMatchRoute from './WeeklyLiveMatchRoute';
import * as permission from '@srcRoot/constants/permission';
import * as pages from '@srcRoot/constants/pages';

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
];
