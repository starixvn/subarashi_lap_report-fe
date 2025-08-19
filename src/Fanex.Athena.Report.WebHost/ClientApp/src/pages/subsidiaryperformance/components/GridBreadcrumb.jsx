import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb } from '@legion-lib/react-breadcrumb';

import { ReportLevel } from '@/constants/report';
import useToggleRequest from '@/hooks/useToggleRequest';

import actions from '../actions';
import { constants } from '../common';

const GridBreadcrumb = () => {
    const dispatch = useDispatch();
    const { sendRequest } = useToggleRequest();

    const requestParam = useSelector(state => state.requestParam);

    const { fetchGridData } = actions;
    const { ApiUrl, BreadcrumbItems } = constants;

    const drillDownData = level => {
        const currentLevel = requestParam.DrillDownLevel;

        if (currentLevel === level) {
            return;
        }

        if (level === ReportLevel.MAIN) {
            sendRequest(() => dispatch(fetchGridData(ApiUrl.DATA_URL, { ...requestParam, DrillDownLevel: level })));
            return;
        }

        if (level === ReportLevel.CUSTOMER) {
            sendRequest(() => dispatch(fetchGridData(ApiUrl.DETAIL_URL, { ...requestParam, DrillDownLevel: level })));
            return;
        }
    };

    return <Breadcrumb items={BreadcrumbItems} value={requestParam.DrillDownLevel} onChange={item => drillDownData(item.value)} />;
};

export default React.memo(GridBreadcrumb);
