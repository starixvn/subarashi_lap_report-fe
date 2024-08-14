import React from 'react';
import { Breadcrumb } from '@legion-lib/react-breadcrumb';
import { constants } from '../common';
import actions from '../actions';
import { useDispatch, useSelector } from 'react-redux';

const GridBreadcrumb = () => {
    const dispatch = useDispatch();
    const requestParam = useSelector((state) => state.requestParam);
    const drillDownCache = useSelector((state) => state.drillDownCache);

    const { BreadcrumbItems } = constants;
    const { setRequestParam, setGridData } = actions;

    const drillDownData = (level) => {
        const currentLevel = requestParam.DrillDownLevel;

        if (currentLevel === level) {
            return;
        }

        const cache = drillDownCache[level];

        dispatch(setRequestParam(cache.requestParam));
        dispatch(setGridData(cache.gridData));
    };

    return <Breadcrumb items={BreadcrumbItems} value={requestParam.DrillDownLevel} onChange={(item) => drillDownData(item.value)} />;
};

export default React.memo(GridBreadcrumb);
