import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const CustomerSupportTask = lazy(() => import(/* webpackChunkName: "customersupporttasks" */ '../pages/customersupporttask'));

const CustomerSupportTaskRoute = () => {
    return (
        <Routes>
            <Route index element={<CustomerSupportTask />} />
        </Routes>
    );
};

export default CustomerSupportTaskRoute;
