import React from 'react';
import { useSelector } from 'react-redux';
import { Cell } from '@legion-lib/react-grid';

import NumberFormat from '@srcRoot/lib/numberFormat';

const CommonCells = ({ data }) => {
    const formData = useSelector((state) => state.formData);
    const { isAllowedCustomerCommission, isAllowBa, hasAmountDueToColumn } = formData;

    const customerWinLoss = NumberFormat.formatDecimalHalfDown(data.customerWinLoss);
    const customerComm = NumberFormat.formatDecimalHalfDown(data.customerComm);
    const customerTotal = NumberFormat.formatDecimalHalfDown(data.customerTotal);
    const turnOver = NumberFormat.formatDecimalHalfDown(data.turnOver);
    const betCount = NumberFormat.formatInteger(data.betCount);
    const licenseeWinLoss = NumberFormat.formatDecimalHalfDown(data.licenseeWinLoss);
    const licenseeComm = NumberFormat.formatDecimalHalfDown(data.licenseeComm);
    const amountDue = NumberFormat.formatDecimalHalfDown(data.amountDue);

    return (
        <>
            <Cell title={customerWinLoss} className="right-align" key={`cell-winLoss`}>
                {customerWinLoss}
            </Cell>
            {isAllowedCustomerCommission && (
                <>
                    <Cell title={customerComm} className="right-align" key={`cell-playerComm`}>
                        {customerComm}
                    </Cell>
                    <Cell title={customerTotal} className="right-align" key={`cell-totalWL`}>
                        {customerTotal}
                    </Cell>
                </>
            )}
            <Cell title={turnOver} className="right-align" key={`cell-turnover`}>
                {turnOver}
            </Cell>
            <Cell title={betCount} className="right-align" key={`cell-bonus`}>
                {betCount}
            </Cell>
            <Cell title={licenseeWinLoss} className={`right-align ${licenseeWinLoss.startsWith('-') ? 'negative' : ''}`} key={`cell-licenseeWinLoss`}>
                {licenseeWinLoss}
            </Cell>
            {isAllowBa && (
                <Cell title={licenseeComm} className="right-align" key={`cell-licenseeComm`}>
                    {licenseeComm}
                </Cell>
            )}
            {hasAmountDueToColumn && (
                <Cell title={turnOver} className="right-align" key={`cell-turnover`}>
                    {amountDue}
                </Cell>
            )}
        </>
    );
};

export default React.memo(CommonCells);
