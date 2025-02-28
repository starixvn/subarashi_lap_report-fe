import React from 'react';
import { HeaderRow, HeaderCell } from '@legion-lib/react-grid';

import LangHelper from '@/helpers/langHelper';

export const BuildHeaders = (tableTitle, options) => {
    const result = [BuildFirstRow(tableTitle, options)];
    if (options.isAllowedCustomerCommission) {
        result.push(BuildSecondRow());
    }

    return result;
};

const BuildFirstRow = (firstColumnHeader, { isAllowedCustomerCommission, isAllowBa, hasAmountDueToColumn }) => (
    <HeaderRow style={{ height: 23 }} key="header1">
        <HeaderCell className="first-header-cell" rowSpan="2" colWidth={200} key="FirstColumn">
            {firstColumnHeader}
        </HeaderCell>
        <HeaderCell
            rowSpan={isAllowedCustomerCommission ? 1 : 2}
            colWidth={isAllowedCustomerCommission ? 600 : 200}
            colSpan={isAllowedCustomerCommission ? 3 : 1}
            key="CustomerWinloss">
            {LangHelper.getSingleResource('CustomerW_L')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={300} key="Turnover">
            {LangHelper.getSingleResource('Turnover')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={200} key="BetCount">
            {LangHelper.getSingleResource('BetCount')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={300} key="LicenseeW_L">
            {LangHelper.getSingleResource('LicenseeW_L')}
        </HeaderCell>
        {isAllowBa && (
            <HeaderCell rowSpan="2" colWidth={200} key="BACommission">
                {LangHelper.getSingleResource('Comm')}
            </HeaderCell>
        )}
        {hasAmountDueToColumn && (
            <HeaderCell rowSpan="2" colWidth={200} key="BACommission">
                {LangHelper.getSingleResource('AmountDueTo')}
            </HeaderCell>
        )}
    </HeaderRow>
);

const BuildSecondRow = () => (
    <HeaderRow style={{ height: 23 }} key="header2">
        <HeaderCell colWidth={200} key="CusWinLoss">
            {LangHelper.getSingleResource('WinLoss')}
        </HeaderCell>
        <HeaderCell colWidth={200} key="Commission">
            {LangHelper.getSingleResource('Comm')}
        </HeaderCell>
        <HeaderCell colWidth={200} key="CusTotal">
            {LangHelper.getSingleResource('Total')}
        </HeaderCell>
    </HeaderRow>
);
