import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import RouteConfig from './routes';
import AppLayout from './layouts/AppLayout';
import NotFound from './pages/NotFound';
import { AuthorizeRequestInfo } from './helpers/validatorHelper';

const App = () => {
    const _rootUrl = window.rootUrl || '/';
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                {RouteConfig.map(({ Id, Path, Permissions, HaveCustomLayout, Component }) => (
                    <Route
                        id={Id}
                        key={Id}
                        path={Path}
                        element={
                            <AppLayout haveCustomLayout={HaveCustomLayout}>
                                <Component />
                            </AppLayout>
                        }
                        loader={async () => await AuthorizeRequestInfo({ permissions: Permissions })}
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
