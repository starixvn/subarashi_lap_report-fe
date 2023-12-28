import React from 'react';

import LangHelper from '@srcRoot/helpers/langHelper';

import HeaderCell from '../customGrid/HeaderCell';
import HeaderRow from '../customGrid/HeaderRow';
import { constants } from '../common';

export const BuildHeaders = (isEnableSingleWallet, hasCustomerComm, isAllowBA) => {
    const firstRow = BuildFirstRow(isEnableSingleWallet, hasCustomerComm, isAllowBA);
    const secondRow = BuildSecondRow(hasCustomerComm, isAllowBA);

    const result = [firstRow];
    if (secondRow.props.children && secondRow.props.children.length > 0) {
        result.push(secondRow);
    }

    return result;
};

const BuildFirstRow = (isEnableSingleWallet, hasCustomerComm, isAllowBA) => (
    <HeaderRow style={{ height: 23 }} key="header1" defaultSelectedHeaderKey={constants.SortKeys.Deposit}>
        <HeaderCell rowSpan="2" colWidth={70} key="Index">
            #
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={240} key="ExternalID">
            {LangHelper.getSingleResource('ExternalId')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={240} key="SystemId">
            {LangHelper.getSingleResource('SystemId')}
        </HeaderCell>
        {!isEnableSingleWallet && (
            <HeaderCell rowSpan="2" colWidth={180} key="OpeningBalance" lockArrow="desc" sortBy={constants.SortKeys.OpeningBalance}>
                {LangHelper.getSingleResource('OpeningBalance')}
            </HeaderCell>
        )}
        {!isEnableSingleWallet && (
            <HeaderCell rowSpan="2" colWidth={180} key={constants.SortKeys.Deposit} lockArrow="desc" sortOrder="desc" sortBy={constants.SortKeys.Deposit}>
                {LangHelper.getSingleResource('Deposit')}
            </HeaderCell>
        )}
        {!isEnableSingleWallet && (
            <HeaderCell rowSpan="2" colWidth={180} key="Withdraw" lockArrow="desc" sortBy={constants.SortKeys.Withdrawal}>
                {LangHelper.getSingleResource('Withdrawal')}
            </HeaderCell>
        )}
        <HeaderCell rowSpan="2" colWidth={120} key="Bonus">
            {LangHelper.getSingleResource('Bonus')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={180} key="Adjustment">
            {LangHelper.getSingleResource('Adjustment')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={160} key="ExtraPayout">
            {LangHelper.getSingleResource('ExtraPayout')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={180} key="TurnOver" lockArrow="desc" sortBy={constants.SortKeys.TurnOver}>
            {LangHelper.getSingleResource('Turnover')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={180} key="DrawGame">
            {LangHelper.getSingleResource('DrawGame')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={180} key="NetTurnOver">
            {LangHelper.getSingleResource('NetTurnOver')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={180} key="PendingFunds">
            {LangHelper.getSingleResource('PendingFunds')}
        </HeaderCell>
        <HeaderCell
            rowSpan={hasCustomerComm ? 1 : 2}
            colWidth={180}
            colSpan={hasCustomerComm ? 3 : 1}
            key="CustomerWinloss"
            sortBy={!hasCustomerComm ? Constants.SortKeys.CustomerWinloss : null}>
            {LangHelper.getSingleResource('CustomerW_L')}
        </HeaderCell>
        {!isEnableSingleWallet && (
            <HeaderCell rowSpan="2" colWidth={180} lockArrow="desc" key="ClosingBalance" sortBy={constants.SortKeys.ClosingBalance}>
                {LangHelper.getSingleResource('ClosingBalance')}
            </HeaderCell>
        )}
        <HeaderCell rowSpan="2" colWidth={200} key="AffiliateTransfer">
            {LangHelper.getSingleResource('AffiliateTransfer')}
        </HeaderCell>
        {isAllowBA && (
            <HeaderCell colWidth={180} colSpan="3" key="BA">
                {LangHelper.getSingleResource('BA')}
            </HeaderCell>
        )}
    </HeaderRow>
);
const BuildSecondRow = (hasCustomerComm, isAllowBA) => (
    <HeaderRow style={{ height: 23 }} key="header2">
        {hasCustomerComm && (
            <HeaderCell colWidth={180} key="CusWinLoss" sortBy={constants.SortKeys.CustomerWinloss}>
                {LangHelper.getSingleResource('WinLoss')}
            </HeaderCell>
        )}
        {hasCustomerComm && (
            <HeaderCell colWidth={160} key="CusComm">
                {LangHelper.getSingleResource('Comm')}
            </HeaderCell>
        )}
        {hasCustomerComm && (
            <HeaderCell colWidth={180} key="CusTotal">
                {LangHelper.getSingleResource('Total')}
            </HeaderCell>
        )}
        {isAllowBA && (
            <HeaderCell colWidth={180} key="BATurnover">
                {LangHelper.getSingleResource('Turnover')}
            </HeaderCell>
        )}
        {isAllowBA && (
            <HeaderCell colWidth={160} key="BAComm">
                {LangHelper.getSingleResource('Comm')}
            </HeaderCell>
        )}
        {isAllowBA && (
            <HeaderCell colWidth={200} key="BAAmountDueTo">
                {LangHelper.getSingleResource('AmountDueTo')}
            </HeaderCell>
        )}
    </HeaderRow>
);
