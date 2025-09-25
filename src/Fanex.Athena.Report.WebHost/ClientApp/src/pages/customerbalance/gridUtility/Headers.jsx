import React from 'react';

import LangHelper from '@/helpers/langHelper';

import CustomHeaderCell from '../customGrid/CustomHeaderCell';
import CustomHeaderRow from '../customGrid/CustomHeaderRow';
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
    <CustomHeaderRow style={{ height: 23 }} key="header1" defaultSelectedHeaderKey={constants.SortKeys.Deposit}>
        <CustomHeaderCell rowSpan="2" colWidth={80} key="Index">
            #
        </CustomHeaderCell>
        <CustomHeaderCell rowSpan="2" colWidth={240} key="ExternalID">
            {LangHelper.getSingleResource('ExternalId')}
        </CustomHeaderCell>
        <CustomHeaderCell rowSpan="2" colWidth={240} key="SystemId">
            {LangHelper.getSingleResource('SystemId')}
        </CustomHeaderCell>
        {!isEnableSingleWallet && (
            <CustomHeaderCell rowSpan="2" colWidth={240} key="OpeningBalance" lockArrow="desc" sortBy={constants.SortKeys.OpeningBalance}>
                {LangHelper.getSingleResource('OpeningBalance')}
            </CustomHeaderCell>
        )}
        {!isEnableSingleWallet && (
            <CustomHeaderCell rowSpan="2" colWidth={180} key={constants.SortKeys.Deposit} lockArrow="desc" sortOrder="desc" sortBy={constants.SortKeys.Deposit}>
                {LangHelper.getSingleResource('Deposit')}
            </CustomHeaderCell>
        )}
        {!isEnableSingleWallet && (
            <CustomHeaderCell rowSpan="2" colWidth={180} key="Withdraw" lockArrow="desc" sortBy={constants.SortKeys.Withdrawal}>
                {LangHelper.getSingleResource('Withdrawal')}
            </CustomHeaderCell>
        )}
        <CustomHeaderCell rowSpan="2" colWidth={120} key="Bonus">
            {LangHelper.getSingleResource('Bonus')}
        </CustomHeaderCell>
        <CustomHeaderCell rowSpan="2" colWidth={180} key="Adjustment">
            {LangHelper.getSingleResource('Adjustment')}
        </CustomHeaderCell>
        <CustomHeaderCell rowSpan="2" colWidth={160} key="ExtraPayout">
            {LangHelper.getSingleResource('ExtraPayout')}
        </CustomHeaderCell>
        <CustomHeaderCell rowSpan="2" colWidth={180} key="TurnOver" lockArrow="desc" sortBy={constants.SortKeys.TurnOver}>
            {LangHelper.getSingleResource('Turnover')}
        </CustomHeaderCell>
        <CustomHeaderCell rowSpan="2" colWidth={180} key="DrawGame">
            {LangHelper.getSingleResource('DrawGame')}
        </CustomHeaderCell>
        <CustomHeaderCell rowSpan="2" colWidth={180} key="NetTurnOver">
            {LangHelper.getSingleResource('NetTurnOver')}
        </CustomHeaderCell>
        <CustomHeaderCell rowSpan="2" colWidth={180} key="PendingFunds">
            {LangHelper.getSingleResource('PendingFunds')}
        </CustomHeaderCell>
        <CustomHeaderCell
            rowSpan={hasCustomerComm ? 1 : 2}
            colWidth={180}
            colSpan={hasCustomerComm ? 3 : 1}
            key="CustomerWinloss"
            sortBy={!hasCustomerComm ? constants.SortKeys.CustomerWinloss : null}>
            {LangHelper.getSingleResource('CustomerW_L')}
        </CustomHeaderCell>
        {!isEnableSingleWallet && (
            <CustomHeaderCell rowSpan="2" colWidth={240} lockArrow="desc" key="ClosingBalance" sortBy={constants.SortKeys.ClosingBalance}>
                {LangHelper.getSingleResource('ClosingBalance')}
            </CustomHeaderCell>
        )}
        <CustomHeaderCell rowSpan="2" colWidth={200} key="AffiliateTransfer">
            {LangHelper.getSingleResource('AffiliateTransfer')}
        </CustomHeaderCell>
    </CustomHeaderRow>
);
const BuildSecondRow = hasCustomerComm => (
    <CustomHeaderRow style={{ height: 23 }} key="header2">
        {hasCustomerComm && (
            <CustomHeaderCell colWidth={180} key="CusWinLoss" sortBy={constants.SortKeys.CustomerWinloss}>
                {LangHelper.getSingleResource('WinLoss')}
            </CustomHeaderCell>
        )}
        {hasCustomerComm && (
            <CustomHeaderCell colWidth={160} key="CusComm">
                {LangHelper.getSingleResource('Comm')}
            </CustomHeaderCell>
        )}
        {hasCustomerComm && (
            <CustomHeaderCell colWidth={180} key="CusTotal">
                {LangHelper.getSingleResource('Total')}
            </CustomHeaderCell>
        )}
    </CustomHeaderRow>
);
