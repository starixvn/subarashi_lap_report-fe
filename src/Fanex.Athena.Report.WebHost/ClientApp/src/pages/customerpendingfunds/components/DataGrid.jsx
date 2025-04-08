import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '@legion-lib/react-grid';

import NoDataTitle from '@/components/NoDataTitle';

import Service, { constants } from '../common';
import { BuildBody, BuildFooter, BuildHeader } from '../gridBuilder';
import { DefaultPageOption } from '../common/tableSetting';
import DataService from '@/lib/dataService';

import { ActionCreators } from '../actions';
import useToggleRequest from '@/hooks/useToggleRequest';

const DataGrid = (props) => {
    const dispatch = useDispatch();

    const gridData = useSelector((state) => state.gridData);
    const formData = useSelector((state) => state.formData);
    const requestParam = useSelector((state) => state.requestParam);
    const gridSettings = useSelector((state) => state.gridSettings);

    const { sendRequest } = useToggleRequest();

    if (!gridData) {
        return null;
    }

    const { isFakeLicensee } = formData;
    const { PageIndex, PageSize } = requestParam;

    const { ApiUrl, TableSettings } = constants;
    const { setRequestParam, setGridData, setGridSettings } = ActionCreators;

    if (!gridData.data.length) {
        return <NoDataTitle />;
    }

    const onPaging = (index, pageSize) => {
        const params = { ...requestParam, PageIndex: index, PageSize: pageSize };
        sendRequest(() => DataService.postReportData(ApiUrl.DATA_URL, params), updateGridData);
        dispatch(setRequestParam(params));
    };

    const onSort = (sortBy, sortOrderBy) => {
        const orderItem = Service.getOrderItem(sortBy);
        const params = { ...requestParam, OrderItem: orderItem, IsAscSort: Service.isAscSort(sortOrderBy) };

        sendRequest(() => DataService.postReportData(ApiUrl.DATA_URL, params), updateGridData);
        dispatch(setRequestParam(params));
        dispatch(setGridSettings({ sortBy: sortBy, sortOrderBy: sortOrderBy }));
    };

    const updateGridData = (result) => {
        if (result && result.data !== null) {
            dispatch(setGridData(result.data));
            return;
        }

        dispatch(setGridData(null));
    };

    const options = {
        isFakeLicensee: isFakeLicensee,
    };

    const pageOption = {
        PageList: DefaultPageOption.PageList,
        PageIndex: PageIndex,
        PageSize: PageSize,
        TotalItem: gridData.totalRows,
    };

    return (
        <Table
            isPaging={true}
            onPaging={onPaging}
            onSort={onSort}
            pageOption={pageOption}
            minWidth={TableSettings.MinWidth}
            autoWidth={true}
            header={BuildHeader(gridSettings.sortBy, options)}
            body={BuildBody(gridData.data, options)}
            footer={BuildFooter(gridData.total, options)}
            containerPadding={30}
            shouldResetScrollPosition={true}
        />
    );
};

export default React.memo(DataGrid);
