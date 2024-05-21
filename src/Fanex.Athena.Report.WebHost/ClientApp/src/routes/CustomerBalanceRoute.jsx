import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const CustomerBalance = lazy(() => import(/* webpackChunkName: "customerbalance" */ '../pages/customerbalance'));

const CustomerBalanceRoute = () => {
    return (
        <Routes>
            <Route index element={<CustomerBalance />} />
        </Routes>
    );
};

export default CustomerBalanceRoute;
