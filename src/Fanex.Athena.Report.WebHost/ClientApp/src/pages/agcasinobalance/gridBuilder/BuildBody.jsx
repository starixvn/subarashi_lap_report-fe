import React from 'react';
import moment from 'moment';
import { Cell, Row } from '@legion-lib/react-grid';

import CommonCells from './CommonCells';
import { DrillDownLevel } from '../common/tableSetting';
import ReportLink from '../customGrid/ReportLink';
import CellSpan from '../customGrid/CellSpan';

export const BuildBody = (data, options) => {
    const { drillDownLevel } = options;

    const unix = moment().unix().toString();
    return data.map((row, index) => {
        const externalId = row.externalId;
        const systemId = row.systemId;

        const date = moment(row.date).format('MM/DD/YYYY');
        return (
            <Row key={`row-${row.index}-${unix}`}>
                <CellSpan rowSpan={row.rowSpan} title={index} className="center-align">
                    {index + 1}
                </CellSpan>
                {drillDownLevel == DrillDownLevel.Main && (
                    <CellSpan rowSpan={row.rowSpan} title={date} className="center-align">
                        {date}
                    </CellSpan>
                )}
                {drillDownLevel == DrillDownLevel.Main && (
                    <Cell title={row.currencyName} className="center-align">
                        <ReportLink data={row} drillDownLevel={drillDownLevel} content={row.currencyName} />
                    </Cell>
                )}
                {drillDownLevel == DrillDownLevel.Licensee && (
                    <Cell title={systemId} className="left-align">
                        <ReportLink data={row} drillDownLevel={drillDownLevel} content={systemId} />
                    </Cell>
                )}
                {drillDownLevel >= DrillDownLevel.Customer && (
                    <Cell title={externalId} className="left-align">
                        {externalId}
                    </Cell>
                )}
                {drillDownLevel >= DrillDownLevel.Customer && (
                    <Cell title={systemId} className="left-align">
                        {systemId}
                    </Cell>
                )}
                {drillDownLevel >= DrillDownLevel.Licensee && (
                    <Cell title={row.currencyName} className="center-align">
                        {row.currencyName}
                    </Cell>
                )}
                <CommonCells data={row} />
            </Row>
        );
    });
};
