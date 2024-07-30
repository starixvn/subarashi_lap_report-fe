import React from 'react';
import { createSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Site from '@srcRoot/lib/site';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest';

import actions from '../actions';
import Service, { constants } from '../common';

const SabaReportLink = ({ data, content, drillDownLevel }) => {
    const dispatch = useDispatch();
    const requestParam = useSelector((state) => state.requestParam);

    const { sendRequest } = useToggleRequest();
    const { setPopUpSettings, fetchDrillDownData } = actions;
    const { DrillDownLevel, BetListPageUrl, ReportByValue } = constants;

    const onClickHandler = (event) => {
        event.preventDefault();

        if (drillDownLevel == DrillDownLevel.Customer) {
            return onClickBetListHandler();
        }

        return onClickReportHandler();
    };

    const onClickBetListHandler = () => {
        const params = {
            ...getParams(),
            ExternalId: data.externalId,
            SystemId: data.systemId,
        };

        const searchParams = createSearchParams(params).toString();
        const iframeUrl = `${Site.resolveClientUrl(BetListPageUrl.DATA_URL)}?${searchParams}`;
        dispatch(setPopUpSettings({ iframeUrl: iframeUrl, isShow: true }));
    };

    const onClickReportHandler = () => {
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
            CustId: data.customerId,
            Sport: requestParam.Sport,
            DrawFilter: requestParam.DrawFilter,
            ReportBy: requestParam.ReportBy,
            IsExcludedTestData: requestParam.IsExcludedTestData,
            Username: requestParam.Username,
        };
    };

    return (
        <a href="#" onClick={onClickHandler}>
            {content}
        </a>
    );
};

export default SabaReportLink;
