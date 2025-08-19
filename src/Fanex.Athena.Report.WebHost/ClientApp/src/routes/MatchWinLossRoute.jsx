import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const MatchWinLoss = lazy(() => import(/* webpackChunkName: "matchwinloss" */ '../pages/matchwinloss'));

const MatchWinLossRoute = () => (
    <Routes>
        <Route index element={<MatchWinLoss />} />
    </Routes>
);

export default MatchWinLossRoute;
