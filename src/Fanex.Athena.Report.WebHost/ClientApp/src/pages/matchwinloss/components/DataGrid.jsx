import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from '@legion-lib/react-grid';

import NoDataTitle from '@srcRoot/components/NoDataTitle';
import ReportTitle from '@srcRoot/components/ReportTitle';

import { BuildBody, BuildFooter, BuildHeaders } from '../gridUtility';
import Service from '../common';

const DataGrid = (props) => {
    const gridData = useSelector((state) => state.gridData);
    const formData = useSelector((state) => state.formData);
    const requestParam = useSelector((state) => state.requestParam);

    if (!gridData || !gridData.data) {
        return;
    }

    if (!gridData.data.length && !gridData.specialBetTypeResult.length) {
        return (
            <>
                <ReportTitle content={Service.generateReportTitle(requestParam.Date, requestParam.BaseCurrency, requestParam.ProductOptions)} />
                <NoDataTitle />
            </>
        );
    }

    const { isAllowedCustomerCommission, isEnableBA } = formData;

    const footerData = {
        isShowTotal: gridData.data.length > 0,
        isShowSpecialBetTypeResult: gridData.specialBetTypeResult.length > 0,
        total: gridData.total,
        grandTotal: gridData.grandTotal,
        specialBetTypeResult: gridData.specialBetTypeResult,
        totalSpan: 2,
    };

    return (
        <>
            <ReportTitle content={Service.generateReportTitle(requestParam.Date, requestParam.BaseCurrency, requestParam.ProductOptions)} />
            <Table
                autoWidth={true}
                autoHeight={true}
                isPaging={true}
                header={BuildHeaders(isAllowedCustomerCommission, isEnableBA)}
                body={BuildBody(gridData.data, gridData.columnCount, isAllowedCustomerCommission, isEnableBA)}
                footer={BuildFooter(footerData, isAllowedCustomerCommission, isEnableBA)}
                shouldResetScrollPosition={true}
            />
        </>
    );
};

export default React.memo(DataGrid);
