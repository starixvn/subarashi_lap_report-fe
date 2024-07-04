import React from 'react';
import { Cell, Row } from '@legion-lib/react-grid';

import LangHelper from '@srcRoot/helpers/langHelper';
import NumberFormat from '@srcRoot/lib/numberFormat';
import { SettingConst } from '../constants/settingConst';

export const BuildFooter = (data, { reportBy, baseCurrency }) => {
    const betcount = NumberFormat.format(data.betCount);
    const turnover = NumberFormat.formatDecimal(data.turnover);
    const customerComm = NumberFormat.formatDecimal(data.customerComm);
    const licenseeWL = NumberFormat.formatDecimal(data.licenseeWinLoss);
    const licenseeComm = NumberFormat.formatDecimal(data.licenseeComm);
    const licenseeNetWL = NumberFormat.formatDecimal(data.licenseeNetWinLoss);
    const margin = NumberFormat.formatDecimal(data.margin) + '%';
    const colSpan = reportBy === SettingConst.ReportBySummary ? 2 : 3;

    return [
        <Row className="fixed-table-grant-total" key={1}>
            <Cell className="center-align" colSpan={colSpan}>
                {LangHelper.getSingleResource('TotalIn') + ' ' + baseCurrency}
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
            <Cell title={licenseeWL} className={`right-align ${data.licenseeWinLoss < 0 ? 'negative' : ''}`}>
                {licenseeWL}
            </Cell>
            <Cell title={licenseeComm} className={'right-align'}>
                {licenseeComm}
            </Cell>
            <Cell title={licenseeNetWL} className={`right-align ${data.licenseeNetWinLoss < 0 ? 'negative' : ''}`}>
                {licenseeNetWL}
            </Cell>
            <Cell title={margin} className={'right-align'}>
                {margin}
            </Cell>
        </Row>,
    ];
};
