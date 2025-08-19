import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const CustomerTurnover = lazy(() => import(/* webpackChunkName: "customerturnover" */ '../pages/customerturnover'));

const CustomerTurnoverRoute = () => (
    <Routes>
        <Route index element={<CustomerTurnover />} />
    </Routes>
);

export default CustomerTurnoverRoute;
