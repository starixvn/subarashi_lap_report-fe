import React from 'react';
import { Row } from '@legion-lib/react-grid';

import LangHelper from '@/helpers/langHelper';

import SportCell from './SportCell';
import { BuildHeaders, CommonCells } from '../../../gridUltility';

export const BuildBySportHeaders = (options) => BuildHeaders(LangHelper.getSingleResource('Sport'), options);

export const BuildBySportBody = (data, isShowedDetailLink) => {
    return data.map((item) => {
        return (
            <Row key={`row-sport-${item.productName}`}>
                <SportCell data={item} isShowedDetailLink={isShowedDetailLink} />
                <CommonCells data={item} />
            </Row>
        );
    });
};
