import React from 'react';
import { Cell, Row } from '@legion-lib/react-grid';

import moment from 'moment';
import CommonCells from './CommonCells';
import BetListLink from '../customGrid/BetListLink';

export const BuildBody = (data, options) => {
    return data.map((row) => {
        const { isFakeLicensee } = options;
        const externalId = row.externalId;
        const systemId = row.systemId;

        const date = moment().unix().toString();
        return (
            <Row key={`row-${row.index}-${date}`}>
                <Cell title={row.index} className="center-align">
                    {row.index}
                </Cell>
                <Cell title={externalId} className="left-align">
                    <BetListLink data={row} />
                </Cell>
                {!isFakeLicensee && (
                    <Cell title={systemId} className="left-align">
                        {systemId}
                    </Cell>
                )}
                <CommonCells data={row} />
            </Row>
        );
    });
};
