import React from 'react';
import { Cell } from '@legion-lib/react-grid';

import NumberFormat from '@/lib/numberFormat';

function CommonCells({ data, isHideOpeningBalance, isHideClosingBalance }) {
    const agOpeningBalance = isHideOpeningBalance ? '-' : NumberFormat.formatDecimalHalfDown(data.openingBalance);
    const transferIn = NumberFormat.formatDecimalHalfDown(data.transferIn);
    const transferOut = NumberFormat.formatDecimalHalfDown(data.transferOut);
    const turnOver = NumberFormat.formatDecimalHalfDown(data.turnOver);
    const totalTransaction = NumberFormat.formatInteger(data.totalTransaction);
    const customerWinLoss = NumberFormat.formatDecimalHalfDown(data.customerWinLoss);
    const agClosingBalance = isHideClosingBalance ? '-' : NumberFormat.formatDecimalHalfDown(data.closingBalance);

    return (
        <>
            <Cell title={agOpeningBalance} className="right-align">
                {agOpeningBalance}
            </Cell>
            <Cell title={transferIn} className="right-align">
                {transferIn}
            </Cell>
            <Cell title={transferOut} className="right-align">
                {transferOut}
            </Cell>
            <Cell title={turnOver} className="right-align">
                {turnOver}
            </Cell>
            <Cell title={totalTransaction} className="right-align">
                {totalTransaction}
            </Cell>
            <Cell title={customerWinLoss} className="right-align">
                {customerWinLoss}
            </Cell>
            <Cell title={agClosingBalance} className="right-align">
                {agClosingBalance}
            </Cell>
        </>
    );
}

export default CommonCells;
