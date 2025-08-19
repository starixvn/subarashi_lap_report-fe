import React, { memo, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { Table } from '@legion-lib/react-grid';

import NoDataTitle from '@/components/NoDataTitle';
import ReportTitle from '@/components/ReportTitle';

import { renderHeader, renderDataSection, renderFooter } from '../../common/gridUtils';
import { BreakdownByMode, DefaultPagingOption, GroupByMode, SortOrder } from '../../common/constants.js';
import { ActionCreators } from '../../actions/index.js';
import ExcelPopUp from '../ExcelPopUp.jsx';

export const DataGrid = () => {
    const [requestParam, reportData, reportTitle, reloadReport] = useSelector(
        state => [state.requestParam, state.reportData, state.reportTitle, state.reloadReport],
        shallowEqual
    );

    const { setRequestParam, toggleLoader, getReportData } = ActionCreators;
    const dispatch = useDispatch();
    const { data, sumTotal, totalRow } = reportData;
    const renderOption = {
        isGroupByPlayerMode: requestParam.GroupMode === GroupByMode.Player,
        isBreakDownPlayerMode: requestParam.BreakdownMode === BreakdownByMode.Player,
    };

    const header = useMemo(() => renderHeader(renderOption), [requestParam]);
    const body = useMemo(() => renderDataSection(data, renderOption), [data]);
    const footer = useMemo(() => renderFooter(sumTotal, renderOption), [sumTotal]);

    const currenPagingOption = {
        PageIndex: requestParam.PageIndex,
        PageSize: requestParam.PageSize,
        TotalItem: totalRow,
        PageList: DefaultPagingOption.PageList,
    };

    const submitRequest = params => {
        dispatch(setRequestParam(params));
        dispatch(toggleLoader(true));
        dispatch(getReportData(params));
    };

    const onSort = (sortBy, sortOrder) => {
        const requestSortOrder = sortOrder === 'asc' ? SortOrder.ASC : SortOrder.DESC;
        const params = { ...requestParam, SortBy: sortBy, SortOrder: requestSortOrder };
        submitRequest(params);
    };

    const onPaging = (pageIndex, pageSize) => {
        const params = { ...requestParam, PageSize: pageSize, PageIndex: pageIndex };
        submitRequest(params);
    };

    const reportTitleContent = (
        <>
            <span className="flex-auto">{reportTitle}</span>
            <ExcelPopUp />
        </>
    );

    if (!data) {
        return null;
    }

    if (!data.length) {
        return <NoDataTitle />;
    }
    return (
        <div className="result-content">
            <ReportTitle content={reportTitleContent} tag="div" />
            <Table
                key={`table-winloss-ananlysis-${requestParam.SubmitTime}`}
                minWidth={650}
                autoWidth={true}
                autoHeight={true}
                header={header}
                body={body}
                footer={footer}
                containerPadding={30}
                onSort={onSort}
                isPaging={true}
                pageOption={currenPagingOption}
                shouldResetScrollPosition={reloadReport}
                onPaging={onPaging}
            />
        </div>
    );
};

export default memo(DataGrid);
