import React from 'react';
import moment from 'moment';
import { Cell, Row } from '@legion-lib/react-grid';

import NumberFormat from '@/lib/numberFormat';
import { SettingConst } from '../constants/settingConst';

export const BuildBody = (data, { reportBy: selectedReportBy, groupBy }) => {
    const groupByClassName = groupBy === SettingConst.GroupByProduct ? 'left-align' : 'center-align';

    const rows = [];
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const reportBy = moment(item.reportBy).format(selectedReportBy === 2 ? 'MM/DD/YYYY' : 'MM/YYYY');
        const betcount = NumberFormat.format(item.betCount);
        const turnover = NumberFormat.formatDecimal(item.turnover);
        const customerComm = NumberFormat.formatDecimal(item.customerComm);
        const licenseeWL = NumberFormat.formatDecimal(item.licenseeWinLoss);
        const licenseeComm = NumberFormat.formatDecimal(item.licenseeComm);
        const licenseeNetWL = NumberFormat.formatDecimal(item.licenseeNetWinLoss);
        const margin = NumberFormat.formatDecimal(item.margin) + '%';

        const reportByCell = selectedReportBy !== SettingConst.ReportBySummary && (
            <Cell title={reportBy} className="center-align">
                {reportBy}
            </Cell>
        );

        rows.push(
            <Row key={`tr${i}`}>
                <Cell className="center-align">{i + 1}</Cell>
                {reportByCell}
                <Cell title={item.groupBy} className={groupByClassName}>
                    {item.groupBy}
                </Cell>
                <Cell title={betcount} className="right-align">
                    {betcount}
                </Cell>
                <Cell title={turnover} className="right-align">
                    {turnover}
                </Cell>
                <Cell title={customerComm} className="right-align">
                    {customerComm}
                </Cell>
                <Cell title={licenseeWL} className={`right-align ${item.licenseeWinLoss < 0 ? 'negative' : ''}`}>
                    {licenseeWL}
                </Cell>
                <Cell title={licenseeComm} className="right-align">
                    {licenseeComm}
                </Cell>
                <Cell title={licenseeNetWL} className={`right-align ${item.licenseeNetWinLoss < 0 ? 'negative' : ''}`}>
                    {licenseeNetWL}
                </Cell>
                <Cell title={margin} className="right-align">
                    {margin}
                </Cell>
            </Row>
        );
    }

    return rows;
};
