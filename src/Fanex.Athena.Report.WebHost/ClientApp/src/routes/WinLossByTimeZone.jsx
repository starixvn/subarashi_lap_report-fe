import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const LicenseeWinLossByTimeZone = lazy(() => import(/* webpackChunkName: "licenseeWinLossByTimeZone" */ '../pages/winlossbytimezone'));

const LicenseeWinLossByTimeZoneRoute = () => {
    return (
        <Routes>
            <Route index element={<LicenseeWinLossByTimeZone />} />
        </Routes>
    );
};

export default LicenseeWinLossByTimeZoneRoute;
