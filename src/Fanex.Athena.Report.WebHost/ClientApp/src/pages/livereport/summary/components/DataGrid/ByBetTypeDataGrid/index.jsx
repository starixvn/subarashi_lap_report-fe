import React from 'react';
import { useSelector } from 'react-redux';

import { LiveReportTable } from '../../../gridUltility';
import LangHelper from '@/helpers/langHelper';
import { BuildByBetTypeBody, BuildByBetTypeHeaders } from './GridBuilder';

function ByBetTypeDataGrid() {
    const gridData = useSelector(state => state.gridData?.dataByBetType);
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
            tableTitle={LangHelper.getSingleResource('ByBetType')}
            header={BuildByBetTypeHeaders(options)}
            body={BuildByBetTypeBody(gridData, options)}
        />
    );
}

export default ByBetTypeDataGrid;
