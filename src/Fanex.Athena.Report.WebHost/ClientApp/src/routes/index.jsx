import SettledMatchCountRoute from './SettledMatchCountRoute';
import WeeklyLiveMatchRoute from './WeeklyLiveMatchRoute';
import * as permission from "@srcRoot/constants/permission";

export default [
    {
        Path: "SettledMatchCountReport/*",
        Permissions: [permission.SETTLED_MATCH_COUNT],
        Component: SettledMatchCountRoute
    },
    {
        Path: "WeeklyLiveMatchReport/*",
        Permissions: [permission.WEEKLY_LIVE_MATCHES],
        Component: WeeklyLiveMatchRoute
    }
];
