import React, { memo, useState } from 'react';
import CollapsiblePanel from '@/components/CollapsiblePanel';
import MobileMainFilter from './MobileMainFilter';
import MobileGroupByFilter from './MobileGroupByFilter';

export const MobileFormFilter = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const onCollapse = () => {
        setIsCollapsed(true);
    };
    const onExpand = () => {
        setIsCollapsed(false);
    };

    return (
        <CollapsiblePanel className="mobile-mode aggregate-filter" onCollapse={onCollapse} onExpand={onExpand} isInitCollapsed={true} isCustomCollapse={true}>
            <MobileMainFilter isCollapsed={isCollapsed} />
            <MobileGroupByFilter isCollapsed={isCollapsed} />
        </CollapsiblePanel>
    );
};

export default memo(MobileFormFilter);
