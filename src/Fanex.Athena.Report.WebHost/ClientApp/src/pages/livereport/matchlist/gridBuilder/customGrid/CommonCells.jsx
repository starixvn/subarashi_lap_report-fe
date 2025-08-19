import React from 'react';
import { useSelector } from 'react-redux';
import { Cell } from '@legion-lib/react-grid';

import NumberFormat from '@/lib/numberFormat';

const CommonCells = ({ data }) => {
    const formData = useSelector(state => state.formData);
    const { isAllowedCustomerCommission, hasAmountDueToColumn } = formData;

    const customerWinLoss = NumberFormat.formatDecimal(data.customerWinLoss);
    const customerComm = NumberFormat.formatDecimal(data.customerComm);
    const customerTotal = NumberFormat.formatDecimal(data.customerTotal);
    const turnOver = NumberFormat.formatDecimal(data.turnOver);
    const betCount = NumberFormat.formatInteger(data.betCount);
    const licenseeWinLoss = NumberFormat.formatDecimal(data.licenseeWinLoss);

    const amountDue = NumberFormat.formatDecimal(data.amountDue);

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
            {hasAmountDueToColumn && (
                <Cell title={turnOver} className="right-align" key={`cell-turnover`}>
                    {amountDue}
                </Cell>
            )}
        </>
    );
};

export default React.memo(CommonCells);
