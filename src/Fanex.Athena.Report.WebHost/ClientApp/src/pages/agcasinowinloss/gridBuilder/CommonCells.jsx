import React from 'react';
import { Cell } from '@legion-lib/react-grid';

import NumberFormat from '@srcRoot/lib/numberFormat';
function CommonCells({ data }) {
    const turnOver = NumberFormat.formatDecimalHalfDown(data.turnOver);
    const totalTransaction = NumberFormat.formatInteger(data.totalTransaction);
    const customerWinLoss = NumberFormat.formatDecimalHalfDown(data.customerWinLoss);
    const licenseeWL = NumberFormat.formatDecimalHalfDown(data.licenseeWL);
    const contributionWL = NumberFormat.formatDecimalHalfDown(data.contributionWL);
    const promotionWL = NumberFormat.formatDecimalHalfDown(data.promotionWL);
    const jackpotWL = NumberFormat.formatDecimalHalfDown(data.jackpotWL);
    const totalWL = NumberFormat.formatDecimalHalfDown(data.totalWL);

    return (
        <>
            <Cell title={turnOver} className="right-align">
                {turnOver}
            </Cell>
            <Cell title={totalTransaction} className="right-align">
                {totalTransaction}
            </Cell>
            <Cell title={customerWinLoss} className="right-align">
                {customerWinLoss}
            </Cell>
            <Cell title={licenseeWL} className="right-align">
                {licenseeWL}
            </Cell>
            <Cell title={contributionWL} className="right-align">
                {contributionWL}
            </Cell>
            <Cell title={promotionWL} className="right-align">
                {promotionWL}
            </Cell>
            <Cell title={jackpotWL} className="right-align">
                {jackpotWL}
            </Cell>
            <Cell title={totalWL} className="right-align">
                {totalWL}
            </Cell>
        </>
    );
}

export default CommonCells;
