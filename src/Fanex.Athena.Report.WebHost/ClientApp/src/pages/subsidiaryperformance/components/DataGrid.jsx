import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from '@legion-lib/react-grid';

import ReportTitle from '@/components/ReportTitle';
import NoDataTitle from '@/components/NoDataTitle';

import { BuildBody, BuildFooter, BuildHeaders } from '../gridBuilder';
import Service from '../common';
import GridBreadcrumb from './GridBreadcrumb';

const DataGrid = () => {
    const formData = useSelector(state => state.formData);
    const requestParam = useSelector(state => state.requestParam);

    const gridData = useSelector(state => state.gridData);
    const bodyData = gridData?.data;
    const totalData = gridData?.total;
    const grandTotalData = gridData?.grandTotal;

    if (!gridData) {
        return null;
    }

    const contentTitle = Service.generateReportTitle(requestParam.FromDate, requestParam.ToDate, requestParam.BaseCurrency);

    if (!bodyData.length) {
        return (
            <>
                <ReportTitle content={contentTitle} />
                <NoDataTitle />
            </>
        );
    }

    const options = {
        drillDownLevel: requestParam.DrillDownLevel,
        baseCurrency: requestParam.BaseCurrency,
        viewType: formData.viewType,
    };

    const footerData = {
        totalData: totalData,
        grandTotalData: grandTotalData,
    };

    return (
        <>
            <GridBreadcrumb />
            <ReportTitle content={contentTitle} />
            <Table
                autoWidth={true}
                autoHeight={true}
                shouldResetScrollPosition={true}
                header={BuildHeaders(options)}
                body={BuildBody(bodyData, options)}
                footer={BuildFooter(footerData, options)}
            />
        </>
    );
};

export default DataGrid;
