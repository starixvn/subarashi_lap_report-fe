import React from 'react';
import { HeaderRow, HeaderCell } from '@legion-lib/react-grid';

import LangHelper from '@srcRoot/helpers/langHelper';

export const BuildHeader = (options) => {
    const result = [BuildFirstRow(options)];

    const secondRow = BuildSecondRow(options);
    if (secondRow) {
        result.push(secondRow);
    }

    return result;
};

const BuildFirstRow = ({ hasCasinoTransfer, isEnableSingleWallet, isHidePlayerWL, hasCustomerComm }) => (
    <HeaderRow style={{ height: 23 }} key="header1">
        <HeaderCell rowSpan="2" colWidth={200} className="first-header-cell" key="#">
            #
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={400} key="Date">
            {LangHelper.getSingleResource('Date')}
        </HeaderCell>
        {!isEnableSingleWallet && (
            <HeaderCell rowSpan="2" colWidth={400} key="OpeningBalance">
                {LangHelper.getSingleResource('OpeningBalance')}
            </HeaderCell>
        )}
        {!isEnableSingleWallet && (
            <HeaderCell rowSpan="2" colWidth={350} key="Deposit">
                {LangHelper.getSingleResource('Deposit')}
            </HeaderCell>
        )}
        {!isEnableSingleWallet && (
            <HeaderCell rowSpan="2" colWidth={400} key="Withdrawal">
                {LangHelper.getSingleResource('Withdrawal')}
            </HeaderCell>
        )}
        <HeaderCell rowSpan="2" colWidth={500} key="Bonus">
            {LangHelper.getSingleResource('Bonus')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={450} key="Adjustment">
            {LangHelper.getSingleResource('Adjustment')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={500} key="ExtraPayout">
            {LangHelper.getSingleResource('ExtraPayout')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={400} key="Turnover">
            {LangHelper.getSingleResource('Turnover')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={400} key="DrawGame">
            {LangHelper.getSingleResource('DrawGame')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={500} key="NetTurnOver">
            {LangHelper.getSingleResource('NetTurnOver')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={500} key="PendingFunds">
            {LangHelper.getSingleResource('PendingFunds')}
        </HeaderCell>
        {!isHidePlayerWL && (
            <HeaderCell rowSpan={hasCustomerComm ? 1 : 2} colWidth={400} colSpan={hasCustomerComm ? 3 : 1} key="CusWinLoss">
                {hasCustomerComm ? LangHelper.getSingleResource('CustomerW_L') : LangHelper.getSingleResource('WinLoss')}
            </HeaderCell>)
        }
        {!isEnableSingleWallet && (
            <HeaderCell rowSpan="2" colWidth={500} key="ClosingBalance">
                {LangHelper.getSingleResource('ClosingBalance')}
            </HeaderCell>
        )}
        <HeaderCell rowSpan="2" colWidth={500} key="AffiliateTransfer">
            {LangHelper.getSingleResource('AffiliateTransfer')}
        </HeaderCell>
        {hasCasinoTransfer && (
            <HeaderCell colWidth={500} rowSpan="2" key="CasinoTransfer">
                {LangHelper.getSingleResource('CasinoTransfer')}
            </HeaderCell>
        )}
    </HeaderRow>
);

const BuildSecondRow = ({ hasCustomerComm, isHidePlayerWL }) => {
    const showCustomerWL = hasCustomerComm && !isHidePlayerWL;
    if (!showCustomerWL) {
        return null;
    }

    return (
        <HeaderRow style={{ height: 23 }} key="header2">
            {showCustomerWL && (
                <HeaderCell colWidth={450} key="WinLoss">
                    {LangHelper.getSingleResource('WinLoss')}
                </HeaderCell>
            )}
            {showCustomerWL && (
                <HeaderCell colWidth={400} key="Commission">
                    {LangHelper.getSingleResource('Comm')}
                </HeaderCell>
            )}
            {showCustomerWL && (
                <HeaderCell colWidth={450} key="CusTotal">
                    {LangHelper.getSingleResource('Total')}
                </HeaderCell>
            )}
        </HeaderRow>
    );
};
