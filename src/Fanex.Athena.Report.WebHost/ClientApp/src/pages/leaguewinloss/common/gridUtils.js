import React from 'react';
import { Row, Cell, HeaderRow, HeaderCell } from '@legion-lib/react-grid';
import { headerText } from './constants';
import NumberFormat from '@/lib/numberFormat';
import LangHelper from '@/helpers/langHelper';
import GroupCell from '../components/grid/GroupCell';
import TotalCell from '../components/grid/TotalCell';
import { v4 as uuidv4 } from 'uuid';

export const renderHeader = (drilldownLevel) => {
    return (
        <HeaderRow style={{ height: 32 }}>
            <HeaderCell colWidth={20}>#</HeaderCell>
            {drilldownLevel === 0 && <HeaderCell colWidth={320}>{headerText.league}</HeaderCell>}
            {drilldownLevel === 1 && <HeaderCell colWidth={320}>{headerText.match}</HeaderCell>}
            {drilldownLevel === 2 && <HeaderCell colWidth={280}>{headerText.bettype}</HeaderCell>}
            <HeaderCell colWidth={80}>{headerText.betcount}</HeaderCell>
            <HeaderCell colWidth={110}>{headerText.turnover}</HeaderCell>
            <HeaderCell colWidth={110}>{headerText.customerWL}</HeaderCell>
            <HeaderCell colWidth={110}>{headerText.licenseeWL}</HeaderCell>
        </HeaderRow>
    );
};

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
                        detail.data.map((item) => {
                            dataRows.push(buildCurrencyDataRow(item, drilldownLevel));
                        });
                });
        }
        else {
            detailData &&
                dataList[i].isBreakdown &&
                detailData.map((item) => {
                    dataRows.push(buildCurrencyDataRow(item, drilldownLevel));
                });
        }
    }

    return dataRows;
};

const buildDataRow = (dataItem, drilldownLevel) => {
    const { index, betCount, turnOver, licenseeWL, customerWL, isDirectToCurrency } = dataItem;

    return (
        <Row className="total-row" key={`total-row-${index}-${drilldownLevel}`}>
            {(isDirectToCurrency && <GroupCell rowData={dataItem} level={drilldownLevel} />) || (
                <TotalCell rowData={dataItem} level={drilldownLevel} />
            )}
            <Cell className="right-align">{NumberFormat.format(betCount)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(turnOver)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(customerWL)}</Cell>
            <Cell className={`right-align ${licenseeWL < 0 ? 'negative' : ''}`}>{NumberFormat.formatDecimal(licenseeWL)}</Cell>
        </Row>
    );
};

const buildDetailDataRow = (dataItem, index, drilldownLevel) => {
    const { betCount, turnOver, licenseeWL, customerWL } = dataItem;

    return (
        <Row key={`detail-row-${uuidv4()}`}>
            <Cell className="center-align">{++index}</Cell>
            <GroupCell rowData={dataItem} level={drilldownLevel} />
            <Cell className="right-align">{NumberFormat.format(betCount)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(turnOver)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(customerWL)}</Cell>
            <Cell className={`right-align ${licenseeWL < 0 ? 'negative' : ''}`}>{NumberFormat.formatDecimal(licenseeWL)}</Cell>
        </Row>
    );
};

const buildCurrencyDataRow = (dataItem, drilldownLevel) => {
    const { currencyName, betCount, turnOver, licenseeWL, customerWL } = dataItem;

    return (
        <Row className="currency-row" key={`currency-row-${uuidv4()}-${drilldownLevel}`}>
            <Cell className="center-align"></Cell>
            <Cell className="left-align">{currencyName}</Cell>
            <Cell className="right-align">{NumberFormat.format(betCount)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(turnOver)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(customerWL)}</Cell>
            <Cell className={`right-align ${licenseeWL < 0 ? 'negative' : ''}`}>{NumberFormat.formatDecimal(licenseeWL)}</Cell>
        </Row>
    );
};

const buildTotalRow = (dataItem) => {
    const { betCount, turnOver, licenseeWL, customerWL } = dataItem;
    return (
        <Row className="grant-total-row" key="grantTotal-row">
            <Cell className="right-align" colSpan="2">
                {LangHelper.getSingleResource('Total')}
            </Cell>
            <Cell className="right-align">{NumberFormat.format(betCount)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(turnOver)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(customerWL)}</Cell>
            <Cell className={`right-align ${licenseeWL < 0 ? 'negative' : ''}`}>{NumberFormat.formatDecimal(licenseeWL)}</Cell>
        </Row>
    );
};
