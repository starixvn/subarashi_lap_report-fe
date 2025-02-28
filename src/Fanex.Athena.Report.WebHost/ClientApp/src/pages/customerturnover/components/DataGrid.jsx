import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from '@legion-lib/react-grid';

import DataService from '@/lib/dataService';
import useToggleRequest from '@/hooks/useToggleRequest';

import ReportTitle from '@/components/ReportTitle';
import NoDataTitle from '@/components/NoDataTitle';

import Service, { constants } from '../common';
import { BuildBody, BuildFooter, BuildHeaders } from '../gridBuilder';
import { DefaultPagingOption } from '../common/filterSettings';
import { ApiUrl } from '../common/apiSettings';
import ActionCreators from '../actions';

function DataGrid() {
    const formData = useSelector((state) => state.formData);
    const requestParam = useSelector((state) => state.requestParam);
    const gridData = useSelector((state) => state.gridData);
    const { sendRequest } = useToggleRequest();
    const dispatch = useDispatch();
    const { setGridData, setRequestParam } = ActionCreators;

    if (!gridData || !requestParam) {
        return null;
    }

    const { FromDate, ToDate, CurrencyName, Odds, UserName } = requestParam;

    if (!gridData.data?.length) {
        return (
            <>
                <ReportTitle content={Service.generateReportTitle(FromDate, ToDate, CurrencyName, Odds, UserName)} />
                <NoDataTitle />
            </>
        );
    }

    const { TableSettings } = constants;

    const options = {
        isAllowedCustomerCommission: formData.isAllowedCustomerCommission,
        reportBy: requestParam.ReportBy,
    };

    const currenPagingOption = {
        PageIndex: requestParam.PageIndex,
        PageSize: requestParam.PageSize,
        TotalItem: gridData.totalRow,
        PageList: DefaultPagingOption.PageList,
    };

    const onPaging = (pageIndex, pageSize) => {
        const params = { ...requestParam, PageSize: pageSize, PageIndex: pageIndex };
        sendRequest(() => DataService.postReportData(ApiUrl.DATA_URL, params), updateData);
        dispatch(setRequestParam(params));
    };

    const updateData = (result) => {
        let gridData = null;
        if (result && result.data !== null) {
            gridData = result.data;
        }

        dispatch(setGridData(gridData));
    };

    return (
        <>
            <ReportTitle content={Service.generateReportTitle(FromDate, ToDate, CurrencyName, Odds, UserName)} />
            <Table
                minWidth={TableSettings.MinWidth}
                header={BuildHeaders(options)}
                body={BuildBody(gridData.data, options)}
                footer={BuildFooter(gridData.totalData, options)}
                containerPadding={30}
                shouldResetScrollPosition={true}
                isPaging={true}
                pageOption={currenPagingOption}
                onPaging={onPaging}
            />
        </>
    );
}

export default DataGrid;
