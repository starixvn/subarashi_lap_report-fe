import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from '@legion-lib/react-grid';

import NoDataTitle from '@/components/NoDataTitle';
import ReportTitle from '@/components/ReportTitle';

import { BuildBody, BuildFooter, BuildHeaders } from '../gridUtility';
import Service from '../common';

const DataGrid = () => {
    const gridData = useSelector(state => state.gridData);
    const formData = useSelector(state => state.formData);
    const requestParam = useSelector(state => state.requestParam);

    if (!gridData || !gridData.data) {
        return null;
    }

    if (!gridData.data.length && !gridData.specialBetTypeResult.length) {
        return (
            <>
                <ReportTitle content={Service.generateReportTitle(requestParam.Date, requestParam.BaseCurrencyText, requestParam.ProductOptions)} />
                <NoDataTitle />
            </>
        );
    }

    const { isAllowedCustomerCommission } = formData;

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
            <ReportTitle content={Service.generateReportTitle(requestParam.Date, requestParam.BaseCurrencyText, requestParam.ProductOptions)} />
            <Table
                autoWidth={true}
                autoHeight={true}
                isPaging={true}
                header={BuildHeaders(isAllowedCustomerCommission)}
                body={BuildBody(gridData.data, gridData.columnCount, isAllowedCustomerCommission)}
                footer={BuildFooter(footerData, isAllowedCustomerCommission)}
                shouldResetScrollPosition={true}
            />
        </>
    );
};

export default React.memo(DataGrid);
