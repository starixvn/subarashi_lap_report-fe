import React from 'react';
import { Cell, Row } from '@legion-lib/react-grid';

import ReportLink from '../customGrid/ReportLink';
import { ReportLevel, SubsidiaryViewType } from '@/constants/report';
import CommonCells from './CommonCells';

export const BuildBody = (data, { drillDownLevel, ...options }) =>
    drillDownLevel === ReportLevel.CUSTOMER ? BuildDetailBody(data) : BuildMainBody(data, options);

const BuildDetailBody = data =>
    data.map((item, index) => (
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
    ));

const buildProductRows = params => {
    const { products, currency, rowSpan, subData, item, viewType, sub, cur, keyRef } = params;
    const rows = [];

    for (let pro = 0; pro < rowSpan; pro++) {
        const product = products[pro];

        rows.push(
            <Row key={keyRef.current}>
                {(() => {
                    const isMasterManagement = viewType === SubsidiaryViewType.MASTER_MANAGEMENT;
                    const isFirstCurrency = cur === 0;
                    const isFirstProduct = pro === 0;
                    const isFirstSub = sub === 0;
                    return isMasterManagement && isFirstCurrency && isFirstProduct && isFirstSub;
                })() && (
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
                <CommonCells data={product} index={keyRef.current} />
            </Row>
        );
        keyRef.current++;
    }

    return rows;
};

const buildCurrencyRows = (currencies, item, subData, viewType, sub, keyRef) => {
    const rows = [];

    for (let cur = 0; cur < currencies.length; cur++) {
        const currency = currencies[cur];
        const products = item.details[currency];
        const rowSpan = products.length;

        const productRows = buildProductRows({
            products,
            currency,
            rowSpan,
            subData,
            item,
            viewType,
            sub,
            cur,
            keyRef,
        });
        rows.push(...productRows);
    }

    return rows;
};

const BuildMainBody = (data, { viewType }) => {
    const rows = [];
    const keyRef = { current: 0 };

    for (let label = 0; label < data.length; label++) {
        const subData = data[label];

        for (let sub = 0; sub < subData.details.length; sub++) {
            const item = subData.details[sub];
            const currencies = Object.keys(item.details);

            const currencyRows = buildCurrencyRows(currencies, item, subData, viewType, sub, keyRef);
            rows.push(...currencyRows);
        }
    }

    return rows;
};
