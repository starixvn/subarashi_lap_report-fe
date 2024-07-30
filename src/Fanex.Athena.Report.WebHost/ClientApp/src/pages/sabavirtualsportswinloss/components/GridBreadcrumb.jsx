import React from 'react';
import { Breadcrumb } from '@legion-lib/react-breadcrumb';
import { constants } from '../common';
import actions from '../actions';
import { useDispatch, useSelector } from 'react-redux';

const GridBreadcrumb = () => {
    const dispatch = useDispatch();
    const gridSettings = useSelector((state) => state.gridSettings);
    const drillDownCache = useSelector((state) => state.drillDownCache);

    const { BreadcrumbItems } = constants;
    const { setRequestParam, setGridData, updateGridSettings } = actions;

    const drillDownData = (level) => {
        const currentLevel = gridSettings.drillDownLevel;

        if (currentLevel === level) {
            return;
        }

        const cache = drillDownCache[level];

        dispatch(setRequestParam(cache.requestParam));
        dispatch(setGridData(cache.gridData));
        dispatch(updateGridSettings({ drillDownLevel: level }));
    };

    return <Breadcrumb items={BreadcrumbItems} value={gridSettings.drillDownLevel} onChange={(item) => drillDownData(item.value)} />;
};

export default React.memo(GridBreadcrumb);
