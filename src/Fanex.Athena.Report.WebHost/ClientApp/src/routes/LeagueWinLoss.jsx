import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const LeagueWinLoss = lazy(() => import(/* webpackChunkName: "leaguewinloss" */ '../pages/leaguewinloss'));

const LeagueWinLossRoute = () => {
    return (
        <Routes>
            <Route index element={<LeagueWinLoss />} />
        </Routes>
    );
};

export default LeagueWinLossRoute;
