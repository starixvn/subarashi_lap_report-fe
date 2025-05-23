import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const MatchMonitoringCenter = lazy(() => import(/* webpackChunkName: "matchmonitoringcenter" */ '../pages/matchmonitoringcenter'));

const MatchMonitoringCenterRoute = () => {
    return (
        <Routes>
            <Route index element={<MatchMonitoringCenter />} />
        </Routes>
    );
};

export default MatchMonitoringCenterRoute;
