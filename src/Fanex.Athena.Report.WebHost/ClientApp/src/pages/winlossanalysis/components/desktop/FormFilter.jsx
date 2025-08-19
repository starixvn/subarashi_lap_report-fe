import React, { memo } from 'react';
import CollapsiblePanel from '@/components/CollapsiblePanel';
import MainFilter from './MainFilter.jsx';
import GroupByFilter from './GroupByFilter.jsx';

export const FormFilter = () => (
    <CollapsiblePanel className="aggregate-filter">
        <MainFilter />
        <GroupByFilter />
    </CollapsiblePanel>
);

export default memo(FormFilter);
