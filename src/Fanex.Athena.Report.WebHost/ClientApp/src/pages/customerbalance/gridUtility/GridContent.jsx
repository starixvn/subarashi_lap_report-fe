import React from 'react';
import { Row, Cell } from '@legion-lib/react-grid';

import LangHelper from '@srcRoot/helpers/langHelper';

import { DefaultPagingOption } from '../common/filter';

export const GetDefaultPagingOptions = (totalItem) => ({ ...DefaultPagingOption, TotalItem: totalItem });

export const GenerateReportTitle = (fromDate, toDate, currencyName) => {
    const customerBalanceTitle = LangHelper.getSingleResource('CustomerBalance');
    const dateRange = `${fromDate} → ${toDate}`;
    const currencyView = `View in ${currencyName}`;

    return `${customerBalanceTitle}, ${dateRange}, ${currencyView}`;
};

export const BuildBody = (data, isEnableSingleWallet, isAllowedCustomerCommission, isEnableBA) => {
    return data.map((item, indexCell) => {
        return (
            <Row key={`row-${item.index}`}>
                <Cell className={'center-align'} key={`col-${0}`}>
                    {indexCell + 1}
                </Cell>
                <Cell className={'left-align'} key={`col-externalid`}>
                    {item.externalId}
                </Cell>
                {item.systemId && (
                    <Cell className={'left-align'} key={`col-systemid`}>
                        {item.systemId}
                    </Cell>
                )}
                {BuildContent(item, isEnableSingleWallet, isAllowedCustomerCommission, isEnableBA)}
            </Row>
        );
    });
};

export const BuildFooter = (totalData, totalSpan, isEnableSingleWallet, isAllowedCustomerCommission, isEnableBA) => {
    return (
        <Row key={'footer'}>
            <Cell className="center-align" colSpan={totalSpan}>
                {LangHelper.getSingleResource('Total')}
            </Cell>
            {BuildContent(totalData, isEnableSingleWallet, isAllowedCustomerCommission, isEnableBA)}
        </Row>
    );
};

const BuildContent = (data, isEnableSingleWallet, isAllowedCustomerCommission, isEnableBA) => (
    <>
        {!isEnableSingleWallet && (
            <>
                <Cell className="right-align" key={`footer-openingBalance`}>
                    {data.openingBalance}
                </Cell>
                <Cell className="right-align" key={`footer-deposit`}>
                    {data.deposit}
                </Cell>
                <Cell className="right-align" key={`footer-withdrawal`}>
                    {data.withdrawal}
                </Cell>
            </>
        )}
        <Cell className="right-align" key={`footer-bonus`}>
            {data.bonus}
        </Cell>
        <Cell className="right-align" key={`footer-adjustment`}>
            {data.adjustment}
        </Cell>
        <Cell className="right-align" key={`footer-promotion`}>
            {data.promotion}
        </Cell>
        <Cell className="right-align" key={`footer-turnover`}>
            {data.turnover}
        </Cell>
        <Cell className="right-align" key={`footer-drawGame`}>
            {data.drawGame}
        </Cell>
        <Cell className="right-align" key={`footer-netTurnOver`}>
            {data.netTurnover}
        </Cell>
        <Cell className="right-align" key={`footer-pendingFunds`}>
            {data.pendingFunds}
        </Cell>
        <Cell className="right-align" key={`footer-winLoss`}>
            {data.winLoss}
        </Cell>
        {isAllowedCustomerCommission && (
            <>
                <Cell className="right-align" key={`footer-playerComm`}>
                    {data.playerComm}
                </Cell>
                <Cell className="right-align" key={`footer-totalWL`}>
                    {data.totalWL}
                </Cell>
            </>
        )}
        {!isEnableSingleWallet && (
            <Cell className="right-align" key={`footer-closingBalance`}>
                {data.closingBalance}
            </Cell>
        )}
        <Cell className="right-align" key={`footer-affiliateTransfer`}>
            {data.affiliateTransfer}
        </Cell>
        {isEnableBA && (
            <>
                <Cell className="right-align" key={`footer-turnoverBA`}>
                    {data.turnoverBA}
                </Cell>
                <Cell className="right-align" key={`footer-commBA`}>
                    {data.commBA}
                </Cell>
                <Cell className="right-align" key={`footer-amountDueToBA`}>
                    {data.amountDueToBA}
                </Cell>
            </>
        )}
    </>
);
