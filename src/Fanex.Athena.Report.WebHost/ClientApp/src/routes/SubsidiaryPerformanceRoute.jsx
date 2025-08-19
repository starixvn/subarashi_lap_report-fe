import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const SubsidiaryPerformance = lazy(() => import(/* webpackChunkName: "subsidiaryperformance" */ '../pages/subsidiaryperformance'));

const SubsidiaryPerformanceRoute = () => (
    <Routes>
        <Route index element={<SubsidiaryPerformance />} />
    </Routes>
);

export default SubsidiaryPerformanceRoute;
