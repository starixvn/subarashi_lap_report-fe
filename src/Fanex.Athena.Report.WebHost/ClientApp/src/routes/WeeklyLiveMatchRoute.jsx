import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const WeeklyLiveMatch = lazy(() => import(/* webpackChunkName: "weeklylivematch" */ '../pages/weeklylivematch'));

const WeeklyLiveMatchRoute = () => (
    <Routes>
        <Route index element={<WeeklyLiveMatch />} />
    </Routes>
);

export default WeeklyLiveMatchRoute;
