import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const MatchMonitoringCenter = lazy(() => import(/* webpackChunkName: "matchmonitoringcenter" */ '../pages/matchmonitoringcenter'));

const MatchMonitoringSetting = lazy(
    () => import(/* webpackChunkName: "matchmonitoringsetting" */ '../pages/matchmonitoringcenter/pages/matchmonitoringsetting')
);

const MatchMonitoringCenterRoute = () => {
    return (
        <Routes>
            <Route index element={<MatchMonitoringCenter />} />
            <Route path="/setting" element={<MatchMonitoringSetting />} />
        </Routes>
    );
};

export default MatchMonitoringCenterRoute;
