import React from 'react';
import moment from 'moment';
import { Cell, Row } from '@legion-lib/react-grid';

import { DrillDownLevel } from '../common/tableSetting';
import CommonCells from './CommonCells';
import ReportLink from '../customGrid/ReportLink';

export const BuildBody = (data, options) => {
    const { drillDownLevel } = options;

    const unix = moment().unix().toString();
    return data.map((row, index) => {
        const externalId = row.externalId;
        const systemId = row.systemId;

        const date = moment(row.date).format('MM/DD/YYYY');
        return (
            <Row key={`row-${row.index}-${unix}`}>
                <Cell title={index} className="center-align">
                    {index + 1}
                </Cell>
                {drillDownLevel == DrillDownLevel.Main && (
                    <Cell title={date} className="center-align">
                        {date}
                    </Cell>
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
