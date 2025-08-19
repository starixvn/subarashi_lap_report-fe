import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const WinLossAnalysis = lazy(() => import(/* webpackChunkName: "winlossanalysis" */ '../pages/winlossanalysis'));

const WinLossAnalysisRoute = () => (
    <Routes>
        <Route index element={<WinLossAnalysis />} />
    </Routes>
);

export default WinLossAnalysisRoute;
