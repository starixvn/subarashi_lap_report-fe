import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '@legion-lib/react-grid';

import ReportTitle from '@srcRoot/components/ReportTitle';
import NoDataTitle from '@srcRoot/components/NoDataTitle';

import { BuildBody, BuildFooter, BuildHeaders } from '../gridBuilder';
import Service, { constants } from '../common';
import { ReportLevel } from '@srcRoot/constants/report';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest';
import actions from '../actions';

const DataGrid = () => {
    const requestParam = useSelector((state) => state.requestParam);

    const gridData = useSelector((state) => state.gridData);
    const bodyData = gridData?.data;
    const totalData = gridData?.total;
    const summaryData = gridData?.summaryTotal;

    const { sendRequest } = useToggleRequest();

    if (!gridData) {
        return null;
    }

    const { fetchDrillDownData } = actions;
    const { TableSettings, DefaultPageOption } = constants;
    const { FromDate, ToDate, CurrencyId, CurrencyName, DrillDownLevel, PageIndex, PageSize } = requestParam;

    const contentTitle = Service.generateReportTitle(FromDate, ToDate, CurrencyId, CurrencyName);

    if (!gridData?.data.length) {
        return (
            <>
                <ReportTitle content={contentTitle} />
                <NoDataTitle />
            </>
        );
    }

    const onPaging = (index, pageSize) => {
        const params = { ...requestParam, PageIndex: index, PageSize: pageSize };
        sendRequest(() => fetchDrillDownData(params));
    };

    const options = {
        drillDownLevel: DrillDownLevel,
    };

    const footerData = {
        totalData: totalData,
        summaryData: summaryData,
    };

    const isPaging = options.drillDownLevel == ReportLevel.CUSTOMER;

    var currentPagingOption = {
        PageIndex: PageIndex ?? DefaultPageOption.PageIndex,
        PageSize: PageSize ?? DefaultPageOption.PageSize,
        TotalItem: bodyData.length,
        PageList: DefaultPageOption.PageList,
    };

    return (
        <>
            <ReportTitle content={contentTitle} />
            <Table
                minWidth={TableSettings.MinWidth}
                autoWidth={true}
                autoHeight={true}
                header={BuildHeaders(options)}
                body={BuildBody(bodyData, options)}
                footer={BuildFooter(footerData, options)}
                shouldResetScrollPosition={true}
                isPaging={isPaging}
                onPaging={onPaging}
                pageOption={currentPagingOption}
            />
        </>
    );
};

export default DataGrid;
