import React from "react";
import { Route, Routes } from "react-router-dom";
import RouteConfig from "./routes";
import AppLayout from "./layouts/AppLayout";
import NotFound from "./pages/NotFound";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route path="SettledMatchCountReport/*" element={<RouteConfig.SettledMatchCountRoute />} />
                <Route path="WeeklyLiveMatchReport/*" element={<RouteConfig.WeeklyLiveMatchRoute />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default React.memo(App);
