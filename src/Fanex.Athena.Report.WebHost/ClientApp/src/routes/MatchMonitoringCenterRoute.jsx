import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const MatchMonitoringCenter = lazy(() => import(/* webpackChunkName: "matchmonitoringcenter" */ '../pages/matchmonitoringcenter'));

const MatchMonitoringSetting = lazy(
    () => import(/* webpackChunkName: "matchmonitoringsetting" */ '../pages/matchmonitoringcenter/pages/matchmonitoringsetting')
);

const TriggeredAlertHistory = lazy(() => import(/* webpackChunkName: "triggeredalerthistory" */ '../pages/matchmonitoringcenter/pages/triggeredalerthistory'));

const MatchMonitoringCenterRoute = () => (
    <Routes>
        <Route index element={<MatchMonitoringCenter />} />
        <Route path="/setting" element={<MatchMonitoringSetting />} />
        <Route path="/history" element={<TriggeredAlertHistory />} />
    </Routes>
);

export default MatchMonitoringCenterRoute;
