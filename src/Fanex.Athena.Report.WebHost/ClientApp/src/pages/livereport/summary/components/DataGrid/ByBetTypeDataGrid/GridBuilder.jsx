import React from 'react';
import { Row, Cell } from '@legion-lib/react-grid';

import LangHelper from '@/helpers/langHelper';

import { BuildHeaders, CommonCells } from '../../../gridUltility';

export const BuildByBetTypeHeaders = options => BuildHeaders(LangHelper.getSingleResource('BetType'), options);

export const BuildByBetTypeBody = (data, options) => {
    let columnCount = options.isAllowedCustomerCommission ? 7 : 5;

    if (options.hasAmountDueToColumn) {
        columnCount++;
    }

    const rows = [];
    for (let i = 0; i < data.length; ++i) {
        const report = data[i];
        rows.push(
            <Row key={`row-${report.productName}`} className="font-weight-600 highlight">
                <Cell className={'left-align'} key={`col-${report.productName}`} colSpan={columnCount}>
                    {report.productName}
                </Cell>
            </Row>
        );

        for (let j = 0; j < report.liveReports.length; ++j) {
            const liveReport = report.liveReports[j];
            rows.push(
                <Row key={`row-${i}-${j}`}>
                    <Cell title={liveReport.productName} className="left-align" key={`cell-bonus`}>
                        {liveReport.productName}
                    </Cell>
                    <CommonCells data={liveReport} />
                </Row>
            );
        }
    }

    return rows;
};
