import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const CustomerPendingFunds = lazy(() => import(/* webpackChunkName: "customerpendingfunds" */ '../pages/customerpendingfunds'));

const CustomerPendingFundsRoute = () => {
    return (
        <Routes>
            <Route index element={<CustomerPendingFunds />} />
        </Routes>
    );
};

export default CustomerPendingFundsRoute;
