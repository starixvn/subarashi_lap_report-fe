import React from 'react';
import { usePageViewEvent } from '@/hooks/gtagEvents';

const RouteLayout = ({ id, pageName, layout: Layout, component: Component, ...rest }) => {
    usePageViewEvent(pageName ?? id);

    if (!Layout) {
        return <Component />;
    }

    return (
        <Layout {...rest}>
            <Component />
        </Layout>
    );
};

export default React.memo(RouteLayout);
