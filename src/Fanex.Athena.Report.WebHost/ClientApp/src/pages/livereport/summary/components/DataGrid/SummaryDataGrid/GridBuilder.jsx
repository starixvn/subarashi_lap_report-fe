import React from 'react';
import { Row, Cell } from '@legion-lib/react-grid';

import LangHelper from '@/helpers/langHelper';
import { BuildHeaders, CommonCells } from '../../../gridUltility';

export const BuildSummaryHeaders = (options) => BuildHeaders(LangHelper.getSingleResource('Product'), options);

export const BuildSummaryBody = (data, onClick) => {
    const onDetailClick = (event, detailData) => {
        event.preventDefault();
        onClick(detailData);
    };

    return data.map((item) => {
        return (
            <Row key={`row-summary-${item.productName}`}>
                <Cell title={item.productName} className="left-align" key={`cell-bonus`}>
                    <a href="#" onClick={(e) => onDetailClick(e, item)}>
                        {item.productName}
                    </a>
                </Cell>
                <CommonCells data={item} />
            </Row>
        );
    });
};

export const BuildSummaryFooter = (data, onClick) => {
    const onDetailClick = (event) => {
        event.preventDefault();
        onClick({ productCode: 'ALL' });
    };

    return [
        <Row key={'footer-summary'} className="footer-summary">
            <Cell className="left-align" colSpan={data.length} key="cell-total">
                <a href="#" onClick={onDetailClick}>
                    {LangHelper.getSingleResource('Total')}
                </a>
            </Cell>
            <CommonCells data={data} />
        </Row>,
    ];
};
