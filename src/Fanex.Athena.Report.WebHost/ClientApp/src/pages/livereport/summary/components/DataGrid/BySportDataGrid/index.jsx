import React from 'react';
import { useSelector } from 'react-redux';

import { LiveReportTable } from '../../../gridUltility';
import LangHelper from '@/helpers/langHelper';
import { BuildBySportBody, BuildBySportHeaders } from './GridBuilder';

function BySportDataGrid() {
    const gridData = useSelector((state) => state.gridData?.dataBySport);
    const isShowedDetailLink = useSelector((state) => state.gridData.isShowedDetailLink);

    const formData = useSelector((state) => state.formData);
    const selectedProductCode = useSelector((state) => state.selectedProductCode);

    const options = {
        isAllowedCustomerCommission: formData.isAllowedCustomerCommission,
        isAllowBa: formData.isAllowBa,
        hasAmountDueToColumn: formData.hasAmountDueToColumn,
    };

    if (!selectedProductCode || !gridData || !gridData.length) {
        return;
    }

    return (
        <LiveReportTable
            tableTitle={LangHelper.getSingleResource('BySportsType')}
            header={BuildBySportHeaders(options)}
            body={BuildBySportBody(gridData, isShowedDetailLink)}
        />
    );
}

export default BySportDataGrid;
