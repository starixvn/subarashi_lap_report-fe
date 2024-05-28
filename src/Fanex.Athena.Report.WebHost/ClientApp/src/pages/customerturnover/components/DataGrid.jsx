import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from '@legion-lib/react-grid';

import ReportTitle from '@srcRoot/components/ReportTitle';
import NoDataTitle from '@srcRoot/components/NoDataTitle';

import Service, { constants } from '../common';
import { BuildBody, BuildFooter, BuildHeaders } from '../gridBuilder';

function DataGrid() {
    const formData = useSelector((state) => state.formData);
    const requestParam = useSelector((state) => state.requestParam);
    const gridData = useSelector((state) => state.gridData);

    if (!gridData || !requestParam) {
        return null;
    }

    const { FromDate, ToDate, CurrencyName, Odds } = requestParam;

    if (!gridData.data?.length) {
        return (
            <>
                <ReportTitle content={Service.generateReportTitle(FromDate, ToDate, CurrencyName, Odds)} />
                <NoDataTitle />
            </>
        );
    }

    const { TableSettings } = constants;

    const options = { isAllowedCustomerCommission: formData.isAllowedCustomerCommission };

    return (
        <>
            <ReportTitle content={Service.generateReportTitle(FromDate, ToDate, CurrencyName, Odds)} />
            <Table
                minWidth={TableSettings.MinWidth}
                header={BuildHeaders(options)}
                body={BuildBody(gridData.data, options)}
                footer={BuildFooter(gridData.totalData, options)}
                containerPadding={30}
                shouldResetScrollPosition={true}
            />
        </>
    );
}

export default DataGrid;
