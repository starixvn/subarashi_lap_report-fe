import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '@legion-lib/react-grid';

import NoDataTitle from '@srcRoot/components/NoDataTitle';
import ReportTitle from '@srcRoot/components/ReportTitle';
import DataService from '@srcRoot/lib/dataService';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest';

import { BuildBody, BuildFooter, BuildHeaders, GenerateReportTitle, GetDefaultPagingOptions } from '../gridUtility';
import { ActionCreators } from '../actions/index';
import Service, { constants } from '../common';

const DataGrid = (props) => {
    const { ApiUrl, TableSettings } = constants;
    const { setRequestParam, setGridData } = ActionCreators;

    const dispatch = useDispatch();
    const gridData = useSelector((state) => state.gridData);
    const formData = useSelector((state) => state.formData);
    const requestParam = useSelector((state) => state.requestParam);

    const { sendRequest } = useToggleRequest();

    if (!gridData) {
        return null;
    }

    if (!gridData.data.length) {
        return (
            <>
                <ReportTitle content={GenerateReportTitle(requestParam.FromDate, requestParam.ToDate, requestParam.CurrencyName)} />
                <NoDataTitle />
            </>
        );
    }

    const { isAllowedCustomerCommission, isEnableBA, isEnableSingleWallet } = formData;

    const totalSpan = gridData.data[0].systemId ? 3 : 2;

    const onPaging = (index, pageSize) => {
        const params = { ...requestParam, PageIndex: index };
        sendRequest(() => DataService.postReportData(ApiUrl.DATA_URL, params), updateGridData);
        dispatch(setRequestParam(params));
    };

    const onSort = (sortBy, sortOrderBy) => {
        const orderItem = Service.getOrderItem(sortBy, sortOrderBy);
        if (orderItem == requestParam.OrderItem) {
            return;
        }

        const params = { ...requestParam, OrderItem: orderItem };
        sendRequest(() => DataService.postReportData(ApiUrl.DATA_URL, params), updateGridData);
        dispatch(setRequestParam(params));
    };

    const updateGridData = (result) => {
        if (result && result.data !== null) {
            dispatch(setGridData(result.data));
            return;
        }

        dispatch(setGridData(null));
    };

    return (
        <>
            <ReportTitle content={GenerateReportTitle(requestParam.FromDate, requestParam.ToDate, requestParam.CurrencyName)} />
            <Table
                minWidth={TableSettings.MinWidth}
                autoWidth={true}
                autoHeight={true}
                isPaging={true}
                onSort={onSort}
                onPaging={onPaging}
                pageOption={GetDefaultPagingOptions(requestParam.PageIndex, gridData.totalRows)}
                header={BuildHeaders(isEnableSingleWallet, isAllowedCustomerCommission, isEnableBA)}
                body={BuildBody(gridData.data, isEnableSingleWallet, isAllowedCustomerCommission, isEnableBA)}
                footer={BuildFooter(gridData.total, totalSpan, isEnableSingleWallet, isAllowedCustomerCommission, isEnableBA)}
                containerPadding={30}
                shouldResetScrollPosition={true}
            />
        </>
    );
};

export default React.memo(DataGrid);
