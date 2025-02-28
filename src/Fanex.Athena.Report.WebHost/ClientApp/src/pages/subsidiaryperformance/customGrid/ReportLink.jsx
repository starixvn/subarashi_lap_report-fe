import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReportLevel } from '@/constants/report';
import useToggleRequest from '@/hooks/useToggleRequest';

import actions from '../actions';
import { constants } from '../common';

const ReportLink = ({ subsidiary, children }) => {
    const dispatch = useDispatch();
    const requestParam = useSelector((state) => state.requestParam);

    const { sendRequest } = useToggleRequest();

    const { fetchGridData } = actions;
    const { ApiUrl } = constants;

    const onClickHandler = (event) => {
        event.preventDefault();
        const params = {
            ...requestParam,
            DrillDownLevel: ReportLevel.CUSTOMER,
            SubsidiaryId: subsidiary,
        };

        sendRequest(() => dispatch(fetchGridData(ApiUrl.DETAIL_URL, params)));
    };

    return (
        <a href="#" onClick={onClickHandler}>
            {children}
        </a>
    );
};

export default ReportLink;
