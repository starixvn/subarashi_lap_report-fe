import React from 'react';
import { useSelector } from 'react-redux';
import { Cell } from '@legion-lib/react-grid';

import NumberFormat from '@/lib/numberFormat';

const CommonCells = (props) => {
    const formData = useSelector((state) => state.formData);
    const data = { ...props.data };

    const { isAllowedCustomerCommission, isAllowBa, hasAmountDueToColumn } = formData;

    data.customerWinLoss = NumberFormat.formatDecimal(data.customerWinLoss);
    data.customerComm = NumberFormat.formatDecimal(data.customerComm);
    data.customerTotal = NumberFormat.formatDecimal(data.customerTotal);
    data.turnOver = NumberFormat.formatDecimal(data.turnOver);
    data.betCount = NumberFormat.formatInteger(data.betCount);
    data.licenseeWinLoss = NumberFormat.formatDecimal(data.licenseeWinLoss);
    data.licenseeComm = NumberFormat.formatDecimal(data.licenseeComm);
    data.amountDue = NumberFormat.formatDecimal(data.amountDue);

    return (
        <>
            <Cell title={data.customerWinLoss} className="right-align" key={`cell-winLoss`}>
                {data.customerWinLoss}
            </Cell>
            {isAllowedCustomerCommission && (
                <>
                    <Cell title={data.customerComm} className="right-align" key={`cell-playerComm`}>
                        {data.customerComm}
                    </Cell>
                    <Cell title={data.customerTotal} className="right-align" key={`cell-totalWL`}>
                        {data.customerTotal}
                    </Cell>
                </>
            )}
            <Cell title={data.turnOver} className="right-align" key={`cell-turnover`}>
                {data.turnOver}
            </Cell>
            <Cell title={data.betCount} className="right-align" key={`cell-bonus`}>
                {data.betCount}
            </Cell>
            <Cell title={data.licenseeWinLoss} className={`right-align ${data.licenseeWinLoss.startsWith('-') ? 'negative' : ''}`} key={`cell-licenseeWinLoss`}>
                {data.licenseeWinLoss}
            </Cell>
            {isAllowBa && (
                <Cell title={data.licenseeComm} className="right-align" key={`cell-licenseeComm`}>
                    {data.licenseeComm}
                </Cell>
            )}
            {hasAmountDueToColumn && (
                <Cell title={data.turnOver} className="right-align" key={`cell-turnover`}>
                    {data.amountDue}
                </Cell>
            )}
        </>
    );
};

export default React.memo(CommonCells);
