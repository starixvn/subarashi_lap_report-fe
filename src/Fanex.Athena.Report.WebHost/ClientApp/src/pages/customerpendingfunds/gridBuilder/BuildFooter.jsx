import React from 'react';
import { Cell, Row } from '@legion-lib/react-grid';

import LangHelper from '@srcRoot/helpers/langHelper';
import CommonCells from './CommonCells';

export const BuildFooter = (data, options) => {
    const { isFakeLicensee } = options;

    return (
        <Row key={'footer'}>
            <Cell className="center-align" colSpan={isFakeLicensee ? 2 : 3}>
                {LangHelper.getSingleResource('Total')}
            </Cell>
            <CommonCells data={data} />
        </Row>
    );
};
