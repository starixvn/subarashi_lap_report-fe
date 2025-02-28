import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import useToggleRequest from '@/hooks/useToggleRequest';

import actions from '../actions';
import Service, { constants } from '../common';

const ReportLink = ({ data, content, drillDownLevel }) => {
    const dispatch = useDispatch();
    const requestParam = useSelector((state) => state.requestParam);

    const { sendRequest } = useToggleRequest();
    const { fetchDrillDownData } = actions;
    const { ReportByValue } = constants;

    const onClickHandler = (event) => {
        event.preventDefault();

        const params = {
            ...getParams(),
            DrillDownLevel: drillDownLevel + 1,
        };

        sendRequest(() => dispatch(fetchDrillDownData(params)));
    };

    const getParams = () => {
        const reportDate = Service.getDrillDownDate(
            moment(requestParam.FromDate),
            moment(requestParam.ToDate),
            moment(data.date),
            requestParam.ReportBy == ReportByValue.Daily
        );

        return {
            FromDate: reportDate.fromDate,
            ToDate: reportDate.toDate,
            BaseCurrency: requestParam.BaseCurrency,
            CurrencyName: data.currencyName,
            CurrencyId: data.currencyId,
            DrillDownCustomerId: data.customerId,
            ReportBy: requestParam.ReportBy,
            IsExcludedTestData: requestParam.IsExcludedTestData,
        };
    };

    return (
        <a href="#" onClick={onClickHandler}>
            {content}
        </a>
    );
};

export default ReportLink;
