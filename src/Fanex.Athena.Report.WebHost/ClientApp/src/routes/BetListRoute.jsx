import Loader from '@/components/Loader';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const BetList = lazy(() => import(/* webpackChunkName: "betlist" */ '../pages/betlist'));

const BetListRoute = () => {
    return (
        <Suspense fallback={<Loader isLoading={true}></Loader>}>
            <Routes>
                <Route path=":action" element={<BetList />} />
            </Routes>
        </Suspense>
    );
};

export default BetListRoute;
