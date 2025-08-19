import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const LiveReportSummary = lazy(() => import(/* webpackChunkName: "livereport.summary" */ '../pages/livereport/summary'));
const LiveReportMatchList = lazy(() => import(/* webpackChunkName: "livereport.matchlist" */ '../pages/livereport/matchlist'));

const LiveReportRoute = () => (
    <Routes>
        <Route path="/MatchList" element={<LiveReportMatchList />} />
        <Route index element={<LiveReportSummary />} />
    </Routes>
);

export default LiveReportRoute;
