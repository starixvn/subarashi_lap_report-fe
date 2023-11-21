import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const SettledMatchCount = lazy(() =>import(/* webpackChunkName: "settledmatchcount" */ '../pages/settledmatchcount'));

const SettledMatchCountRoute = () => {
    return (
        <Routes>
            <Route index element={<SettledMatchCount />} />
        </Routes>
    );
};

export default SettledMatchCountRoute;
