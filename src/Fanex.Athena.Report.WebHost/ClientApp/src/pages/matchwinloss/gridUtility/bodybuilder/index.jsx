import React from 'react';
import { Row, Cell } from '@legion-lib/react-grid';

import BodyContentRow from './BodyContentRow';

export const BuildBody = (data, columnCount) => {
    if (!data.length) {
        return [];
    }

    if (data.length == 1 && !data[0].leagueName) {
        return data[0].data.map((item, indexCell) => {
            return [<BodyContentRow key={`row-empty-league-${indexCell}`} index={indexCell + 1} matchData={item} />];
        });
    }

    const rows = [];
    let index = 0;
    for (let i = 0; i < data.length; ++i) {
        const matches = data[i];
        rows.push(
            <Row key={`row-${matches.leagueId}-${matches.leagueName}`} className="league-row">
                <Cell className={'left-align'} key={`col-${matches.leagueId}-${index}`} colSpan={columnCount}>
                    {matches.leagueName}
                </Cell>
            </Row>
        );

        for (let j = 0; j < matches.data.length; ++j) {
            index++;

            const match = matches.data[j];
            rows.push(<BodyContentRow key={`row-${i}-${matches.leagueId}-${index}`} index={index} matchData={match} />);
        }
    }

    return rows;
};
