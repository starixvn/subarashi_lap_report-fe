import React from 'react';

import LangHelper from '@/helpers/langHelper';

import HeaderCell from '../customGrid/HeaderCell';
import HeaderRow from '../customGrid/HeaderRow';
import { constants } from '../common';

export const BuildHeaders = (isEnableSingleWallet, hasCustomerComm) => {
    const firstRow = BuildFirstRow(isEnableSingleWallet, hasCustomerComm);
    const secondRow = BuildSecondRow(hasCustomerComm);

    const result = [firstRow];
    if (secondRow.props.children && secondRow.props.children.length > 0) {
        result.push(secondRow);
    }

    return result;
};

const BuildFirstRow = (isEnableSingleWallet, hasCustomerComm) => (
    <HeaderRow style={{ height: 23 }} key="header1" defaultSelectedHeaderKey={constants.SortKeys.Deposit}>
        <HeaderCell rowSpan="2" colWidth={80} key="Index">
            #
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={240} key="ExternalID">
            {LangHelper.getSingleResource('ExternalId')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={240} key="SystemId">
            {LangHelper.getSingleResource('SystemId')}
        </HeaderCell>
        {!isEnableSingleWallet && (
            <HeaderCell rowSpan="2" colWidth={240} key="OpeningBalance" lockArrow="desc" sortBy={constants.SortKeys.OpeningBalance}>
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
            sortBy={!hasCustomerComm ? constants.SortKeys.CustomerWinloss : null}>
            {LangHelper.getSingleResource('CustomerW_L')}
        </HeaderCell>
        {!isEnableSingleWallet && (
            <HeaderCell rowSpan="2" colWidth={240} lockArrow="desc" key="ClosingBalance" sortBy={constants.SortKeys.ClosingBalance}>
                {LangHelper.getSingleResource('ClosingBalance')}
            </HeaderCell>
        )}
        <HeaderCell rowSpan="2" colWidth={200} key="AffiliateTransfer">
            {LangHelper.getSingleResource('AffiliateTransfer')}
        </HeaderCell>
    </HeaderRow>
);
const BuildSecondRow = hasCustomerComm => (
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
    </HeaderRow>
);
