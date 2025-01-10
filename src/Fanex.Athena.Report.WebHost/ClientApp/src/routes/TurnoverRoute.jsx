import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Turnover = lazy(() => import(/* webpackChunkName: "turnover" */ '../pages/turnover'));

const TurnoverRoute = () => {
    return (
        <Routes>
            <Route index element={<Turnover />} />
        </Routes>
    );
};

export default TurnoverRoute;
