import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useRouteError } from 'react-router-dom';
import RouteConfig from './routes';
import RouteLayout from './layouts/RouteLayout';
import NotFound from './pages/NotFound';
import RouteErrorBoundary from './components/RouteErrorBoundary';
import { AuthorizeRequestInfo } from './helpers/validatorHelper';
import { isDebugging } from './constants/config';

const App = () => {
    const _rootUrl = window.rootUrl || '/';
    const errorBoundary = () => (isDebugging ? null : <RouteErrorBoundary />);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                {RouteConfig.map(({ Id, Path, Permissions, Layout, Component }) => (
                    <Route
                        id={Id}
                        key={Id}
                        path={Path}
                        element={<RouteLayout pageName={Id} layout={Layout} component={Component} />}
                        loader={async () => await AuthorizeRequestInfo({ permissions: Permissions })}
                        errorElement={errorBoundary()}
                    />
                ))}
                <Route path="*" element={<NotFound />} />
            </Route>
        ),
        { basename: _rootUrl }
    );

    return <RouterProvider router={router} />;
};

export default React.memo(App);
