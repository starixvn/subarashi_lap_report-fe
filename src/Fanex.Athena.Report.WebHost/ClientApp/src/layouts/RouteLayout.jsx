import React from 'react';

function RouteLayout({ layout, component, ...rest }) {
    const Layout = layout;
    const Component = component;

    if (!Layout) {
        return <Component />;
    }

    return (
        <Layout {...rest}>
            <Component />
        </Layout>
    );
}

export default React.memo(RouteLayout);
