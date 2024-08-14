import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from '@legion-lib/react-grid';

import ReportTitle from '@srcRoot/components/ReportTitle';
import NoDataTitle from '@srcRoot/components/NoDataTitle';

import { BuildBody, BuildFooter, BuildHeaders } from '../gridBuilder';
import Service, { constants } from '../common';
import GridBreadcrumb from './GridBreadcrumb';

const DataGrid = () => {
    const requestParam = useSelector((state) => state.requestParam);

    const gridData = useSelector((state) => state.gridData);
    const bodyData = gridData?.data;
    const totalData = gridData?.total;
    const summaryData = gridData?.summaryTotal;

    if (!gridData) {
        return null;
    }

    const { TableSettings } = constants;
    const { FromDate, ToDate, CurrencyId, CurrencyName, DrillDownLevel } = requestParam;

    const contentTitle = Service.generateReportTitle(FromDate, ToDate, CurrencyId, CurrencyName);

    if (!gridData?.data.length) {
        return (
            <>
                <ReportTitle content={contentTitle} />
                <NoDataTitle />
            </>
        );
    }

    const options = {
        drillDownLevel: DrillDownLevel,
    };

    const footerData = {
        totalData: totalData,
        summaryData: summaryData,
    };

    return (
        <>
            <GridBreadcrumb />
            <ReportTitle content={contentTitle} />
            <Table
                minWidth={TableSettings.MinWidth}
                autoWidth={true}
                autoHeight={true}
                header={BuildHeaders(options)}
                body={BuildBody(bodyData, options)}
                footer={BuildFooter(footerData, options)}
                shouldResetScrollPosition={true}
            />
        </>
    );
};

export default DataGrid;
