import React from 'react';
import { Row, Cell } from '@legion-lib/react-grid';

import LangHelper from '@/helpers/langHelper';

import { BuildHeaders, CommonCells } from '../../../gridUltility';

export const BuildByCurrencyHeaders = options => BuildHeaders(LangHelper.getSingleResource('Currency'), options);

export const BuildByCurrencyBody = data =>
    data.map(item => (
        <Row key={`row-currency-${item.productName}`}>
            <Cell title={item.productName} className="left-align" key={`cell-bonus`}>
                {item.productName}
            </Cell>
            <CommonCells data={item} />
        </Row>
    ));
