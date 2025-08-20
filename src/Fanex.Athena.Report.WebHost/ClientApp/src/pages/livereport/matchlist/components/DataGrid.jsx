import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '@legion-lib/react-grid';

import useToggleRequest from '@/hooks/useToggleRequest';
import ReportTitle from '@/components/ReportTitle';
import NoDataTitle from '@/components/NoDataTitle';
import DataService from '@/lib/dataService';

import Service, { constants } from '../common';
import { BuildBody, BuildHeaders } from '../gridBuilder';
import { ActionCreators } from '../actions';

const DataGrid = () => {
    const [searchParams] = useSearchParams();

    const dispatch = useDispatch();
    const formData = useSelector(state => state.formData);
    const gridData = useSelector(state => state.gridData);
    const requestParam = useSelector(state => state.requestParam);

    const { sendRequest } = useToggleRequest();
    const { setGridData } = ActionCreators;

    if (!gridData) {
        return null;
    }

    const baseCurrencyText = searchParams.get('BaseCurrency') ? searchParams.get('BaseCurrency') : searchParams.get('CurrencyName');

    if (!gridData.length) {
        return (
            <>
                <ReportTitle content={Service.generateReportTitle(searchParams.get('ProductName'), baseCurrencyText)} />
                <NoDataTitle />
            </>
        );
    }

    const { ApiUrl } = constants;

    const onSort = (sortBy, sortOrderBy) => {
        const params = {
            ...requestParam,
            SortColumn: sortBy,
            SortDirection: sortOrderBy,
        };
        sendRequest(() => fetchReportData(params), updateGridData);
    };

    const fetchReportData = async params => {
        const response = await DataService.getReportData(ApiUrl.DATA_URL, params);

        return response.data;
    };

    const updateGridData = result => {
        if (result) {
            dispatch(setGridData(result));
            return;
        }

        dispatch(setGridData(null));
    };

    return (
        <>
            <ReportTitle content={Service.generateReportTitle(searchParams.get('ProductName'), baseCurrencyText)} />
            <Table
                autoWidth={true}
                autoHeight={false}
                bodyHeight="100%"
                isIncludeScrollWidth={false}
                onSort={onSort}
                header={BuildHeaders(formData)}
                body={BuildBody(gridData)}
                containerPadding={30}
                shouldResetScrollPosition={true}
            />
        </>
    );
};

export default DataGrid;
