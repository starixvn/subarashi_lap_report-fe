import React from 'react';
import { Cell, Row } from '@legion-lib/react-grid';

import LangHelper from '@srcRoot/helpers/langHelper';
import NumberFormat from '@srcRoot/lib/numberFormat';

export const BuildFooter = (data, { isAllowedCustomerCommission }) => {
    const effectiveBettingValue = NumberFormat.formatDecimalHalfDown(data.effectiveBettingValue);
    const totalTransactions = NumberFormat.formatInteger(data.totalTransactions);
    const turnOver = NumberFormat.formatDecimalHalfDown(data.turnover);
    const totalTurnover = NumberFormat.formatDecimalHalfDown(data.totalTurnover);
    const customerWinLoss = NumberFormat.formatDecimalHalfDown(data.customerWinLoss);
    const customerComm = NumberFormat.formatDecimalHalfDown(data.customerComm);
    const customerTotal = NumberFormat.formatDecimalHalfDown(data.customerTotal);

    return (
        <Row key={'footer'}>
            <Cell className="center-align" colSpan={7}>
                {LangHelper.getSingleResource('Total')}
            </Cell>
            <Cell title={effectiveBettingValue} className="right-align">
                {effectiveBettingValue}
            </Cell>
            <Cell title={totalTransactions} className="right-align">
                {totalTransactions}
            </Cell>
            <Cell title={turnOver} className="right-align">
                {turnOver}
            </Cell>
            <Cell title={totalTurnover} className="right-align">
                {totalTurnover}
            </Cell>
            <Cell title={customerWinLoss} className="right-align">
                {customerWinLoss}
            </Cell>
            {isAllowedCustomerCommission && (
                <>
                    <Cell title={customerComm} className="right-align">
                        {customerComm}
                    </Cell>
                    <Cell title={customerTotal} className="right-align">
                        {customerTotal}
                    </Cell>
                </>
            )}
        </Row>
    );
};
