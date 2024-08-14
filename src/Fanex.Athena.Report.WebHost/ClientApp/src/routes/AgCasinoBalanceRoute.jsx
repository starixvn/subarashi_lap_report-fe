import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const AgCasinoWBalance = lazy(() => import(/* webpackChunkName: "agcasinobalance" */ '../pages/agcasinobalance'));

const AgCasinoWBalanceRoute = () => {
    return (
        <Routes>
            <Route index element={<AgCasinoWBalance />} />
        </Routes>
    );
};

export default AgCasinoWBalanceRoute;
