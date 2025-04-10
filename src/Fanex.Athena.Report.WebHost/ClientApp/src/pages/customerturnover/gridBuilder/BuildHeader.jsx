import React from 'react';
import { HeaderRow, HeaderCell } from '@legion-lib/react-grid';

import LangHelper from '@/helpers/langHelper';

export const BuildHeaders = (options) => {
    const result = [BuildFirstRow(options)];
    if (options.isAllowedCustomerCommission) {
        result.push(BuildSecondRow());
    }

    return result;
};

const BuildFirstRow = ({ isAllowedCustomerCommission }) => (
    <HeaderRow style={{ height: 23 }} key="header1">
        <HeaderCell rowSpan="2" colWidth={200} className="first-header-cell" key="#">
            #
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={350} key="Date">
            {LangHelper.getSingleResource('Date')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={500} key="ExternalId">
            {LangHelper.getSingleResource('ExternalId')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={500} key="SystemId">
            {LangHelper.getSingleResource('SystemId')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={300} key="Currency">
            {LangHelper.getSingleResource('Currency')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={500} key="Sport">
            {LangHelper.getSingleResource('Sport')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={600} key="BetType">
            {LangHelper.getSingleResource('BetType')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={500} key="EffectiveBettingValue">
            {LangHelper.getSingleResource('EffectiveBettingValue')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={400} key="TotalTransaction">
            {LangHelper.getSingleResource('TotalTransaction')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={400} key="Turnover">
            {LangHelper.getSingleResource('Turnover')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={500} key="TotalTurnover">
            {LangHelper.getSingleResource('TotalTurnover')}
        </HeaderCell>
        <HeaderCell rowSpan={isAllowedCustomerCommission ? 1 : 2} colWidth={400} colSpan={isAllowedCustomerCommission ? 3 : 1} key="CustomerWinloss">
            {LangHelper.getSingleResource('CustomerW_L')}
        </HeaderCell>
    </HeaderRow>
);

const BuildSecondRow = () => (
    <HeaderRow style={{ height: 23 }} key="header2">
        <HeaderCell colWidth={400} key="CusWinLoss">
            {LangHelper.getSingleResource('WinLoss')}
        </HeaderCell>
        <HeaderCell colWidth={300} key="Commission">
            {LangHelper.getSingleResource('Comm')}
        </HeaderCell>
        <HeaderCell colWidth={400} key="CusTotal">
            {LangHelper.getSingleResource('Total')}
        </HeaderCell>
    </HeaderRow>
);
