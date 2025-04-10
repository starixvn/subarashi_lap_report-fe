import React from 'react';
import { HeaderRow, HeaderCell } from '@legion-lib/react-grid';

import LangHelper from '@/helpers/langHelper';

export const BuildHeaders = (hasCustomerComm) => {
    const result = [BuildFirstRow(hasCustomerComm)];
    if (hasCustomerComm) {
        result.push(BuildSecondRow());
    }

    return result;
};

const BuildFirstRow = (hasCustomerComm) => (
    <HeaderRow style={{ height: 23 }} key="header1">
        <HeaderCell rowSpan="2" colWidth={100} key="Index1">
            #
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={500} key="Match">
            {LangHelper.getSingleResource('Match')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={200} key="Turnover">
            {LangHelper.getSingleResource('Turnover')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={200} key="TotalTransaction">
            {LangHelper.getSingleResource('TotalTransaction')}
        </HeaderCell>
        <HeaderCell rowSpan={hasCustomerComm ? 1 : 2} colWidth={200} colSpan={hasCustomerComm ? 3 : 1} key="CustomerWinloss">
            {LangHelper.getSingleResource('CustomerW_L')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={200} key="LicenseeW_L">
            {LangHelper.getSingleResource('LicenseeW_L')}
        </HeaderCell>
    </HeaderRow>
);

const BuildSecondRow = () => (
    <HeaderRow style={{ height: 23 }} key="header2">
        <HeaderCell colWidth={200} key="CusWinLoss">
            {LangHelper.getSingleResource('WinLoss')}
        </HeaderCell>
        <HeaderCell colWidth={200} key="Commission">
            {LangHelper.getSingleResource('Commission')}
        </HeaderCell>
        <HeaderCell colWidth={200} key="CusTotal">
            {LangHelper.getSingleResource('Total')}
        </HeaderCell>
    </HeaderRow>
);
