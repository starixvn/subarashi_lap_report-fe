import React from 'react';
import { Cell, Row } from '@legion-lib/react-grid';

import NumberFormat from '@/lib/numberFormat';
import moment from 'moment';
import CellSpan from './CellSpan';
import { ReportByValue } from '../common/filterSettings';

export const BuildBody = (data, { isAllowedCustomerCommission, reportBy }) => {
    const dateFormat = 'MM/DD/YYYY';
    const monthFormat = 'MM/YYYY';
    const dateFieldFormat = reportBy === ReportByValue.Monthly ? monthFormat : dateFormat;
    return data.map((row, index) => {
        const date = moment(row.reportBy).format(dateFieldFormat);

        const effectiveBettingValue = NumberFormat.formatDecimal(row.effectiveBettingValue);
        const totalTransactions = NumberFormat.formatInteger(row.totalTransactions);
        const turnOver = NumberFormat.formatDecimal(row.turnover);
        const totalTurnover = NumberFormat.formatDecimal(row.totalTurnover);
        const customerWinLoss = NumberFormat.formatDecimal(row.customerWinLoss);
        const customerComm = NumberFormat.formatDecimal(row.customerComm);
        const customerTotal = NumberFormat.formatDecimal(row.customerTotal);

        return (
            <Row key={`row-index-${row.index}-${index}`}>
                <CellSpan title={row.index} rowSpan={row.rowSpan} className="center-align">
                    {row.index}
                </CellSpan>
                <CellSpan title={date} rowSpan={row.rowSpan} className="center-align">
                    {date}
                </CellSpan>
                <CellSpan title={row.externalId} rowSpan={row.rowSpan} className="left-align">
                    {row.externalId}
                </CellSpan>
                <CellSpan title={row.systemId} rowSpan={row.rowSpan} className="left-align">
                    {row.systemId}
                </CellSpan>
                <CellSpan title={row.currency} rowSpan={row.rowSpan} className="center-align">
                    {row.currency}
                </CellSpan>
                <CellSpan title={row.sportType} rowSpan={row.rowSpan2} className="left-align">
                    {row.sportType}
                </CellSpan>
                <Cell title={row.bettype} className="left-align">
                    {row.bettype}
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
                <CellSpan title={totalTurnover} rowSpan={row.rowSpan} className="right-align">
                    {totalTurnover}
                </CellSpan>
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
    });
};

