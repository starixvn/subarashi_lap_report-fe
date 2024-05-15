import React, { lazy } from 'react';
import { Route, Routes, useLoaderData } from 'react-router-dom';

const BetList = lazy(() => import(/* webpackChunkName: "betlist" */ '../pages/betlist'));

const BetListRoute = () => {
    return (
        <Routes>
            <Route path=":action" element={<BetList />} />
        </Routes>
    );
};

export default BetListRoute;
