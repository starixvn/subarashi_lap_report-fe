import React from 'react';
import { Row, Cell, HeaderRow, HeaderCell } from '@legion-lib/react-grid';
import { headerText } from './constants';
import NumberFormat from '@srcRoot/lib/numberFormat';
import LangHelper from '@srcRoot/helpers/langHelper';
import GroupCell from '../components/grid/GroupCell';
import TotalCell from '../components/grid/TotalCell';
import { v4 as uuidv4 } from 'uuid';

export const renderHeader = (drilldownLevel, showBA) => {
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
            {showBA && <HeaderCell colWidth={110}>{headerText.BACommission}</HeaderCell>}
        </HeaderRow>
    );
};

export const renderDataSection = (dataList, drilldownLevel, isTotalRow, showBA) => {
    if (isTotalRow) {
        return buildTotalRow(dataList[0], showBA);
    }

    const dataRows = [];
    const directToCurrencyData = dataList.filter((item) => item.isDirectToCurrency);
    const breakDownData = dataList.filter((item) => !item.isDirectToCurrency);

    for (let i = 0; i < breakDownData.length; i++) {
        const detailData = breakDownData[i].detail;
        dataRows.push(buildDataRow(breakDownData[i], drilldownLevel, showBA));

        detailData &&
            breakDownData[i].isBreakdown &&
            detailData.map((item, index) => {
                dataRows.push(buildDetailDataRow(item, index, drilldownLevel, showBA));
                const { detail, isBreakdown } = item;

                detail &&
                    isBreakdown &&
                    detail.data.map((item) => {
                        dataRows.push(buildCurrencyDataRow(item, drilldownLevel, showBA));
                    });
            });
    }

    for (let i = 0; i < directToCurrencyData.length; i++) {
        const detailData = directToCurrencyData[i].detail;
        dataRows.push(buildDataRow(directToCurrencyData[i], drilldownLevel, showBA));

        detailData &&
            directToCurrencyData[i].isBreakdown &&
            detailData.map((item) => {
                dataRows.push(buildCurrencyDataRow(item, drilldownLevel, showBA));
            });
    }

    return dataRows;
};

const buildDataRow = (dataItem, drilldownLevel, showBA) => {
    const { index, betCount, turnOver, licenseeWL, customerWL, baComm, isDirectToCurrency } = dataItem;

    return (
        <Row className="total-row" key={`total-row-${index}-${drilldownLevel}`}>
            {(isDirectToCurrency && <GroupCell rowData={dataItem} level={drilldownLevel} isDirectToCurrency={isDirectToCurrency} />) || (
                <TotalCell rowData={dataItem} level={drilldownLevel} />
            )}
            <Cell className="right-align">{NumberFormat.format(betCount)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(turnOver)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(customerWL)}</Cell>
            <Cell className={`right-align ${licenseeWL < 0 ? 'negative' : ''}`}>{NumberFormat.formatDecimal(licenseeWL)}</Cell>
            {showBA && <Cell className="right-align">{NumberFormat.formatDecimal(baComm)}</Cell>}
        </Row>
    );
};

const buildDetailDataRow = (dataItem, index, drilldownLevel, showBA) => {
    const { leagueId, matchId, betTypeId, betCount, turnOver, licenseeWL, customerWL, baComm } = dataItem;

    return (
        <Row key={`detail-row-${leagueId}-${matchId}-${betTypeId}-${drilldownLevel}`}>
            <Cell className="center-align">{++index}</Cell>
            <GroupCell rowData={dataItem} level={drilldownLevel} />
            <Cell className="right-align">{NumberFormat.format(betCount)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(turnOver)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(customerWL)}</Cell>
            <Cell className={`right-align ${licenseeWL < 0 ? 'negative' : ''}`}>{NumberFormat.formatDecimal(licenseeWL)}</Cell>
            {showBA && <Cell className="right-align">{NumberFormat.formatDecimal(baComm)}</Cell>}
        </Row>
    );
};

const buildCurrencyDataRow = (dataItem, drilldownLevel, showBA) => {
    const { currency, betCount, turnOver, licenseeWL, customerWL, baComm } = dataItem;

    return (
        <Row className="currency-row" key={`currency-row-${uuidv4()}-${drilldownLevel}`}>
            <Cell className="center-align"></Cell>
            <Cell className="left-align">{currency}</Cell>
            <Cell className="right-align">{NumberFormat.format(betCount)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(turnOver)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(customerWL)}</Cell>
            <Cell className={`right-align ${licenseeWL < 0 ? 'negative' : ''}`}>{NumberFormat.formatDecimal(licenseeWL)}</Cell>
            {showBA && <Cell className="right-align">{NumberFormat.formatDecimal(baComm)}</Cell>}
        </Row>
    );
};

const buildTotalRow = (dataItem, showBA) => {
    const { betCount, turnOver, licenseeWL, customerWL, baComm } = dataItem;
    return (
        <Row className="grant-total-row" key="grantTotal-row">
            <Cell className="right-align" colSpan="2">
                {LangHelper.getSingleResource('Total')}
            </Cell>
            <Cell className="right-align">{NumberFormat.format(betCount)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(turnOver)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(customerWL)}</Cell>
            <Cell className={`right-align ${licenseeWL < 0 ? 'negative' : ''}`}>{NumberFormat.formatDecimal(licenseeWL)}</Cell>
            {showBA && <Cell className="right-align">{NumberFormat.formatDecimal(baComm)}</Cell>}
        </Row>
    );
};
