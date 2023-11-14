import React from "react";
import { Route, Routes, BrowserRouter, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RouteConfig from "./routes";
import AppLayout from "./layouts/AppLayout";
import NotFound from "./pages/NotFound";
import { AuthorizedFunc } from "./helpers/validatorHelper";

const App = () => {
    const _rootUrl = window.rootUrl || "/";
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<AppLayout />}>
                {RouteConfig.map(({ Path, Permissions, Component }) =>
                    <Route key={Path} path={Path} element={<Component />} loader={() => AuthorizedFunc(Permissions)} />)}
                <Route path="*" element={<NotFound />} />
            </Route>
        ),
        { basename: _rootUrl }
    );

    return (
        <RouterProvider router={router} />
    );
};

export default React.memo(App);
