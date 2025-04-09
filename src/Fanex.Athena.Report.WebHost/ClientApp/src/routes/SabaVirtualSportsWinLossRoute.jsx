import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const SabaVirtualSportsWinLoss = lazy(() => import(/* webpackChunkName: "sabavirtualsportswinloss" */ '../pages/sabavirtualsportswinloss'));

const SabaVirtualSportsWinLossRoute = () => {
    return (
        <Routes>
            <Route index element={<SabaVirtualSportsWinLoss />} />
        </Routes>
    );
};

export default SabaVirtualSportsWinLossRoute;
