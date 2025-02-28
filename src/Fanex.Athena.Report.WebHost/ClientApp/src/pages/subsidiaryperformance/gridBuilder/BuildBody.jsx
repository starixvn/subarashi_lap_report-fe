import React from 'react';
import { Cell, Row } from '@legion-lib/react-grid';

import ReportLink from '../customGrid/ReportLink';
import { ReportLevel } from '@/constants/report';
import CommonCells from './CommonCells';

export const BuildBody = (data, { drillDownLevel, ...options }) => {
    return drillDownLevel === ReportLevel.CUSTOMER ? BuildDetailBody(data) : BuildMainBody(data, options);
};

const BuildDetailBody = (data) => {
    const rows = data.map((item, index) => {
        return (
            <Row key={index}>
                <Cell title={index + 1} className="center-align">
                    {index + 1}
                </Cell>
                <Cell title={item.externalId}>{item.externalId}</Cell>
                <Cell title={item.systemId}>{item.systemId}</Cell>
                <Cell title={item.currencyName} className="center-align">
                    {item.currencyName}
                </Cell>
                <CommonCells data={item} index={index} />
            </Row>
        );
    });

    return rows;
};

const BuildMainBody = (data, { isMasterView }) => {
    let rows = [];
    let key = 0;

    for (let label = 0; label < data.length; label++) {
        const subData = data[label];

        for (let sub = 0; sub < subData.details.length; sub++) {
            const item = subData.details[sub];
            const currencies = Object.keys(item.details);

            for (let cur = 0; cur < currencies.length; cur++) {
                const currency = currencies[cur];
                const products = item.details[currency];
                const rowSpan = products.length;

                for (let pro = 0; pro < rowSpan; pro++) {
                    const product = products[pro];

                    rows.push(
                        <Row key={key}>
                            {isMasterView && cur === 0 && pro === 0 && sub === 0 && (
                                <Cell title={subData.whiteLabel} rowSpan={subData.totalItem}>
                                    {subData.whiteLabel}
                                </Cell>
                            )}
                            {cur === 0 && pro === 0 && (
                                <Cell title={item.subsidiary} rowSpan={item.totalItem}>
                                    <ReportLink subsidiary={item.subsidiary}>{item.subsidiary}</ReportLink>
                                </Cell>
                            )}
                            {pro === 0 && (
                                <Cell title={currency} rowSpan={rowSpan} className="center-align">
                                    {currency}
                                </Cell>
                            )}
                            <Cell title={product.product}>{product.product}</Cell>
                            <CommonCells data={product} index={key} />
                        </Row>,
                    );

                    key++;
                }
            }
        }
    }

    return rows;
};
