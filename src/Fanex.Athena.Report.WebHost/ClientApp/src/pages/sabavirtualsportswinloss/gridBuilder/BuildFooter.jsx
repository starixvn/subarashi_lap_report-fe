import React from 'react';
import { Cell, Row } from '@legion-lib/react-grid';

import LangHelper from '@/helpers/langHelper';
import CommonCells from './CommonCells';
import { DrillDownLevel } from '../common/tableSetting';

export const BuildFooter = ({ totalData, summaryData }, options) => {
    const totalColumnSpan = options.drillDownLevel > DrillDownLevel.Licensee ? 3 : 2;
    const summaryColumnSpan = options.drillDownLevel > DrillDownLevel.Licensee ? 4 : 3;
    return [
        <Row key={`light-footer-total`} className="light-footer">
            <Cell className="center-align" colSpan={totalColumnSpan} rowSpan={totalData.length + 1}>
                {LangHelper.getSingleResource('Total')}
            </Cell>
        </Row>,
        ...totalData.map((item, index) => (
            <Row key={`light-footer-${index}`} className="light-footer">
                <Cell title={item.CurrencyName} className="center-align">
                    {item.currencyName}
                </Cell>
                <CommonCells data={item} options={options} />
            </Row>
        )),
        ...Object.keys(summaryData)
            .reverse()
            .map((key) => (
                <Row key={`footer-${key}`}>
                    <Cell className="center-align" colSpan={summaryColumnSpan}>
                        {`${LangHelper.getSingleResource('TotalIn')} ${key}`}
                    </Cell>
                    <CommonCells data={summaryData[key]} options={options} />
                </Row>
            )),
    ];
};
