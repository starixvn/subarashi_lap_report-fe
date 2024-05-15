import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useRouteError } from 'react-router-dom';
import RouteConfig from './routes';
import AppLayout from './layouts/AppLayout';
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
                {RouteConfig.map(({ Id, Path, Permissions, HaveCustomLayout, Loader, Component }) => (
                    <Route
                        id={Id}
                        key={Id}
                        path={Path}
                        element={
                            <AppLayout haveCustomLayout={HaveCustomLayout}>
                                <Component />
                            </AppLayout>
                        }
                        loader={(loaderParams) => {
                            if (Loader) {
                                return Loader(loaderParams);
                            }

                            return AuthorizeRequestInfo({ permissions: Permissions });
                        }}
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
