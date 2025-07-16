import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import BetListHelper from '@/helpers/betlistHelper';
import LangHelper from '@/helpers/langHelper';
import DataService from '@/lib/dataService';
import useToggleRequest from '@/hooks/useToggleRequest';

import { ActionCreators } from '../actions';
import { getBetListPageWithPageName } from './Pages';
import { HeaderCell, FooterRow } from '../customGrid';
import { TableSettings } from '../common/constants';

const DataGrid = (props) => {
    const dispatch = useDispatch();
    const [formData, gridData, requestParam] = useSelector((state) => [state.formData, state.gridData, state.requestParam], shallowEqual);

    const { sendRequest } = useToggleRequest();

    const { setRequestParam, setGridData } = ActionCreators;

    const getStartIndex = () => (requestParam.Page - 1) * requestParam.Rows;
    const getEndIndex = () => getStartIndex() + requestParam.Rows;

    const data = formData.isServerPaging ? gridData.rows : gridData.rows?.slice(getStartIndex(), getEndIndex());

    const onPaging = (index, size) => {
        if (formData.isServerPaging) {
            getData({ ...requestParam, Page: index, Rows: size });
            return;
        }

        dispatch(setRequestParam({ ...requestParam, Page: index, Rows: size }));
    };

    const onSort = (sortType, sortOrder) => {
        getData({
            ...requestParam,
            SortBy: getSortParam(sortType),
            SortType: sortType,
            SortOrder: sortOrder,
            Page: TableSettings.PageIndex,
            Rows: TableSettings.PageSize,
        });
    };

    const getSortParam = (sortBy) => {
        switch (sortBy) {
            case 'WinLoss':
                return 'Winlost';
            case 'ExternalId':
                return 'nickname';
            case 'SystemId':
                return 'UserName';
            default:
                return sortBy;
        }
    };

    const getData = (params) => {
        dispatch(setRequestParam(params));
        sendRequest(() => DataService.getBetListData(formData.url, params), updateGridData);
    };

    const updateGridData = (result) => {
        if (!result || !result.data) {
            dispatch(setFormData(null));

            return;
        }
        let { data } = result.data;
        if (!data) data = result.data; // use parent data instead of null children
        dispatch(setGridData(BetListHelper.loadBetListDataGrid(data, formData.isServerPaging)));
    };

    const getHeaderName = (column) => {
        if (column === 'LicenseeWL') {
            return `${LangHelper.getSingleResource('LicenseeW_L')}/${LangHelper.getSingleResource('Comm')}`;
        }

        if (column === 'WinLoss' && formData.isAllowedCustomerCommission) {
            return `${LangHelper.getSingleResource('WinLoss')}/${LangHelper.getSingleResource('Comm')}`;
        }

        if (column === 'Index') {
            return '#';
        }

        if (column === '') {
            return '';
        }

        return LangHelper.getSingleResource(column);
    };

    // Use page table with lazy load
    const Table = getBetListPageWithPageName(formData.pageName).Table;

    return (
        <div className="betlist-container">
            <Table
                onPaging={onPaging}
                getHeaderNameFunc={getHeaderName}
                data={data}
                total={gridData.userData}
                totalRows={gridData.totalRows}
                totalText={LangHelper.getSingleResource('GrandTotal')}
                onSort={onSort}
                getResourceFunc={(key) => LangHelper.getSingleResource(key)}
                adjustedHeight={-20}
                customHeaderCell={HeaderCell}
                customFooterRow={FooterRow}
            />
        </div>
    );
};

export default React.memo(DataGrid);
