import React from 'react';
import { Row, Cell, HeaderRow, HeaderCell } from '@legion-lib/react-grid';
import { headerText } from './constants';
import LangHelper from '@/helpers/langHelper';
import GroupCell from '../components/grid/GroupCell';
import TotalCell from '../components/grid/TotalCell';
import { FinancialDataCells, CenterAlignedCell, LeftAlignedCell } from '@/components/grid/FormattedCell';
import { RIGHT_ALIGN } from '@/constants/gridClasses';
import { v4 as uuidv4 } from 'uuid';

export const renderHeader = drilldownLevel => (
    <HeaderRow style={{ height: 32 }}>
        <HeaderCell colWidth={20}>#</HeaderCell>
        {drilldownLevel === 0 && <HeaderCell colWidth={320}>{headerText.league}</HeaderCell>}
        {drilldownLevel === 1 && <HeaderCell colWidth={320}>{headerText.match}</HeaderCell>}
        {drilldownLevel === 2 && <HeaderCell colWidth={280}>{headerText.bettype}</HeaderCell>}
        <HeaderCell colWidth={100}>{headerText.playercount}</HeaderCell>
        <HeaderCell colWidth={80}>{headerText.betcount}</HeaderCell>
        <HeaderCell colWidth={110}>{headerText.turnover}</HeaderCell>
        <HeaderCell colWidth={110}>{headerText.customerWL}</HeaderCell>
        <HeaderCell colWidth={110}>{headerText.licenseeWL}</HeaderCell>
    </HeaderRow>
);

export const renderDataSection = (dataList, drilldownLevel, isTotalRow) => {
    if (isTotalRow) {
        return buildTotalRow(dataList[0]);
    }

    const dataRows = [];

    for (let i = 0; i < dataList.length; i++) {
        const detailData = dataList[i].detail;
        dataRows.push(buildDataRow(dataList[i], drilldownLevel));

        if (!dataList[i].isDirectToCurrency) {
            detailData &&
                dataList[i].isBreakdown &&
                detailData.map((item, index) => {
                    dataRows.push(buildDetailDataRow(item, index, drilldownLevel));
                    const { detail, isBreakdown } = item;

                    detail &&
                        isBreakdown &&
                        detail.data.map(item => {
                            dataRows.push(buildCurrencyDataRow(item, drilldownLevel));
                        });
                });
        } else {
            detailData &&
                dataList[i].isBreakdown &&
                detailData.map(item => {
                    dataRows.push(buildCurrencyDataRow(item, drilldownLevel));
                });
        }
    }

    return dataRows;
};

const buildDataRow = (dataItem, drilldownLevel) => {
    const { index, isDirectToCurrency } = dataItem;

    return (
        <Row className="total-row" key={`total-row-${index}-${drilldownLevel}`}>
            {(isDirectToCurrency && <GroupCell rowData={dataItem} level={drilldownLevel} />) || <TotalCell rowData={dataItem} level={drilldownLevel} />}
            <FinancialDataCells data={dataItem} />
        </Row>
    );
};

const buildDetailDataRow = (dataItem, index, drilldownLevel) => (
    <Row key={`detail-row-${uuidv4()}`}>
        <CenterAlignedCell>{++index}</CenterAlignedCell>
        <GroupCell rowData={dataItem} level={drilldownLevel} />
        <FinancialDataCells data={dataItem} />
    </Row>
);

const buildCurrencyDataRow = (dataItem, drilldownLevel) => {
    const { currencyName } = dataItem;

    return (
        <Row className="currency-row" key={`currency-row-${uuidv4()}-${drilldownLevel}`}>
            <CenterAlignedCell></CenterAlignedCell>
            <LeftAlignedCell>{currencyName}</LeftAlignedCell>
            <FinancialDataCells data={dataItem} />
        </Row>
    );
};

const buildTotalRow = dataItem => (
    <Row className="grant-total-row" key="grantTotal-row">
        <Cell className={RIGHT_ALIGN} colSpan="3">
            {LangHelper.getSingleResource('Total')}
        </Cell>
        <FinancialDataCells data={dataItem} />
    </Row>
);
