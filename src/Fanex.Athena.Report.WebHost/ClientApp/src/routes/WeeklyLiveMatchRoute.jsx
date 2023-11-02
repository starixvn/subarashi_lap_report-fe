import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const WeeklyLiveMatch = lazy(() => import(/* webpackChunkName: "weeklylivematch" */'../pages/weeklylivematch'));

export default function () {
    return (
        <Routes>
            <Route index element={<WeeklyLiveMatch />} />
        </Routes>
    )
}
