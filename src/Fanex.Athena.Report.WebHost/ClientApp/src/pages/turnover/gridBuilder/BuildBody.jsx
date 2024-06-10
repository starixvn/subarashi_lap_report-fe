import React from 'react';
import { Cell, Row } from '@legion-lib/react-grid';

import moment from 'moment';
import CommonCells from './CommonCells';

export const BuildBody = (data, options) => {
    return data.map((row, index) => {
        const date = moment(row.date).format('MM/DD/YYYY');

        return (
            <Row key={`row-index-${row.index}-${index}`}>
                <Cell title={row.index} className="center-align">
                    {row.index}
                </Cell>
                <Cell title={date} className="center-align">
                    {date}
                </Cell>
                <CommonCells data={row} options={options} />
            </Row>
        );
    });
};
