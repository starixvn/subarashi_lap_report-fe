import React from 'react';
import { Row, Cell } from '@legion-lib/react-grid';

import LangHelper from '@srcRoot/helpers/langHelper';

import Service, { constants } from '../common';

export const GetDefaultPagingOptions = (pageIndex, totalItem) => ({ ...constants.DefaultPagingOption, PageIndex: pageIndex, TotalItem: totalItem });

export const GenerateReportTitle = (fromDate, toDate, currencyName) => {
    const customerBalanceTitle = LangHelper.getSingleResource('CustomerBalance');
    const dateRange = `${fromDate} → ${toDate}`;
    const currencyView = LangHelper.getSingleResource('Viewin').replace('{0}', currencyName);

    return `${customerBalanceTitle}, ${dateRange}, ${currencyView}`;
};

export const BuildBody = (data, isEnableSingleWallet, isAllowedCustomerCommission, isEnableBA) => {
    return data.map((item) => {
        return (
            <Row key={`row-${item.index}`}>
                <Cell title={parseInt(item.index)} className={'center-align'} key={`col-${0}`}>
                    {parseInt(item.index)}
                </Cell>
                <Cell title={item.externalId} className={'left-align'} key={`col-externalid`}>
                    {item.externalId}
                </Cell>
                {item.systemId && (
                    <Cell title={item.systemId} className={'left-align'} key={`col-systemid`}>
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
            <Cell titlt={LangHelper.getSingleResource('Total')} className="center-align" colSpan={totalSpan}>
                {LangHelper.getSingleResource('Total')}
            </Cell>
            {BuildContent(totalData, isEnableSingleWallet, isAllowedCustomerCommission, isEnableBA)}
        </Row>
    );
};

const BuildContent = (data, isEnableSingleWallet, isAllowedCustomerCommission, isEnableBA) => {
    const decimalData = Service.formatDecimalInObjectNumbers(data);

    return (
        <>
            {!isEnableSingleWallet && (
                <>
                    <Cell title={decimalData.openingBalance} className="right-align" key={`footer-openingBalance`}>
                        {decimalData.openingBalance}
                    </Cell>
                    <Cell title={decimalData.deposit} className="right-align" key={`footer-deposit`}>
                        {decimalData.deposit}
                    </Cell>
                    <Cell title={decimalData.withdrawal} className="right-align" key={`footer-withdrawal`}>
                        {decimalData.withdrawal}
                    </Cell>
                </>
            )}
            <Cell title={decimalData.bonus} className="right-align" key={`footer-bonus`}>
                {decimalData.bonus}
            </Cell>
            <Cell title={decimalData.adjustment} className="right-align" key={`footer-adjustment`}>
                {decimalData.adjustment}
            </Cell>
            <Cell title={decimalData.promotion} className="right-align" key={`footer-promotion`}>
                {decimalData.promotion}
            </Cell>
            <Cell title={decimalData.turnover} className="right-align" key={`footer-turnover`}>
                {decimalData.turnover}
            </Cell>
            <Cell title={decimalData.drawGame} className="right-align" key={`footer-drawGame`}>
                {decimalData.drawGame}
            </Cell>
            <Cell title={decimalData.netTurnover} className="right-align" key={`footer-netTurnOver`}>
                {decimalData.netTurnover}
            </Cell>
            <Cell title={decimalData.pendingFunds} className="right-align" key={`footer-pendingFunds`}>
                {decimalData.pendingFunds}
            </Cell>
            <Cell title={decimalData.winLoss} className="right-align" key={`footer-winLoss`}>
                {decimalData.winLoss}
            </Cell>
            {isAllowedCustomerCommission && (
                <>
                    <Cell title={decimalData.playerComm} className="right-align" key={`footer-playerComm`}>
                        {decimalData.playerComm}
                    </Cell>
                    <Cell title={decimalData.totalWL} className="right-align" key={`footer-totalWL`}>
                        {decimalData.totalWL}
                    </Cell>
                </>
            )}
            {!isEnableSingleWallet && (
                <Cell title={decimalData.closingBalance} className="right-align" key={`footer-closingBalance`}>
                    {decimalData.closingBalance}
                </Cell>
            )}
            <Cell title={decimalData.affiliateTransfer} className="right-align" key={`footer-affiliateTransfer`}>
                {decimalData.affiliateTransfer}
            </Cell>
            {isEnableBA && (
                <>
                    <Cell title={decimalData.turnoverBA} className="right-align" key={`footer-turnoverBA`}>
                        {decimalData.turnoverBA}
                    </Cell>
                    <Cell title={decimalData.commBA} className="right-align" key={`footer-commBA`}>
                        {decimalData.commBA}
                    </Cell>
                    <Cell title={decimalData.amountDueToBA} className="right-align" key={`footer-amountDueToBA`}>
                        {decimalData.amountDueToBA}
                    </Cell>
                </>
            )}
        </>
    );
};
