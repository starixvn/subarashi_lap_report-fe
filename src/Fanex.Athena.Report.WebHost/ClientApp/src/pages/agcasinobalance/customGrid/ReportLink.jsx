import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import useToggleRequest from '@srcRoot/hooks/useToggleRequest';

import actions from '../actions';
import Site from '@srcRoot/lib/site';
import { ReportLevel } from '@srcRoot/constants/report';

const ReportLink = ({ data, content, drillDownLevel }) => {
    const dispatch = useDispatch();
    const requestParam = useSelector((state) => state.requestParam);

    const { sendRequest } = useToggleRequest();
    const { fetchDrillDownData } = actions;

    const onClickHandler = (event) => {
        event.preventDefault();

        sendRequest(() => dispatch(fetchDrillDownData(getParams())));
    };

    const getParams = () => {
        const params = {
            FromDate: Site.convertDateToString(moment(data.date)),
            ToDate: Site.convertDateToString(moment(data.date)),
            BaseCurrency: requestParam.BaseCurrency,
            CurrencyName: data.currencyName,
            CurrencyId: data.currencyId,
            DrillDownCustomerId: data.customerId,
            ReportBy: requestParam.ReportBy,
            IsExcludedTestData: requestParam.IsExcludedTestData,
            DrillDownLevel: drillDownLevel + 1,
        };

        if (params.DrillDownLevel == ReportLevel.CUSTOMER) {
            params.PageIndex = 1;
            params.PageSize = 1000;
        }

        return params;
    };

    return (
        <a href="#" onClick={onClickHandler}>
            {content}
        </a>
    );
};

export default ReportLink;
