import React from 'react';
import { Cell, Row } from '@legion-lib/react-grid';

import CommonCells from './CommonCells';
import { ReportLevel, SubsidiaryViewType } from '@/constants/report';
import { TotalText } from '../common/tableSetting';

export const BuildFooter = (data, { drillDownLevel, ...options }) => {
    return drillDownLevel === ReportLevel.CUSTOMER ? buildDetailFooter(data, options) : buildMainFooter(data, options);
};

const buildDetailFooter = ({ totalData, grandTotalData }, { baseCurrency }) => {
    const subs = Object.keys(totalData);
    const rowSpan = subs.length;

    const footer = [];
    for (let i = 0; i < rowSpan; i++) {
        const totalName = subs[i];
        const item = totalData[totalName];

        footer.push(
            <Row className="light-footer" key={`total${i}`}>
                {i === 0 && (
                    <Cell title={`${TotalText.TotalIn} ${baseCurrency}`} colSpan="3" rowSpan={rowSpan} className="center-align">
                        {`${TotalText.TotalIn} ${baseCurrency}`}
                    </Cell>
                )}
                <Cell title={item.currencyName} className="center-align" colSpan="1">
                    {item.currencyName}
                </Cell>
                <CommonCells data={item} index={`total${i}`} />
            </Row>
        );
    }

    if (grandTotalData) {
        footer.push(buildDetailGrandTotal(grandTotalData));
    }

    return footer;
};

const buildDetailGrandTotal = (grandTotalData) => {
    if (!grandTotalData) {
        return null;
    }

    return (
        <Row key="grandTotal">
            <Cell
                title={`${TotalText.TotalIn} ${grandTotalData.currencyName}`}
                className="center-align"
                colSpan="4">{`${TotalText.TotalIn} ${grandTotalData.currencyName}`}</Cell>
            <CommonCells data={grandTotalData} index={'grandTotal'} />
        </Row>
    );
};

const buildMainFooter = ({ totalData, grandTotalData }, { viewType }) => {
    const subs = Object.keys(totalData);
    const colSpan = viewType === SubsidiaryViewType.MASTER_MANAGEMENT ? 2 : 1;

    const footer = [];
    for (let i = 0; i < subs.length; i++) {
        const totalName = subs[i];
        const item = totalData[totalName];

        footer.push(
            <Row className="light-footer" key={`total${i}`}>
                <Cell colSpan={colSpan} title={`${TotalText.Total} ${totalName}`}>{`${TotalText.Total} ${totalName}`}</Cell>
                <Cell title={`${TotalText.Based} ${item.currencyName}`} className="center-align" colSpan="2">{`${TotalText.Based} ${item.currencyName}`}</Cell>
                <CommonCells data={item} index={`total${i}`} />
            </Row>
        );
    }

    if (grandTotalData) {
        footer.push(buildMainGrandTotal(grandTotalData, { viewType }));
    }

    return footer;
};

const buildMainGrandTotal = (grandTotalData, { viewType }) => {
    if (!grandTotalData) {
        return null;
    }

    const colSpan = viewType === SubsidiaryViewType.MASTER_MANAGEMENT ? 2 : 1;

    return (
        <Row key="grandTotal">
            <Cell colSpan={colSpan} title={TotalText.Total}>
                {TotalText.Total}
            </Cell>
            <Cell
                title={`${TotalText.Based} ${grandTotalData.currencyName}`}
                className="center-align"
                colSpan="2">{`${TotalText.Based} ${grandTotalData.currencyName}`}</Cell>
            <CommonCells data={grandTotalData} index={'grandTotal'} />
        </Row>
    );
};
