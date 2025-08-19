import React from 'react';
import { Cell, Row } from '@legion-lib/react-grid';

import LangHelper from '@/helpers/langHelper';
import CommonCells from './CommonCells';

export const BuildFooter = (data, options) => (
    <Row key={'footer'}>
        <Cell className="center-align" colSpan={2}>
            {LangHelper.getSingleResource('Total')}
        </Cell>
        <CommonCells data={data} options={options} hideClosingBalance={true} hideOpeningBalance={true} />
    </Row>
);
