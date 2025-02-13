import React from 'react';
import { Row, HeaderRow } from '@legion-lib/react-grid';

import LangHelper from '@srcRoot/helpers/langHelper';

import MatchCell from './customGrid/MatchCell';
import HeaderCell from './customGrid/HeaderCell';
import CommonCells from './customGrid/CommonCells';

export const BuildBody = (data) => {
    return data.map((item) => {
        return (
            <Row key={`row-sport-${item.matchId}`}>
                <MatchCell data={item} />
                <CommonCells data={item} />
            </Row>
        );
    });
};

export const BuildHeaders = (options) => {
    const result = [BuildFirstRow(options)];
    if (options.isAllowedCustomerCommission) {
        result.push(BuildSecondRow());
    }

    return result;
};

const BuildFirstRow = ({ isAllowedCustomerCommission, hasAmountDueToColumn }) => (
    <HeaderRow style={{ height: 23 }} key="header1">
        <HeaderCell className="first-header-cell" rowSpan="2" colWidth={600} key="FirstColumn">
            {LangHelper.getSingleResource('Match')}
        </HeaderCell>
        <HeaderCell
            rowSpan={isAllowedCustomerCommission ? 1 : 2}
            colWidth={200}
            colSpan={isAllowedCustomerCommission ? 3 : 1}
            sortBy={isAllowedCustomerCommission ? null : 'CustomerWinLoss'}
            key="CustomerWinloss">
            {LangHelper.getSingleResource('CustomerW_L')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={200} key="Turnover" sortBy="TurnOver">
            {LangHelper.getSingleResource('Turnover')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={200} key="BetCount" sortBy="BetCount">
            {LangHelper.getSingleResource('BetCount')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={300} key="LicenseeW_L" sortBy="LicenseeWinLoss">
            {LangHelper.getSingleResource('LicenseeW_L')}
        </HeaderCell>
        {hasAmountDueToColumn && (
            <HeaderCell rowSpan="2" colWidth={200} key="BACommission" sortBy="AmountDue">
                {LangHelper.getSingleResource('AmountDueTo')}
            </HeaderCell>
        )}
    </HeaderRow>
);

const BuildSecondRow = () => (
    <HeaderRow style={{ height: 23 }} key="header2">
        <HeaderCell colWidth={200} key="CusWinLoss" sortBy="CustomerWinLoss">
            {LangHelper.getSingleResource('WinLoss')}
        </HeaderCell>
        <HeaderCell colWidth={200} key="Commission" sortBy="CustomerComm">
            {LangHelper.getSingleResource('Comm')}
        </HeaderCell>
        <HeaderCell colWidth={200} key="CusTotal" sortBy="CustomerTotal">
            {LangHelper.getSingleResource('Total')}
        </HeaderCell>
    </HeaderRow>
);
