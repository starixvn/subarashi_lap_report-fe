import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const ExtraPayout = lazy(() => import(/* webpackChunkName: "extrapayout" */ '../pages/extrapayout'));

const ExtraPayoutRoute = () => (
    <Routes>
        <Route index element={<ExtraPayout />} />
    </Routes>
);

export default ExtraPayoutRoute;
