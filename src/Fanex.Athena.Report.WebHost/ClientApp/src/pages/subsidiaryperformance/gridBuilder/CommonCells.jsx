import React from 'react';
import { Cell, Row } from '@legion-lib/react-grid';

import NumberFormat from '@/lib/numberFormat';

const CommonCells = ({ data, index }) => {
    const betcount = NumberFormat.format(data.betCount);
    const turnover = NumberFormat.formatDecimal(data.turnover);
    const customerWinLoss = NumberFormat.formatDecimal(data.customerWinLoss);
    const subsidiaryWinLoss = NumberFormat.formatDecimal(data.subsidiaryWinLoss);

    return (
        <>
            <Cell key={`${index}-bc`} title={betcount} className="right-align">
                {betcount}
            </Cell>
            <Cell key={`${index}-tn`} title={turnover} className="right-align">
                {turnover}
            </Cell>
            <Cell key={`${index}-cw`} title={customerWinLoss} className="right-align">
                {customerWinLoss}
            </Cell>
            <Cell key={`${index}-sw`} title={subsidiaryWinLoss} className={`right-align ${data.subsidiaryWinLoss < 0 ? 'negative' : ''}`}>
                {subsidiaryWinLoss}
            </Cell>
        </>
    );
};

export default CommonCells;
