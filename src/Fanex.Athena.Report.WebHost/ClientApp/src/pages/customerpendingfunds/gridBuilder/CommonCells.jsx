import React from 'react';
import { Cell } from '@legion-lib/react-grid';

import NumberFormat from '@srcRoot/lib/numberFormat';
function CommonCells({ data }) {
    const betCounts = NumberFormat.formatInteger(data.betCounts);
    const pendingFunds = NumberFormat.formatDecimalHalfDown(data.pendingFunds);

    return (
        <>
            <Cell title={betCounts} className="right-align">
                {betCounts}
            </Cell>
            <Cell title={pendingFunds} className="right-align">
                {pendingFunds}
            </Cell>
        </>
    );
}

export default CommonCells;
