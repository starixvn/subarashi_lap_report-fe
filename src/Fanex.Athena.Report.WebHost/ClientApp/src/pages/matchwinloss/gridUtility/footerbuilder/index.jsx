import React from 'react';
import { Row, Cell } from '@legion-lib/react-grid';

import LangHelper from '@/helpers/langHelper';

import CommonCells from '../CommonCells';
import FooterSpecialBetTypeRows from './FooterSpecialBetTypeRows';

export const BuildFooter = footerData => {
    const footer = [];
    if (footerData.isShowTotal && footerData.isShowSpecialBetTypeResult) {
        footer.push([
            <Row key={'footer-Total'} className="light-footer">
                <Cell className="left-align" colSpan={footerData.totalSpan}>
                    {LangHelper.getSingleResource('Total')}
                </Cell>
                <CommonCells data={footerData.total} />
            </Row>,
        ]);
    }

    footerData.isShowSpecialBetTypeResult &&
        footer.push(<FooterSpecialBetTypeRows key={'footer-SystemParlay'} data={footerData.specialBetTypeResult} totalSpan={footerData.totalSpan} />);

    if (footerData.isShowTotal) {
        footer.push([
            <Row key={'footer-GrandTotal'}>
                <Cell className="left-align" colSpan={footerData.totalSpan}>
                    {LangHelper.getSingleResource('GrandTotal')}
                </Cell>
                <CommonCells data={footerData.grandTotal} />
            </Row>,
        ]);
    }

    return footer;
};
