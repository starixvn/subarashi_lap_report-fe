import React from 'react';
import { usePageViewEvent } from '@/hooks/gtagEvents';

function RouteLayout({ id, layout: Layout, component: Component, ...rest }) {
    usePageViewEvent(id);

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
