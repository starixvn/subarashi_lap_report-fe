import React from 'react';
import { usePageViewEvent } from '@srcRoot/hooks/gtagEvents';

function RouteLayout({ id, pageName, layout: Layout, component: Component, ...rest }) {
    usePageViewEvent(id, pageName);

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
