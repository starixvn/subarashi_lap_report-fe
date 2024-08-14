import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const AgCasinoWinLoss = lazy(() => import(/* webpackChunkName: "agcasinowinloss" */ '../pages/agcasinowinloss'));

const AgCasinoWinLossRoute = () => {
    return (
        <Routes>
            <Route index element={<AgCasinoWinLoss />} />
        </Routes>
    );
};

export default AgCasinoWinLossRoute;
