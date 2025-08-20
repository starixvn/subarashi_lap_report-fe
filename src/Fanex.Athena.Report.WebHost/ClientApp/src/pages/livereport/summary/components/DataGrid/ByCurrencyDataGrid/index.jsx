import React from 'react';
import { useSelector } from 'react-redux';

import { LiveReportTable } from '../../../gridUltility';
import LangHelper from '@/helpers/langHelper';
import { BuildByCurrencyBody, BuildByCurrencyHeaders } from './GridBuilder';

const ByCurrencyDataGrid = () => {
    const gridData = useSelector(state => state.gridData?.dataByCurrency);
    const formData = useSelector(state => state.formData);
    const selectedProductCode = useSelector(state => state.selectedProductCode);

    const options = {
        hasAmountDueToColumn: formData.hasAmountDueToColumn,
        isAllowedCustomerCommission: formData.isAllowedCustomerCommission,
    };

    if (!selectedProductCode || !gridData || !gridData.length) {
        return null;
    }

    return (
        <LiveReportTable
            tableTitle={LangHelper.getSingleResource('ByCurrency')}
            header={BuildByCurrencyHeaders(options)}
            body={BuildByCurrencyBody(gridData)}
        />
    );
};

export default ByCurrencyDataGrid;
