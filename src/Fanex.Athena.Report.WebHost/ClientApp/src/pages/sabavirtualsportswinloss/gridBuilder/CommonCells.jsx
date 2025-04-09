import React from 'react';
import { Cell } from '@legion-lib/react-grid';

import NumberFormat from '@/lib/numberFormat';
import classNames from 'classnames';
function CommonCells({ data, options }) {
    const { hasCustomerComm } = options;

    const totalTurnOver = NumberFormat.formatDecimalHalfDown(data.totalTurnOver);

    const totalTransaction = NumberFormat.formatInteger(data.totalTransaction);

    const customerWinLoss = NumberFormat.formatDecimalHalfDown(data.customerWinLoss);
    const customerComm = NumberFormat.formatDecimalHalfDown(data.customerComm);
    const customerTotal = NumberFormat.formatDecimalHalfDown(data.customerTotal);

    const licenseeWLSB = NumberFormat.formatDecimalHalfDown(data.licenseeWLSB);
    const licenseeWLCO = NumberFormat.formatDecimalHalfDown(data.licenseeWLCO);
    const totalLicenseeWL = NumberFormat.formatDecimalHalfDown(data.totalLicenseeWL);

    const cashOutCommission = NumberFormat.formatDecimalHalfDown(data.cashOutCommission);

    return (
        <>
            <Cell title={totalTurnOver} className="right-align">
                {totalTurnOver}
            </Cell>
            <Cell title={totalTransaction} className="right-align">
                {totalTransaction}
            </Cell>
            <Cell title={customerWinLoss} className="right-align">
                {customerWinLoss}
            </Cell>
            {hasCustomerComm && (
                <>
                    <Cell title={customerComm} className="right-align">
                        {customerComm}
                    </Cell>
                    <Cell title={customerTotal} className="right-align">
                        {customerTotal}
                    </Cell>
                </>
            )}
            <Cell title={licenseeWLSB} className={classNames('right-align', data.licenseeWLSB >= 0 ? '' : 'negative')}>
                {licenseeWLSB}
            </Cell>
            <Cell title={licenseeWLCO} className="right-align">
                {licenseeWLCO}
            </Cell>
            <Cell title={totalLicenseeWL} className={classNames('right-align', data.totalLicenseeWL >= 0 ? '' : 'negative')}>
                {totalLicenseeWL}
            </Cell>
            <Cell title={cashOutCommission} className="right-align">
                {cashOutCommission}
            </Cell>
        </>
    );
}

export default CommonCells;
