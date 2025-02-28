import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Table } from '@legion-lib/react-grid';

import ReportTitle from '@/components/ReportTitle';
import NoDataTitle from '@/components/NoDataTitle';

import { BuildBody, BuildFooter, BuildHeaders } from '../gridBuilder';
import actions from '../actions';
import Service, { constants } from '../common';
import GridBreadcrumb from './GridBreadcrumb';

const DataGrid = () => {
    const dispatch = useDispatch();
    const gridSettings = useSelector((state) => state.gridSettings);
    const formData = useSelector((state) => state.formData);
    const requestParam = useSelector((state) => state.requestParam);

    const gridData = useSelector((state) => state.gridData);
    const bodyData = gridData?.data;
    const totalData = gridData?.total;
    const summaryData = gridData?.summaryTotal;

    const { setGridSettings, toggleLoader } = actions;
    const { DefaultPageOption, TableSettings, DrillDownLevel } = constants;
    const [pageIndex, setPageIndex] = useState(DefaultPageOption.PageIndex);
    const [pageSize, setPageSize] = useState(DefaultPageOption.PageSize);
    const [uniqueId, setUniqueId] = useState(uuidv4());

    useEffect(() => {
        // When reset table
        if (!gridSettings.selectedSortKey) {
            setUniqueId(uuidv4());
        }
    }, [gridSettings.selectedSortKey]);

    if (!gridData) {
        return null;
    }

    const contentTitle = Service.generateReportTitle(
        requestParam.FromDate,
        requestParam.ToDate,
        requestParam.CurrencyId,
        requestParam.CurrencyName,
        requestParam.Username,
    );

    if (!gridData?.data.length) {
        return (
            <>
                <ReportTitle content={contentTitle} />
                <NoDataTitle />
            </>
        );
    }

    const isPaging = gridSettings.DrillDownLevel === DrillDownLevel.Customer;

    const options = {
        hasCustomerComm: formData.isAllowedCustomerCommission,
        drillDownLevel: gridSettings.drillDownLevel,
        selectedSortKey: gridSettings.selectedSortKey,
        selectedOrderBy: gridSettings.selectedOrderBy,
        uniqueId: uniqueId,
    };

    var currentPagingOption = {
        PageIndex: pageIndex,
        PageSize: pageSize,
        TotalItem: bodyData.length,
        PageList: DefaultPageOption.PageList,
    };

    const footerData = {
        totalData: totalData,
        summaryData: summaryData,
    };

    const onSort = (sortBy, sortOrder) => {
        dispatch(
            setGridSettings({
                ...gridSettings,
                selectedSortKey: sortBy,
                selectedOrderBy: sortOrder,
            }),
        );
        dispatch(toggleLoader(false));
    };

    const onPaging = (index, size) => {
        setPageIndex(index);
        setPageSize(size);
        dispatch(toggleLoader(false));
    };

    return (
        <>
            <GridBreadcrumb />
            <ReportTitle content={contentTitle} />
            <Table
                key={uniqueId}
                minWidth={TableSettings.MinWidth}
                autoWidth={true}
                autoHeight={true}
                header={BuildHeaders(options)}
                body={BuildBody(bodyData, options)}
                footer={BuildFooter(footerData, options)}
                onSort={onSort}
                onPaging={onPaging}
                isPaging={isPaging}
                pageOption={currentPagingOption}
                shouldResetScrollPosition={true}
            />
        </>
    );
};

export default DataGrid;
